import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
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
router.get("/:id", getRoomById);

export default router;
