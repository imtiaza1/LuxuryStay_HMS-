import express from "express";
import { registerAdmin } from "../controllers/adminController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/admin/register
router.post("/register", validateUser, registerAdmin);

export default router;
