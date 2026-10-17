
import sqlite3
from pathlib import Path
from datetime import datetime, timezone

DB_PATH = Path(__file__).parent / "manufacturing.db"


# Create database
def create_database():
    with sqlite3.connect(DB_PATH) as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS machine_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                machine_name TEXT NOT NULL,
                status TEXT NOT NULL,
                speed REAL NOT NULL,
                temperature REAL NOT NULL,
                parts_produced INTEGER NOT NULL,
                oee REAL NOT NULL,
                timestamp TEXT NOT NULL
            )
        """)


# Save machine readings
def save_machine_reading(machine):
    with sqlite3.connect(DB_PATH) as connection:
        connection.execute("""
            INSERT INTO machine_history (
                machine_name, status, speed,
                temperature, parts_produced,
                oee, timestamp
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            machine["machine_name"],
            machine["status"],
            machine["speed"],
            machine["temperature"],
            machine["parts_produced"],
            machine["oee"],
            datetime.now(timezone.utc).isoformat()
        ))


# Retrieve saved machine readings
def get_machine_history():
    with sqlite3.connect(DB_PATH) as connection:
        connection.row_factory = sqlite3.Row

        cursor = connection.execute("""
            SELECT *
            FROM machine_history
            ORDER BY id DESC
            LIMIT 100
        """)

        return [dict(row) for row in cursor.fetchall()]
