import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerAdmin = async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      contact,
      role: "admin",
    });

    res.status(201).json({ message: "Admin registered", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
