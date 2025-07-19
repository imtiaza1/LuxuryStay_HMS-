import Task from "../models/taskModels.js";
import User from "../models/userModel.js";

// CREATE
export const createTask = async (req, res) => {
  const user_id = req.user.id;
  try {
    const { title, description, assignedToEmail, dueDate, priority, type } =
      req.body;

    if (!title || !assignedToEmail || !priority || !type) {
      return res.status(400).json({
        message: "Title, assignedToEmail, priority, and type are required.",
      });
    }

    const user = await User.findOne({ email: assignedToEmail });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Staff with this email not found" });
    }

    const newTask = await Task.create({
      title,
      description,
      assignedTo: user._id,
      dueDate,
      priority,
      type,
      createdBy: user_id,
    });

    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE taks
export const updateTask = async (req, res) => {
  try {
    const { title, description, assignedToEmail, status, priority, type } =
      req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (assignedToEmail) {
      const user = await User.findOne({ email: assignedToEmail });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Staff with this email not found" });
      }
      task.assignedTo = user._id;
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.type = type || task.type;

    const updated = await task.save();
    res.status(200).json({ success: true, task: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update status only
export const statusUpdate = async (req, res) => {
  const { status } = req.body;

  try {
    // Check if task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    // Update status
    if (status) {
      task.status = status;
    }

    const updatedTask = await task.save();
    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
