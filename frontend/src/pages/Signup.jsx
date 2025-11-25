import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [msg,setMsg] = useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/signup`, { username, password });
      const data = res.data;
      if (data.token) {
        localStorage.setItem("tm_token", data.token);
        localStorage.setItem("tm_user", JSON.stringify(data.user));
        nav("/dashboard");
      } else setMsg(data.message || "Signup failed");
    } catch (err) {
      setMsg(err.response?.data?.message || "Network error");
    }
  }

  return (
    <div className="page auth">
      <form className="card" onSubmit={submit}>
        <h2>Signup</h2>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
        <button className="btn">Create account</button>
        <p className="muted">{msg}</p>
        <p>Have account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
