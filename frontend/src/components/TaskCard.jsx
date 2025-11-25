import React from "react";

export default function TaskCard({ t, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task ${t.completed ? "done" : ""} card`}>
      <div>
        <div className="title">{t.title}</div>
        <div className="muted small">{t.priority} • {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due"}</div>
      </div>
      <div className="actions">
        <button className="ghost" onClick={()=>onToggle(t._id)}>{t.completed ? "Undo" : "Done"}</button>
        <button className="ghost" onClick={()=>onEdit(t)}>Edit</button>
        <button className="ghost" onClick={()=>onDelete(t._id)}>Delete</button>
      </div>
    </div>
  );
}
