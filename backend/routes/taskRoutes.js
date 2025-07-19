import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  statusUpdate,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";

const router = express.Router();

// Admins or managers can create tasks
router.post("/create", protect, restrictTo("admin", "manager"), createTask);

// All staff can view tasks
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);

// update status only by admin or manager only
router.put("/:id", protect, restrictTo("admin", "manager"), statusUpdate);

// Update or delete by admin or manager only
router.put("/update/:id", protect, restrictTo("admin", "manager"), updateTask);
router.delete("/:id", protect, restrictTo("admin", "manager"), deleteTask);

export default router;
