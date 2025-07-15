import fs from "fs";
import path from "path";
import Room from "../models/roomModel.js";

// CREATE
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, title, type, price, status, features } = req.body;
    const images = req.files?.map((file) => file.filename) || [];

    // Validate fields
    if (!roomNumber || roomNumber.trim() === "") {
      return res.status(400).json({ message: "Room number cannot be empty." });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "title number cannot be empty." });
    }
    if (!type || type.trim() === "") {
      return res.status(400).json({ message: "Type cannot be empty." });
    }
    const allowedTypes = ["single", "double", "suite", "deluxe"];
    if (!allowedTypes.includes(type.trim())) {
      return res.status(400).json({
        message: "Type must be one of: single, double, suite, or deluxe.",
      });
    }
    if (!price || isNaN(price)) {
      return res
        .status(400)
        .json({ message: "Price must be a valid number and cannot be empty." });
    }
    const allowedStatus = ["available", "occupied", "cleaning", "maintenance"];
    if (!status || !allowedStatus.includes(status.trim())) {
      return res.status(400).json({
        message:
          "Status must be one of: available, occupied, cleaning, or maintenance.",
      });
    }
    if (!features || features.trim() === "") {
      return res.status(400).json({ message: "Features cannot be empty." });
    }

    // Validate images
    if (req.files && req.files.length > 0) {
      const allowedExts = [".jpg", ".jpeg", ".png"];
      for (const file of req.files) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExts.includes(ext)) {
          return res.status(400).json({
            message: `Invalid image type for ${file.originalname}. Only JPG and PNG files are allowed.`,
          });
        }
      }
    }

    // Check for duplicate room number
    const exists = await Room.findOne({ roomNumber });
    if (exists) {
      // delete the uploaded images if room already exists
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const filePath = path.join("uploads/rooms", file.filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
      }
      return res
        .status(400)
        .json({ message: "A room with this number already exists." });
    }

    const newRoom = await Room.create({
      roomNumber,
      title,
      type,
      price,
      status,
      features,
      images,
    });

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all AVAILABLE_ROOMS_count
export const availableRoomsCount = async (req, res) => {
  try {
    const rooms = await Room.find({ status: "available" });
    const totalRooms = rooms.length;
    res.status(200).json({ success: true, totalRooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all AVAILABLE_ROOMS
export const availableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ status: "available" });
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }
    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    const { roomNumber, title, type, price, status, features } = req.body;

    const newImages = req.files?.map((file) => file.filename);

    // Validate fields
    if (!roomNumber || roomNumber.trim() === "") {
      return res.status(400).json({ message: "Room number cannot be empty." });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "title number cannot be empty." });
    }
    if (!type || type.trim() === "") {
      return res.status(400).json({ message: "Type cannot be empty." });
    }
    const allowedTypes = ["single", "double", "suite", "deluxe"];
    if (!allowedTypes.includes(type.trim())) {
      return res.status(400).json({
        message: "Type must be one of: single, double, suite, or deluxe.",
      });
    }
    if (!price || isNaN(price)) {
      return res
        .status(400)
        .json({ message: "Price must be a valid number and cannot be empty." });
    }
    const allowedStatus = ["available", "occupied", "cleaning", "maintenance"];
    if (!status || !allowedStatus.includes(status.trim())) {
      return res.status(400).json({
        message:
          "Status must be one of: available, occupied, cleaning, or maintenance.",
      });
    }
    if (!features || features.trim() === "") {
      return res.status(400).json({ message: "Features cannot be empty." });
    }

    // Validate images
    if (req.files && req.files.length > 0) {
      const allowedExts = [".jpg", ".jpeg", ".png"];
      for (const file of req.files) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExts.includes(ext)) {
          return res.status(400).json({
            message: `Invalid image type for ${file.originalname}. Only JPG and PNG files are allowed.`,
          });
        }
      }
    }
    // Check for duplicate room number
    const existingRoom = await Room.findOne({ roomNumber });

    // Allow if same room, block if it's used by another room
    if (existingRoom && existingRoom._id.toString() !== room._id.toString()) {
      // delete uploaded images since update fails
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const filePath = path.join("uploads/rooms", file.filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
      }

      return res
        .status(400)
        .json({ message: "A room with this number already exists." });
    }

    // replace images if new ones uploaded
    if (newImages?.length) {
      // remove old images
      room.images.forEach((img) => {
        const filePath = path.join("uploads/rooms", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      room.images = newImages;
    }

    room.roomNumber = roomNumber || room.roomNumber;
    room.type = type || room.type;
    room.title = title || room.title;
    room.price = price || room.price;
    room.status = status || room.status;
    room.features = features || room.features;

    const updated = await room.save();
    res.status(200).json({ success: true, room: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // remove images from disk
    room.images.forEach((img) => {
      const filePath = path.join("uploads/rooms", img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await room.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Room deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
