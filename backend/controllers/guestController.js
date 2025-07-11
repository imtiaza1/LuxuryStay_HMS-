import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerGuest = async (req, res) => {
  const { name, email, password, contact, preferences } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already exists!" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      contact,
      preferences,
      role: "guest",
    });

    res.status(201).json({ message: "Guest registered", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// show all guests
export const getAllGuest = async (req, res) => {
  try {
    const guests = await User.find({ role: "guest" });

    if (!guests || guests.length === 0) {
      return res.status(404).json({
        message: "No guests found",
      });
    }

    res.status(200).json({
      message: "Fetched all guests",
      users: guests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get total count of active guest accounts
export const totalActiveGuests = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "guest", isActive: true });

    res.status(200).json({
      success: true,
      totalActiveGuests: count,
    });
  } catch (error) {
    console.error("Error fetching active guests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
