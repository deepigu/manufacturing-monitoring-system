
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from machine import create_machine
from database import (
    create_database,
    save_machine_reading,
    get_machine_history
)

app = FastAPI()

# Create SQLite database
create_database()

# Allow local React and deployed Netlify frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://smart-manufacturing-monitor.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Manufacturing Monitoring System is running"
    }


@app.get("/machines")
def get_machines():
    machines = [
        create_machine("RF-001"),
        create_machine("RF-002"),
        create_machine("RF-003")
    ]

    for machine in machines:
        save_machine_reading(machine)

    return machines


@app.get("/machines/history")
def machine_history():
    return get_machine_history()
