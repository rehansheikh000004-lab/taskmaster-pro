import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [dueDate,setDueDate] = useState("");
  const [priority,setPriority] = useState("low");
  const token = localStorage.getItem("tm_token");

  useEffect(()=> { load(); }, []);

  async function load(){
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(res.data);
    } catch (err){ console.error(err); }
  }

  async function add(){
    if (!title.trim()) return;
    try {
      await axios.post(`${API_BASE}/api/tasks`, { title, description, dueDate, priority }, { headers: { Authorization: `Bearer ${token}` }});
      setTitle(""); setDescription(""); setDueDate(""); setPriority("low");
      load();
    } catch (err){ console.error(err); }
  }

  async function toggle(id){
    try {
      const t = tasks.find(x=>x._id===id);
      await axios.put(`${API_BASE}/api/tasks/${id}`, { completed: !t.completed }, { headers: { Authorization: `Bearer ${token}` }});
      load();
    } catch (err){ console.error(err); }
  }

  async function remove(id){
    try {
      await axios.delete(`${API_BASE}/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      load();
    } catch (err){ console.error(err); }
  }

  async function edit(task){
    const newTitle = prompt("Edit title", task.title);
    if (newTitle === null) return;
    try {
      await axios.put(`${API_BASE}/api/tasks/${task._id}`, { ...task, title: newTitle }, { headers: { Authorization: `Bearer ${token}` }});
      load();
    } catch (err){ console.error(err); }
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="card">
          <h3>Create Task</h3>
          <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
          <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
          <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
          <button className="btn" onClick={add}>Add</button>
        </div>

        <div className="card">
          <h3>Your Tasks</h3>
          {tasks.length === 0 ? <p className="muted">No tasks</p> : tasks.map(t => (
            <TaskCard key={t._id} t={t} onToggle={toggle} onEdit={edit} onDelete={remove} />
          ))}
        </div>
      </div>
    </div>
  );
}
