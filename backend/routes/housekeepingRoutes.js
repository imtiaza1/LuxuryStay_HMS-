import express from "express";
import { registerHousekeeping } from "../controllers/housekeepingController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/register", validateUser, registerHousekeeping);

export default router;
