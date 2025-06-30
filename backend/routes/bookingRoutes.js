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

// create bookings
router.post(
  "/create",
  protect,
  restrictTo("admin", "manager", "receptionist", "guest"),
  createBooking
);
//get all bookings
router.get(
  "/",
  protect,
  restrictTo("admin", "manager", "receptionist"),
  getAllBookings
);
//get guestbookings
router.get(
  "/my-bookings",
  protect,
  restrictTo("guest", "admin"),
  getMyBookings
);
//update bookings
router.put(
  "/:id",
  protect,
  restrictTo("admin", "manager", "receptionist"),
  updateBookingStatus
);
//delete bookings
router.delete("/:id", protect, restrictTo("admin", "manager"), deleteBooking);

export default router;
