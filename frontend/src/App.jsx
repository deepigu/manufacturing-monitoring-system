import { useEffect, useState } from "react"
import "./App.css"

function App() {

  const [machines, setMachines] = useState([])

  useEffect(() => {

  const fetchMachines = () => {

    fetch("http://127.0.0.1:8000/machines")
      .then(response => response.json())
      .then(data => {
        setMachines(data)
      })

  }

  // Get data immediately
  fetchMachines()

  // Get new data every 5 seconds
  const interval = setInterval(fetchMachines, 5000)

  // Stop the timer when the page closes
  return () => clearInterval(interval)

}, [])

  return (
    <div className="dashboard">

      <h1>Smart Manufacturing Monitoring System</h1>

      <p className="subtitle">
        Real-time machine monitoring and production analytics
      </p>

      <div className="machine-container">

        {machines.map(machine => (

          <div className="machine-card" key={machine.machine_name}>

            <h2>{machine.machine_name}</h2>

            <h3>
              {machine.status === "RUNNING"
                ? "🟢 RUNNING"
                : "🔴 STOPPED"}
            </h3>

            <p>Speed: <strong>{machine.speed} ft/min</strong></p>

            <p>
              Temperature:
              <strong> {machine.temperature}°C</strong>
            </p>

            <p>
              Production:
              <strong>
                {" "}
                {machine.parts_produced} / {machine.production_target}
              </strong>
            </p>
            <div className="progress-section">

  <div className="progress-label">
    Production Progress: {machine.production_progress}%
  </div>

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{
        width: `${machine.production_progress}%`
      }}
    >
    </div>

  </div>

</div>

            <p>
              Quality:
              <strong> {machine.quality_rate}%</strong>
            </p>

            <p>
              Performance:
              <strong> {machine.performance}%</strong>
            </p>

            <p>
              Availability:
              <strong> {machine.availability}%</strong>
            </p>

            <p className="oee">
              OEE: {machine.oee}%
            </p>
<div className="alerts">

  {machine.alerts.length > 0 ? (

    machine.alerts.map((alert, index) => (
      <div className="alert-box" key={index}>
        ⚠️ {alert}
      </div>
    ))

  ) : (

    <div className="normal-box">
      ✓ No Active Alerts
    </div>

  )}

</div>
          </div>

        ))}

      </div>

    </div>
  )
}

export default App