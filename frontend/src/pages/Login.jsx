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
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#2a2a40",
    color: "white",
    outline: "none",
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h1
        style={{
          marginBottom: "25px",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        Team Task Manager
      </h1>

      {/* Subtitle */}
      <p
        style={{
          marginBottom: "25px",
          color: "#9ca3af",
          fontSize: "20px",
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
          background: "#1f1f2e",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          {isLogin ? "Welcome" : "Create Account 🚀"}
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
              background: "#ffe6e6",
              padding: "8px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <p style={{ color: "red", margin: 0, fontSize: "14px" }}>{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.2s",
            boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
          }}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "none",
            border: "none",
            color: "#a5b4fc",
            cursor: "pointer",
            marginTop: "15px",
            textAlign: "center",
            width: "100%",
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
