from __future__ import annotations

import asyncio
import time
from pathlib import Path

from backend.app.core.events import EventBus
from backend.app.core.settings import Settings
from backend.app.logs.activity import log_event
from backend.app.organizer.safe_ops import SafeFileOperator
from backend.app.organizer.safety import SafetyGuard
from backend.app.rules.engine import RuleEngine


class OrganizerService:
    def __init__(self, settings: Settings, bus: EventBus, rules: RuleEngine | None = None) -> None:
        self.settings = settings
        self.bus = bus
        self.rules = rules or RuleEngine()
        self.operator = SafeFileOperator()

    def preview_file(self, path: Path) -> dict:
        guard = SafetyGuard(self.settings)
        decision = guard.inspect(path)
        category = self.rules.category_for(path, self.settings.max_file_size_large_mb, self.settings.category_map) if decision.allowed else None
        root = Path(self.settings.organize_root).expanduser().resolve() if self.settings.organize_root else path.parent
        destination = str(root / category / path.name) if category else None
        return {
            "path": str(path.expanduser().resolve()),
            "allowed": decision.allowed,
            "reason": decision.reason,
            "category": category,
            "destination": destination,
            "dry_run": self.settings.safety.dry_run,
        }

    async def organize_file(self, path: Path) -> dict | None:
        if not self.settings.auto_organize or not path.exists() or not path.is_file():
            return None
        if self.settings.safety.min_file_age_seconds:
            age = max(0, time.time() - path.stat().st_mtime)
            if age < self.settings.safety.min_file_age_seconds:
                await asyncio.sleep(self.settings.safety.min_file_age_seconds - age)
        guard = SafetyGuard(self.settings)
        decision = guard.inspect(path)
        if not decision.allowed:
            await log_event("FILE_SKIPPED", f"Skipped {path.name}: {decision.reason}", path=str(path), reason=decision.reason)
            await self.bus.publish({"type": "FILE_SKIPPED", "filename": path.name, "path": str(path), "reason": decision.reason})
            return None
        category = self.rules.category_for(path, self.settings.max_file_size_large_mb, self.settings.category_map)
        if category == "Misc" and path.name.startswith("."):
            return None
        root = Path(self.settings.organize_root).expanduser().resolve() if self.settings.organize_root else path.parent
        rule = self.rules.match(path)
        if rule and rule.action.type == "ignore":
            await log_event("RULE_IGNORED", f"Ignored {path.name} by rule {rule.name}", rule_id=rule.id)
            await self.bus.publish({"type": "RULE_IGNORED", "filename": path.name, "path": str(path), "rule": rule.name})
            return None
        if self.settings.safety.dry_run:
            event = {
                "type": "DRY_RUN_MOVE",
                "filename": path.name,
                "from": str(path.parent),
                "to": str(root / category / path.name),
                "category": category,
                "rule": rule.name if rule else "default-category-map",
            }
            await log_event("DRY_RUN_MOVE", f"Would move {path.name}", **event)
            await self.bus.publish(event)
            return event
        transaction = await self.operator.move(path, root / category)
        event = {
            "type": "FILE_MOVED",
            "filename": path.name,
            "from": str(path.parent),
            "to": transaction.destination,
            "category": category,
            "transaction_id": transaction.id,
            "rule": rule.name if rule else "default-category-map",
        }
        await self.bus.publish(event)
        if rule:
            await log_event("RULE_TRIGGERED", f"Rule {rule.name} moved {path.name}", rule_id=rule.id, action=rule.action.model_dump())
            await self.bus.publish({"type": "RULE_TRIGGERED", "filename": path.name, "rule": rule.name})
        return event
