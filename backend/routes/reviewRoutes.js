import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getRoomReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";

const router = express.Router();

// create review (guest only)
router.post("/create/:roomId", protect, restrictTo("guest"), createReview);

// get reviews for a room
router.get("/:roomId", getRoomReviews);
// get all room
router.get("/", protect, restrictTo("admin", "manager"), getAllReviews);

// delete review (guest himself or admin)
router.delete("/:id", protect, restrictTo("guest", "admin"), deleteReview);

export default router;
