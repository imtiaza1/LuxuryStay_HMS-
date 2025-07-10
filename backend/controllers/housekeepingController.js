import bcrypt from "bcryptjs";
import Task from "../models/taskModels.js";
import User from "../models/userModel.js";

// REGISTER Housekeeping
export const registerHousekeeping = async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist)
      return res
        .status(400)
        .json({ message: "Housekeeping staff already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      contact,
      role: "housekeeping",
    });

    res
      .status(201)
      .json({ message: "Housekeeping registered", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET housekeeping staff's own tasks
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// show all housekeeper
export const getAllHousekeeper = async (req, res) => {
  try {
    const guests = await User.find({ role: "housekeeping" });

    if (!guests || guests.length === 0) {
      return res.status(404).json({
        message: "No HouseKeeper found",
      });
    }

    res.status(200).json({
      message: "Fetched all housekeeping",
      users: guests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// UPDATE housekeeping staff's own task status
export const updateMyTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user.id, // verify ownership
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
