from __future__ import annotations

from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field, field_validator

from backend.app.core.paths import SETTINGS_PATH
from backend.app.utils.json_store import read_json, write_json

DEFAULT_CATEGORY_MAP: dict[str, list[str]] = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".heic", ".tiff"],
    "Videos": [".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"],
    "Documents": [".pdf", ".doc", ".docx", ".txt", ".md", ".rtf", ".xls", ".xlsx", ".ppt", ".pptx", ".csv"],
    "Archives": [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"],
    "Audio": [".mp3", ".wav", ".aac", ".flac", ".m4a", ".ogg"],
    "Code": [".py", ".js", ".ts", ".tsx", ".jsx", ".rs", ".go", ".java", ".cpp", ".c", ".html", ".css", ".json", ".yaml", ".yml", ".toml", ".lock"],
    "Installers": [".exe", ".msi", ".dmg", ".pkg", ".deb", ".rpm", ".appimage", ".apk"],
}


class SafetySettings(BaseModel):
    dry_run: bool = False
    recursive_watch: bool = False
    min_file_age_seconds: int = Field(default=3, ge=0, le=3600)
    skip_hidden_files: bool = True
    skip_code_projects: bool = True
    allow_code_file_organization: bool = False
    allow_installer_organization: bool = False
    require_delete_confirmation: bool = True
    protected_folder_markers: list[str] = Field(default_factory=lambda: [
        ".git", ".hg", ".svn", "package.json", "pnpm-lock.yaml", "yarn.lock", "package-lock.json",
        "pyproject.toml", "requirements.txt", "Pipfile", "poetry.lock", "Cargo.toml", "go.mod",
        "composer.json", ".csproj", ".sln", "Gemfile", "Makefile", "CMakeLists.txt",
    ])
    protected_path_segments: list[str] = Field(default_factory=lambda: [
        "node_modules", ".venv", "venv", "env", "__pycache__", ".next", "dist", "build", "target",
        "site-packages", "Program Files", "Program Files (x86)", "Windows", "System32", "Applications", ".Trash",
    ])
    ignored_globs: list[str] = Field(default_factory=lambda: ["*.tmp", "*.crdownload", "*.part", "~$*", ".DS_Store"])


class Settings(BaseModel):
    monitored_folders: list[str] = Field(default_factory=list)
    auto_organize: bool = True
    duplicate_scan_frequency_minutes: int = Field(default=60, ge=1, le=10080)
    theme: Literal["dark", "light"] = "dark"
    notifications_enabled: bool = True
    organize_root: str | None = None
    max_file_size_large_mb: int = Field(default=100, ge=1)
    category_map: dict[str, list[str]] = Field(default_factory=lambda: DEFAULT_CATEGORY_MAP.copy())
    safety: SafetySettings = Field(default_factory=SafetySettings)

    @field_validator("monitored_folders")
    @classmethod
    def normalize_folders(cls, folders: list[str]) -> list[str]:
        return [str(Path(folder).expanduser().resolve()) for folder in folders]

    @field_validator("category_map")
    @classmethod
    def normalize_category_map(cls, category_map: dict[str, list[str]]) -> dict[str, list[str]]:
        return {category: sorted({extension.lower() if extension.startswith(".") else f".{extension.lower()}" for extension in extensions}) for category, extensions in category_map.items()}


def load_settings() -> Settings:
    return Settings.model_validate(read_json(SETTINGS_PATH, Settings().model_dump()))


def save_settings(settings: Settings) -> Settings:
    write_json(SETTINGS_PATH, settings.model_dump())
    return settings
