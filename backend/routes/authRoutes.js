import express from "express";
import { loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
