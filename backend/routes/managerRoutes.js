import express from "express";
import {
  getAllManager,
  registerManager,
} from "../controllers/managerController.js";
import { restrictTo } from "../middlewares/role.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

// POST /api/manager/register
router.post("/register", validateUser, registerManager);

// get all manager
router.get("/", restrictTo("admin"), getAllManager);

export default router;
