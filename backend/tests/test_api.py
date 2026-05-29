from fastapi.testclient import TestClient

from backend.app.core.config import CONFIG_PATH
from backend.app.main import app


def test_grid_response_shape():
    with TestClient(app) as client:
        response = client.get("/grid")
        assert response.status_code == 200
        payload = response.json()
        assert "size" in payload
        assert "buildings" in payload
        assert "heatmap" in payload


def test_agents_response_contains_three_agents():
    with TestClient(app) as client:
        response = client.get("/agents")
        assert response.status_code == 200
        assert len(response.json()) == 3


def test_config_update_weights():
    original = CONFIG_PATH.read_text()
    try:
        with TestClient(app) as client:
            response = client.post("/config/update", json={"weights": {"accessibility": 0.6, "resources": 0.25, "pollution": 0.15}})
            assert response.status_code == 200
            assert response.json()["config"]["weights"]["accessibility"] == 0.6
    finally:
        CONFIG_PATH.write_text(original)
