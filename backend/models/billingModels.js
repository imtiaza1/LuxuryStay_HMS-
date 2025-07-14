import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed"],
      default: "pending",
    },
    invoiceNumber: {
      type: String,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash",
    },
    paidAt: Date,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Billing", billingSchema);
