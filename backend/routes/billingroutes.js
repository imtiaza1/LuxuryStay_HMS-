import express from "express";
import {
  confirmOnlineBilling,
  createCashBilling,
  createPaymentIntent,
  deleteBilling,
  getAllBillings,
  getBilling,
  updateBilling,
} from "../controllers/billingController.js";
import { protect } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";

const router = express.Router();

router.post(
  "/cash",
  protect,
  restrictTo("admin", "receptionist", "manager", "guest"),
  createCashBilling
);
router.post("/payment-intent", createPaymentIntent); // create stripe payment intent
router.post("/confirm", confirmOnlineBilling); // confirm after success

router.get("/", getAllBillings);
router.get("/:id", getBilling);
router.put("/:id", updateBilling);
router.delete("/:id", deleteBilling);

export default router;
