import express from "express";
import { registerGuest } from "../controllers/guestController.js";

const router = express.Router();

// POST /api/guest/register
router.post("/register", registerGuest);

export default router;
