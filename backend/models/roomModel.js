import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["single", "double", "suite", "deluxe"],
    required: true,
  },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "occupied", "cleaning", "maintenance"],
    default: "available",
  },
  features: { type: [String], default: [] },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Room", roomSchema);
