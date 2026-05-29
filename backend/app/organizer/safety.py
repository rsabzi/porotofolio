from __future__ import annotations

from dataclasses import dataclass
from fnmatch import fnmatch
from pathlib import Path

from backend.app.core.settings import Settings


@dataclass(frozen=True)
class SafetyDecision:
    allowed: bool
    reason: str


class SafetyGuard:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def inspect(self, path: Path) -> SafetyDecision:
        resolved = path.expanduser().resolve()
        safety = self.settings.safety
        if not resolved.exists():
            return SafetyDecision(False, "File no longer exists")
        if not resolved.is_file():
            return SafetyDecision(False, "Only regular files can be organized")
        if safety.skip_hidden_files and any(part.startswith(".") for part in resolved.parts if part not in {resolved.anchor, "."}):
            return SafetyDecision(False, "Hidden files or folders are protected")
        if any(fnmatch(resolved.name, pattern) for pattern in safety.ignored_globs):
            return SafetyDecision(False, "File matches ignored temporary/system pattern")
        if any(segment in resolved.parts for segment in safety.protected_path_segments):
            return SafetyDecision(False, "Path is inside a protected system, build, dependency, or application folder")
        if safety.skip_code_projects and self._inside_code_project(resolved):
            return SafetyDecision(False, "Path is inside a detected programming project")
        suffix = resolved.suffix.lower()
        code_extensions = set(self.settings.category_map.get("Code", []))
        installer_extensions = set(self.settings.category_map.get("Installers", []))
        if suffix in code_extensions and not safety.allow_code_file_organization:
            return SafetyDecision(False, "Code files are protected by default")
        if suffix in installer_extensions and not safety.allow_installer_organization:
            return SafetyDecision(False, "Installer/application packages are protected by default")
        return SafetyDecision(True, "Safe to organize")

    def _inside_code_project(self, path: Path) -> bool:
        markers = set(self.settings.safety.protected_folder_markers)
        for parent in [path.parent, *path.parents]:
            try:
                if any((parent / marker).exists() for marker in markers):
                    return True
            except OSError:
                return True
        return False
