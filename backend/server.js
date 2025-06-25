import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import housekeepingRoutes from "./routes/housekeepingRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import receptionistRoutes from "./routes/receptionistRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("LuxuryStay HMS API is Running 🏨");
});

app.use("/api/admin", adminRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/housekeeping", housekeepingRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
