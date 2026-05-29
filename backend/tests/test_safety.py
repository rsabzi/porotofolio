from pathlib import Path

import pytest

from backend.app.core.settings import Settings
from backend.app.core.events import EventBus
from backend.app.organizer.service import OrganizerService


def test_safety_guard_blocks_code_project(tmp_path: Path):
    project = tmp_path / "project"
    project.mkdir()
    (project / ".git").mkdir()
    script = project / "script.py"
    script.write_text("print('safe')")
    preview = OrganizerService(Settings(), EventBus()).preview_file(script)
    assert preview["allowed"] is False
    assert "programming project" in preview["reason"]


def test_safety_guard_blocks_installer_by_default(tmp_path: Path):
    installer = tmp_path / "setup.exe"
    installer.write_text("binary")
    preview = OrganizerService(Settings(), EventBus()).preview_file(installer)
    assert preview["allowed"] is False
    assert "Installer" in preview["reason"]


@pytest.mark.asyncio
async def test_dry_run_does_not_move_file(tmp_path: Path):
    settings = Settings(safety={"dry_run": True, "allow_code_file_organization": True})
    file = tmp_path / "notes.pdf"
    file.write_text("notes")
    event = await OrganizerService(settings, EventBus()).organize_file(file)
    assert event["type"] == "DRY_RUN_MOVE"
    assert file.exists()
