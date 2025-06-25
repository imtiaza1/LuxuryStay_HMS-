import express from "express";
import { registerManager } from "../controllers/managerController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/manager/register
router.post("/register", validateUser, registerManager);

export default router;
