from __future__ import annotations

from typing import Literal

from pydantic import BaseModel

from backend.app.core.settings import SafetySettings, Settings
from backend.app.rules.models import RuleAction, RuleCondition


class SettingsPatch(BaseModel):
    monitored_folders: list[str] | None = None
    auto_organize: bool | None = None
    duplicate_scan_frequency_minutes: int | None = None
    theme: Literal["dark", "light"] | None = None
    notifications_enabled: bool | None = None
    organize_root: str | None = None
    max_file_size_large_mb: int | None = None
    category_map: dict[str, list[str]] | None = None
    safety: SafetySettings | None = None

    def apply(self, settings: Settings) -> Settings:
        data = settings.model_dump()
        patch = self.model_dump(exclude_none=True)
        if "safety" in patch:
            data["safety"] = {**data["safety"], **patch.pop("safety")}
        data.update(patch)
        return Settings.model_validate(data)


class RuleCreate(BaseModel):
    name: str
    condition: RuleCondition
    action: RuleAction


class ResolveDuplicatesRequest(BaseModel):
    files: list[str]
    strategy: Literal["delete", "keep_newest", "keep_largest"]
    confirmed: bool = False


class RollbackRequest(BaseModel):
    transaction_id: str
