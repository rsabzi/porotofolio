# Neural City Architect — Executable Edition

A fully runnable MVP for a real-time 3D city simulation with bounded multi-agent decision-making and safe meta-optimization.

## What it does

- FastAPI backend runs an async simulation loop.
- Three rule-based agents choose where and what to build:
  - `CityPlannerAgent` scores candidate grid cells.
  - `ArchitectAgent` chooses residential, commercial, or industrial buildings.
  - `ResourceAgent` tracks power, water, and road access.
- WebSocket events stream build decisions to a Next.js + React Three Fiber frontend.
- The 3D city grows live with neon cyberpunk materials, fog, orbit camera controls, a heatmap overlay, click inspection, metrics, and agent logs.
- `MetaOptimizer` safely adjusts only JSON config weights and may suggest future agent types. It never generates code, loads code, or creates runtime agents.

## Repository layout

```text
backend/              FastAPI server, agents, simulation, tests
frontend/             Next.js app and 3D renderer
config.json           Runtime scoring/simulation configuration
docs/architecture.md  Architecture notes and safety boundaries
```

## Setup

### Backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The frontend expects the API at `http://localhost:8000`. Override with `NEXT_PUBLIC_API_URL` if needed.

## API

- `GET /grid` — current grid, buildings, heatmap cells.
- `GET /agents` — registered static agents.
- `GET /metrics` — tick, building count, score, pollution, resources, logs, meta output.
- `POST /config/update` — safely update weights and bounded simulation settings.
- `WS /ws` — streams `SNAPSHOT` and `BUILD` events.

Example WebSocket `BUILD` event:

```json
{
  "type": "BUILD",
  "x": 10,
  "z": 5,
  "building": "residential",
  "agent": "CityPlannerAgent",
  "score": 78.2
}
```

## Tests

```bash
pytest backend
```

The test suite covers scoring, API response shape/config updates, and simulation tick stability.
