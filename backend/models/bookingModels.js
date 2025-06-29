import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["reserved", "checked-in", "checked-out", "cancelled"],
      default: "reserved",
    },
    additionalServices: [String], // laundry, food, wake-up call etc.
    totalPrice: Number,

    billingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
