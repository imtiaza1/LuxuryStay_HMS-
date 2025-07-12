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
// Show all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: { $in: ["housekeeping", "receptionist", "manager"] },
    });

    if (!staff || staff.length === 0) {
      return res.status(404).json({
        message: "No staff found",
      });
    }

    res.status(200).json({
      message: "Fetched all staff",
      users: staff,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a staff member
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists and has a staff role
    const staff = await User.findOne({
      _id: id,
      role: { $in: ["housekeeping", "receptionist", "manager"] },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a staff member
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, contact } = req.body;

    // Check if the user exists and is staff
    const staff = await User.findOne({
      _id: id,
      role: { $in: ["housekeeping", "receptionist", "manager"] },
    });

    if (!staff) {
      return res
        .status(404)
        .json({
          message: "Staff member not found or role not allowed to be updated",
        });
    }

    // Update allowed fields only
    staff.name = name || staff.name;
    staff.email = email || staff.email;
    staff.password = password || staff.password; // Make sure this is already hashed
    staff.role = role || staff.role;
    staff.contact = contact || staff.contact;

    await staff.save();

    res.status(200).json({
      message: "Staff member updated successfully",
      updatedStaff: staff,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
