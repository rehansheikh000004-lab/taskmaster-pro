// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();
app.use(express.json());

// CORS: allow frontend origin or allow all during dev
const FRONTEND = process.env.FRONTEND_URL || "";
app.use(cors({
  origin: FRONTEND || true,
  credentials: true
}));

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in env");
  process.exit(1);
}

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", taskRoutes);

    app.get("/", (req, res) => res.json({ ok: true, message: "TaskMaster API running" }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("DB connect failed:", err);
    process.exit(1);
  });
