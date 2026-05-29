from __future__ import annotations

import asyncio
import hashlib
from collections import defaultdict
from pathlib import Path
from typing import Literal

from backend.app.core.settings import Settings
from backend.app.logs.activity import log_event
from backend.app.organizer.safety import SafetyGuard

CHUNK_SIZE = 1024 * 1024


async def sha256_file(path: Path) -> str:
    def _hash() -> str:
        digest = hashlib.sha256()
        with path.open("rb") as file:
            for chunk in iter(lambda: file.read(CHUNK_SIZE), b""):
                digest.update(chunk)
        return digest.hexdigest()

    return await asyncio.to_thread(_hash)


class DuplicateScanner:
    async def scan(self, folders: list[Path], settings: Settings | None = None) -> list[dict]:
        guard = SafetyGuard(settings) if settings else None
        groups: dict[tuple[int, str], list[Path]] = defaultdict(list)
        for folder in folders:
            if not folder.exists():
                continue
            for path in folder.rglob("*"):
                if path.is_file():
                    if guard and not guard.inspect(path).allowed:
                        continue
                    try:
                        groups[(path.stat().st_size, path.suffix.lower())].append(path)
                    except OSError:
                        continue

        duplicates = []
        for candidates in groups.values():
            if len(candidates) < 2:
                continue
            hash_groups: dict[str, list[Path]] = defaultdict(list)
            for path in candidates:
                try:
                    hash_groups[await sha256_file(path)].append(path)
                except OSError:
                    continue
            for digest, paths in hash_groups.items():
                if len(paths) > 1:
                    files = [self._file_info(path) for path in paths]
                    duplicates.append({"hash": digest, "count": len(paths), "files": files})
                    await log_event("DUPLICATE_DETECTED", f"Detected {len(paths)} duplicate files", hash=digest, files=files)
        return duplicates

    async def resolve(self, files: list[Path], strategy: Literal["delete", "keep_newest", "keep_largest"], settings: Settings | None = None, confirmed: bool = False) -> list[str]:
        if settings and settings.safety.require_delete_confirmation and not confirmed:
            raise PermissionError("Duplicate deletion requires explicit confirmation")
        guard = SafetyGuard(settings) if settings else None
        safe_files = [path for path in files if not guard or guard.inspect(path).allowed]
        if not safe_files:
            return []
        if strategy == "delete":
            targets = safe_files
        elif strategy == "keep_newest":
            keep = max(safe_files, key=lambda path: path.stat().st_mtime)
            targets = [path for path in safe_files if path != keep]
        else:
            keep = max(safe_files, key=lambda path: path.stat().st_size)
            targets = [path for path in safe_files if path != keep]
        deleted = []
        for target in targets:
            if target.exists() and target.is_file():
                target.unlink()
                deleted.append(str(target))
        if deleted:
            await log_event("DUPLICATE_RESOLVED", f"Resolved duplicates using {strategy}", deleted=deleted)
        return deleted

    def _file_info(self, path: Path) -> dict:
        stat = path.stat()
        return {
            "path": str(path),
            "name": path.name,
            "size": stat.st_size,
            "modified": stat.st_mtime,
        }
