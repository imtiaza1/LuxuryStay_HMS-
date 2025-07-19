import express from "express";
import {
  availableRooms,
  availableRoomsCount,
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  othersRooms,
  updateRoom,
} from "../controllers/roomController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  restrictTo("admin", "manager"),
  upload.array("images", 5),
  createRoom
);
router.put(
  "/update/:id",
  protect,
  restrictTo("admin", "manager"),
  upload.array("images", 5),
  updateRoom
);
router.delete("/delete/:id", protect, restrictTo("admin"), deleteRoom);
router.get("/", getRooms);
router.get("/available/rooms/count", availableRoomsCount);
router.get("/available/rooms", availableRooms);
router.get("/available/rooms/other", othersRooms);
router.get("/:id", getRoomById);

export default router;
