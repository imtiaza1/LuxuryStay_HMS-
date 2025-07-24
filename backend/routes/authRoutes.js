import express from "express";
import {
  loginUser,
  logoutUser,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// update profile
router.put("/update-profile", protect, updateProfile);

export default router;
