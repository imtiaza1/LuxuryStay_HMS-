import express from "express";
import {
  getAllGuest,
  registerGuest,
  totalActiveGuests,
} from "../controllers/guestController.js";

const router = express.Router();

// POST /api/guest/register
router.post("/register", registerGuest);
router.get("/", getAllGuest);
router.get("/active-guests/count", totalActiveGuests);

export default router;
