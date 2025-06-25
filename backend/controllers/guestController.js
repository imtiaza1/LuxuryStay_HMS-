import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerGuest = async (req, res) => {
  const { name, email, password, contact, preferences } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Guest already exists" });

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
