import express from "express";
import {
  checkInNOutGuest,
  createBooking,
  deleteBooking,
  getAllBookings,
  getMyBookings,
  recentBookings,
  totalBookings,
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
router.get(
  "/recent/bookings",
  protect,
  restrictTo("admin", "manager"),
  recentBookings
);
//get guestbookings
router.get(
  "/my-bookings",
  protect,
  restrictTo("guest", "admin"),
  getMyBookings
);
//get total bookings
router.get("/total", totalBookings);
//get all checkInNOutGuest
router.get("/checkinandcheckoutguest", checkInNOutGuest);

//update bookings
router.put(
  "/update/:id",
  protect,
  restrictTo("admin", "manager", "receptionist"),
  updateBookingStatus
);
//delete bookings
router.delete(
  "/delete/:id",
  protect,
  restrictTo("admin", "manager"),
  deleteBooking
);

export default router;
