
# Smart Manufacturing Monitoring System

A full-stack manufacturing monitoring dashboard built with Python, FastAPI, React, and SQLite.

The application simulates real-time production data for three manufacturing machines and displays performance metrics and historical trends.

## Live Demo

- Frontend: https://smart-manufacturing-monitor.netlify.app
- Backend API: https://manufacturing-monitoring-system-api.onrender.com
- API Documentation: https://manufacturing-monitoring-system-api.onrender.com/docs

## Features

- Real-time simulated monitoring of three machines
- Machine running and stopped status
- Production progress, speed, temperature, and quality metrics
- Overall Equipment Effectiveness (OEE) calculations
- Machine alerts
- SQLite database for historical readings
- Interactive temperature, speed, and OEE charts
- Automatic dashboard updates every five seconds

## Technologies

**Backend:** Python, FastAPI, Uvicorn, SQLite

**Frontend:** React, JavaScript, Vite, Recharts, CSS

**Deployment:** Render and Netlify

**Version Control:** Git and GitHub

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | API status |
| GET | `/machines` | Current simulated machine readings |
| GET | `/machines/history` | Historical machine readings |

## Run Locally

### Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

Backend: http://127.0.0.1:8000

### Frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Architecture

React Dashboard → FastAPI REST API → Machine Simulation → SQLite Database

The frontend requests current and historical machine readings from FastAPI. The backend generates simulated machine data, saves readings to SQLite, and returns JSON responses.

## Important Notes

- Machine data is simulated, not collected from physical equipment.
- Historical records on Render's local SQLite storage may be lost during restarts or redeployments.
- Free-tier backend services may take time to wake after inactivity.

## Future Improvements

- Persistent database storage
- Automated API tests
- Authentication and user roles
- Production reporting and data export
  
