import express from "express";
import {
  deleteGuest,
  getAllGuest,
  registerGuest,
  totalActiveGuests,
} from "../controllers/guestController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";

const router = express.Router();

// POST /api/guest/register
router.post("/register", registerGuest);
router.get("/", getAllGuest);
router.delete("/delete/:id", protect, restrictTo("admin"), deleteGuest);

router.get("/active-guests/count", totalActiveGuests);

export default router;
