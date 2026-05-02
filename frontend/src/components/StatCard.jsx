export default function StatCard({ title, value, color }) {
  return (
    <div style={{
      background: "#1f1f2e",
      padding: "20px",
      borderRadius: "10px",
      color: "white",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
    }}>
      <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>
        {title}
      </p>

      <h2 style={{
        margin: "10px 0 0",
        color: color
      }}>
        {value}
      </h2>
    </div>
  );
}