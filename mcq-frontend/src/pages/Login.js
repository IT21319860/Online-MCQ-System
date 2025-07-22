import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!name || !email) {
      setError("Please enter both name and email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        name,
        email,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/exams");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <h2>🔐 Login to Start Exam</h2>
        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="👤 Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="📧 Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>🚀 Login</button>
      </div>
    </div>
  );
}

export default Login;
