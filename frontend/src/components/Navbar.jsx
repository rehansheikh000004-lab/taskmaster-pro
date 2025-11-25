import React from "react";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("tm_user") || "{}");
  function logout(){
    localStorage.removeItem("tm_token"); localStorage.removeItem("tm_user");
    window.location.href = "/login";
  }
  return (
    <div className="navbar card">
      <div className="brand">TaskMaster Pro</div>
      <div className="nav-right">
        <div className="muted">{user.username}</div>
        <button className="ghost" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
