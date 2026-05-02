import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (route) => location.pathname === route;

  const navButtonStyle = (active) => ({
    background: "none",
    border: "none",
    color: active ? "#6366f1" : "#ccc",
    fontWeight: active ? "bold" : "normal",
    cursor: "pointer",
    fontSize: "14px"
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 20px",
        background: "#1f1f2e",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
      }}
    >
      {/* Logo / Title */}
      <h3
        style={{
          margin: 0,
          marginRight: "20px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/dashboard")}
      >
        🚀 Team Task Manager
      </h3>

      {/* Nav Links */}
      <button
        onClick={() => navigate("/dashboard")}
        style={navButtonStyle(isActive("/dashboard"))}
      >
        Dashboard
      </button>

      <button
        onClick={() => navigate("/projects")}
        style={navButtonStyle(isActive("/projects"))}
      >
        Projects
      </button>

      {/* Right side */}
      <div style={{ marginLeft: "auto" }}>
        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            color: "white",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}