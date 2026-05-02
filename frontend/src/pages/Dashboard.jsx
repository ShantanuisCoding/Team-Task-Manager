import { useEffect, useState } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard.jsx"

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
  <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
    
    <h1 style={{ marginBottom: "40px" }}>Dashboard</h1>

    {data ? (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px"
      }}>
        
        {/* Card */}
        <StatCard title="Total Tasks" value={data.total} color="#6366f1" />
        <StatCard title="Todo" value={data.todo} color="#f59e0b" />
        <StatCard title="In Progress" value={data.inProgress} color="#3b82f6" />
        <StatCard title="Done" value={data.done} color="#10b981" />
        <StatCard title="Overdue" value={data.overdue} color="#ef4444" />

      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}