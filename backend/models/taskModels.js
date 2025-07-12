import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    type: {
      type: String,
      enum: ["cleaning", "maintenance", "inspection"],
      required: true,
    },

    dueDate: { type: Date },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // mostly admin
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
