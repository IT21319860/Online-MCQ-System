import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/users/login", { name, email });
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/exams");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
