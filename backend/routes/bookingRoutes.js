import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";

const router = express.Router();

//
router.post(
  "/",
  protect,
  restrictTo("admin", "manager", "receptionist", "guest"),
  createBooking
);
router.get(
  "/",
  protect,
  restrictTo("admin", "manager", "receptionist"),
  getAllBookings
);
router.get("/my-bookings", protect, restrictTo("guest"), getMyBookings);
router.put(
  "/:id",
  protect,
  restrictTo("admin", "manager", "receptionist"),
  updateBookingStatus
);
router.delete("/:id", protect, restrictTo("admin", "manager"), deleteBooking);

export default router;
