// backend/routes/tasks.js
import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

// GET /api/tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks
router.post("/", auth, async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  const t = await Task.create({ userId: req.userId, title: title.trim(), description: description || "", dueDate: dueDate || null, priority: priority || "low" });
  res.status(201).json(t);
});

// PUT /api/tasks/:id
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
  const updated = await Task.findOneAndUpdate({ _id: id, userId: req.userId }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const deleted = await Task.findOneAndDelete({ _id: id, userId: req.userId });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;
