
import random

# Store production count for each machine
machine_production = {
    "RF-001": 1000,
    "RF-002": 1000,
    "RF-003": 1000
}


def create_machine(machine_name):

    # Choose machine status
    machine_status = random.choice([
        "RUNNING",
        "RUNNING",
        "RUNNING",
        "STOPPED"
    ])

    # Machine speed
    if machine_status == "RUNNING":
        machine_speed = random.randint(280, 350)
    else:
        machine_speed = 0

    # Ideal machine speed
    ideal_speed = 350

    # Calculate performance percentage
    performance = round(
        (machine_speed / ideal_speed) * 100,
        2
    )

    # Machine downtime
    if machine_status == "STOPPED":
        downtime_minutes = random.randint(1, 30)
    else:
        downtime_minutes = 0

    # Planned production time = 8 hours
    planned_time_minutes = 480

    # Calculate actual running time
    running_time_minutes = (
        planned_time_minutes - downtime_minutes
    )

    # Calculate availability percentage
    availability = round(
        (running_time_minutes / planned_time_minutes) * 100,
        2
    )

    # Generate machine temperature
    temperature = random.randint(45, 75)

    # Add new parts when machine is running
    if machine_status == "RUNNING":
        new_parts = random.randint(1, 10)
        machine_production[machine_name] += new_parts

    # Get current production total
    parts_produced = machine_production[machine_name]

    # Generate rejected parts
    rejected_parts = random.randint(0, 20)

    # Calculate good parts
    good_parts = parts_produced - rejected_parts

    # Calculate quality percentage
    quality_rate = round(
        (good_parts / parts_produced) * 100,
        2
    )

    # Calculate OEE
    oee = round(
        (availability / 100)
        * (performance / 100)
        * (quality_rate / 100)
        * 100,
        2
    )

    # Production target
    production_target = 1500

    # Calculate production progress
    production_progress = round(
        (parts_produced / production_target) * 100,
        2
    )

    # Check temperature
    if temperature > 70:
        temperature_status = "WARNING - HIGH TEMPERATURE"
    else:
        temperature_status = "NORMAL"

    # Create alerts
    alerts = []

    # Machine stopped alert
    if machine_status == "STOPPED":
        alerts.append("MACHINE STOPPED")

    # High temperature alert
    if temperature > 70:
        alerts.append("HIGH TEMPERATURE")

    # Quality alert
    if quality_rate < 99:
        alerts.append("QUALITY ISSUE")

    # Put all machine information together
    machine = {
        "machine_name": machine_name,
        "status": machine_status,
        "speed": machine_speed,
        "ideal_speed": ideal_speed,
        "performance": performance,
        "temperature": temperature,
        "parts_produced": parts_produced,
        "rejected_parts": rejected_parts,
        "good_parts": good_parts,
        "quality_rate": quality_rate,
        "production_target": production_target,
        "production_progress": production_progress,
        "downtime_minutes": downtime_minutes,
        "planned_time_minutes": planned_time_minutes,
        "running_time_minutes": running_time_minutes,
        "availability": availability,
        "oee": oee,
        "temperature_status": temperature_status,
        "alerts": alerts
    }

    return machine
