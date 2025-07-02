import express from "express";
import { getAllGuest, registerGuest } from "../controllers/guestController.js";

const router = express.Router();

// POST /api/guest/register
router.post("/register", registerGuest);
router.get("/", getAllGuest);

export default router;
