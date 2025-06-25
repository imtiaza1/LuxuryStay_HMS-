import express from "express";
import { loginUser } from "../controllers/authController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", validateUser, loginUser);

export default router;
