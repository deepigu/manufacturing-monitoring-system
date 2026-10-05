from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from machine import create_machine

app = FastAPI()


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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

    return machines