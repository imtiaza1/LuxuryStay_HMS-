import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // if you're using ES Modules
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import billingRouter from "./routes/billingroutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import housekeepingRoutes from "./routes/housekeepingRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import receptionistRoutes from "./routes/receptionistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
// Allow only frontend on http://localhost:5173
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// Serve static uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/billings", billingRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
