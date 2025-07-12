import express from "express";
import {
  deleteStaff,
  getAllStaff,
  registerAdmin,
  updateStaff,
} from "../controllers/adminController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/admin/register
router.post("/register", validateUser, registerAdmin);
router.get("/staff", protect, restrictTo("admin", "manager"), getAllStaff);
router.put(
  "/staff/update/:id",
  protect,
  restrictTo("admin", "manager"),
  updateStaff
);
router.delete(
  "/staff/delete/:id",
  protect,
  restrictTo("admin", "manager"),
  deleteStaff
);

export default router;
