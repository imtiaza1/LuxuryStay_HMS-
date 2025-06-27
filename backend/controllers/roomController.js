import fs from "fs";
import path from "path";
import Room from "../models/roomModel.js";

// CREATE
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status, features } = req.body;
    const images = req.files?.map((file) => file.filename) || [];

    // Check required fields
    if (!roomNumber || roomNumber.trim() === "") {
      return res.status(400).json({ message: "roomNumber cannot be empty" });
    }
    if (!type || type.trim() === "") {
      return res.status(400).json({ message: "type cannot be empty" });
    }
    if (!price || isNaN(price)) {
      return res
        .status(400)
        .json({ message: "price must be a number and cannot be empty" });
    }
    const allowedStatus = ["single", "double", "suite", "deluxe"];

    if (!status || !allowedStatus.includes(status.trim())) {
      return res.status(400).json({
        message: "status must be one of: single, double, suite, or deluxe",
      });
    }

    if (!features || features.trim() === "") {
      return res.status(400).json({ message: "features can not be ampty" });
    }
    // Validate images: only jpg and png
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
    if (
      images[0].mimetype !== "image/jpeg" &&
      images[0].mimetype !== "image/png"
    ) {
      return res
        .status(400)
        .json({ message: "Please upload a valid image file", success: false });
    }
    //check room already exists
    const exists = await Room.findOne({ roomNumber });
    if (exists) return res.status(400).json({ message: "Room already exists" });

    const newRoom = await Room.create({
      roomNumber,
      type,
      price,
      status,
      features: features ? JSON.parse(features) : [],
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

// READ ONE
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { roomNumber, type, price, status, features } = req.body;
    const newImages = req.files?.map((file) => file.filename);

    // delete old images if new ones uploaded
    if (newImages?.length) {
      room.images.forEach((img) => {
        const filePath = path.join("uploads/rooms", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      room.images = newImages;
    }

    room.roomNumber = roomNumber || room.roomNumber;
    room.type = type || room.type;
    room.price = price || room.price;
    room.status = status || room.status;
    room.features = features ? JSON.parse(features) : room.features;

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
    if (!room) return res.status(404).json({ message: "Room not found" });

    // delete images
    room.images.forEach((img) => {
      const filePath = path.join("uploads/rooms", img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await room.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
