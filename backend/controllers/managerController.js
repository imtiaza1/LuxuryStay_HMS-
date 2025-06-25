import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerManager = async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Manager already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      contact,
      role: "manager",
    });

    res.status(201).json({ message: "Manager registered", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
