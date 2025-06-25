import express from "express";
import { registerGuest } from "../controllers/guestController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/guest/register
router.post("/register", validateUser, registerGuest);

export default router;
