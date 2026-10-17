
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Manufacturing Monitoring System is running"
    }

def test_get_machines():
    response = client.get("/machines")

    assert response.status_code == 200

    machines = response.json()

    assert len(machines) == 3

    assert machines[0]["machine_name"] == "RF-001"
    assert machines[1]["machine_name"] == "RF-002"
    assert machines[2]["machine_name"] == "RF-003"

def test_machine_history():
    response = client.get("/machines/history")

    assert response.status_code == 200

    history = response.json()

    assert isinstance(history, list)

    if len(history) > 0:
        assert "machine_name" in history[0]
        assert "temperature" in history[0]
        assert "speed" in history[0]
        assert "oee" in history[0]
        assert "timestamp" in history[0]
