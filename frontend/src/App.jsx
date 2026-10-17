
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

import "./App.css"

function App() {

  const [machines, setMachines] = useState([])
  const [history, setHistory] = useState([])
  const [selectedMachine, setSelectedMachine] = useState("RF-001")
  const [error, setError] = useState("")

  useEffect(() => {

    const fetchData = async () => {
      try {
        const machinesResponse = await fetch(
          "https://manufacturing-monitoring-system-api.onrender.com/machines"
        )

        if (!machinesResponse.ok) {
          throw new Error("Unable to load machine data")
        }

        const machinesData = await machinesResponse.json()
        setMachines(machinesData)

        const historyResponse = await fetch(
         "https://manufacturing-monitoring-system-api.onrender.com/machines/history"
        )

        if (!historyResponse.ok) {
          throw new Error("Unable to load machine history")
        }

        const historyData = await historyResponse.json()
        setHistory(historyData)
        setError("")

      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)

  }, [])

  // Select the last 20 readings for the chosen machine.
  // The API returns newest readings first.
  const chartData = history
    .filter(item => item.machine_name === selectedMachine)
    .slice(0, 20)
    .reverse()
    .map(item => ({
      ...item,
      time: new Date(item.timestamp).toLocaleTimeString()
    }))

  return (
    <div className="dashboard">

      <h1>Smart Manufacturing Monitoring System</h1>

      <p className="subtitle">
        Real-time machine monitoring and production analytics
      </p>

      {error && <p className="error-message">{error}</p>}

      <div className="machine-container">

        {machines.map(machine => (

          <div
            className="machine-card"
            key={machine.machine_name}
          >

            <h2>{machine.machine_name}</h2>

            <h3>
              {machine.status === "RUNNING"
                ? "🟢 RUNNING"
                : "🔴 STOPPED"}
            </h3>

            <p>
              Speed: <strong>{machine.speed} ft/min</strong>
            </p>

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
                />
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

      {/* Historical production charts */}

      <section className="history-section">

        <h2>Machine Performance History</h2>

        <p>
          View historical temperature, speed and OEE readings
        </p>

        <label htmlFor="machine-select">
          Select Machine:{" "}
        </label>

        <select
          id="machine-select"
          value={selectedMachine}
          onChange={event =>
            setSelectedMachine(event.target.value)
          }
        >
          {["RF-001", "RF-002", "RF-003"].map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {chartData.length === 0 ? (

          <p>No historical readings available yet.</p>

        ) : (

          <div className="charts-container">

            <div className="chart-card">

              <h3>Temperature History (°C)</h3>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    name="Temperature"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

            <div className="chart-card">

              <h3>Machine Speed (ft/min)</h3>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    name="Speed"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

            <div className="chart-card">

              <h3>Overall Equipment Effectiveness (%)</h3>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="oee"
                    name="OEE"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

          </div>

        )}

      </section>

    </div>
  )
}

export default App
