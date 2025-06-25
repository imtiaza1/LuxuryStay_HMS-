import express from "express";
import { registerReceptionist } from "../controllers/receptionistController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/receptionist/register
router.post("/register", validateUser, registerReceptionist);

export default router;
