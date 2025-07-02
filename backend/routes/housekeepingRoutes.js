import express from "express";
import {
  getAllHousekeeper,
  getMyTasks,
  registerHousekeeping,
  updateMyTaskStatus,
} from "../controllers/housekeepingController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";

const router = express.Router();

// register housekeeping staff (only admin can do usually)
router.post("/register", protect, restrictTo("admin"), registerHousekeeping);

// get housekeeping's own tasks
router.get("/my-tasks", protect, restrictTo("housekeeping"), getMyTasks);

// update own task status
router.put(
  "/my-tasks/:id",
  protect,
  restrictTo("housekeeping"),
  updateMyTaskStatus
);
// get all housekeeper
router.get("/", protect, restrictTo("admin"), getAllHousekeeper);

export default router;
