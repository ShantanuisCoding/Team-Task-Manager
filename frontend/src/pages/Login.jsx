import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #3f3f46",
  background: "#1f1f2e",
  color: "#e5e5e5",
  outline: "none",
  boxSizing: "border-box",  
  fontSize: "14px"
};
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        await API.post("/auth/signup", { name, email, password });
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#1c1c24",
      fontFamily: "Arial, sans-serif",
      color: "#e5e5e5",
    }}
  >
    {/* Title */}
    <h1
      style={{
        marginBottom: "20px",
        fontSize: "50px",
        fontWeight: "bold",
        color: "#f5f5f5",
      }}
    >
      Team Task Manager
    </h1>

    {/* Subtitle */}
    <p
      style={{
        marginBottom: "30px",
        color: "#a1a1aa",
        fontSize: "15px",
      }}
    >
      Manage projects, tasks & teams efficiently
    </p>

    {/* Card */}
    <div
      style={{
        width: "350px",
        padding: "25px",
        borderRadius: "10px",
        background: "#262636",
        boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "18px",
          color: "#e5e5e5",
        }}
      >
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      {!isLogin && (
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      )}

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      {error && (
        <div
          style={{
            background: "#3a1f1f",
            padding: "8px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <p style={{ color: "#ff6b6b", margin: 0, fontSize: "14px" }}>
            {error}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          background: "#444",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "5px",
        }}
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          marginTop: "15px",
          width: "100%",
          fontSize: "14px",
        }}
      >
        {isLogin
          ? "Don't have an account? Signup"
          : "Already have an account? Login"}
      </button>
    </div>
  </div>
);
}
