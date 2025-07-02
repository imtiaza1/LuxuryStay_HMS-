import Review from "../models/reviewModel.js";
import Room from "../models/roomModel.js";

// CREATE review
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const guest = req.user.id;
    const roomId = req.params.roomId;

    // verify room exists
    const roomExists = await Room.findById(roomId);
    if (!roomExists) return res.status(404).json({ message: "Room not found" });

    // optionally: check if guest has already reviewed
    const exists = await Review.findOne({ guest, roomId });
    if (exists)
      return res
        .status(400)
        .json({ message: "You already submitted a review for this room" });

    const review = await Review.create({
      guest,
      room: roomId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET reviews for a specific room
export const getRoomReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ room: req.params.roomId })
      .populate("guest", "name email")
      .sort("-createdAt");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE review (only admin or guest who wrote it)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // only admin or review owner can delete
    if (req.user.role !== "admin" && req.user.id !== review.guest.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
