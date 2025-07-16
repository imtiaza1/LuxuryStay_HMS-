import Billing from "../models/billingModels.js";
import Booking from "../models/bookingModels.js";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";
import { sendBookingConfirmationEmail } from "../utils/sendBookingEmail.js";

export const createBooking = async (req, res) => {
  try {
    const {
      guestId: guestIdFromBody, // guestId from body (admin/reception)
      roomId,
      checkInDate,
      checkOutDate,
      status,
      additionalServices,
      totalPrice,
      billingStatus,
    } = req.body;

    // 🧠 Determine guest ID
    const guestId = guestIdFromBody || req.user.id;

    // 🔍 Verify guest exists
    const guest = await User.findById(guestId);
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    // 🔍 Verify room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ✅ Create booking
    const booking = await Booking.create({
      guestId,
      roomId,
      checkInDate,
      checkOutDate,
      status,
      additionalServices,
      totalPrice,
    });
    // Change the room status to "occupied" after booking
    await Room.findByIdAndUpdate(roomId, { status: "occupied" }, { new: true });

    // ✅ Create billing
    const invoiceNumber = `INV-${Date.now()}`;
    const billing = await Billing.create({
      booking: booking._id,
      amount: totalPrice,
      status: billingStatus,
      invoiceNumber,
    });

    // ✅ Link billing to booking
    booking.billingId = billing._id;
    await booking.save();

    // ✅ Send confirmation email
    await sendBookingConfirmationEmail(guest.email, booking);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
      billing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("guestId", "name email _id")
      .populate("roomId", "roomNumber type _id")
      .populate("billingId", "status amount invoiceNumber _id");

    // Handle missing references
    const safeBookings = bookings.map((booking) => ({
      _id: booking._id,
      guest: booking.guestId || { name: "Guest not found", email: "" },
      room: booking.roomId || { roomNumber: "Room deleted", type: "" },
      billing: booking.billingId || {
        status: "N/A",
        amount: 0,
        invoiceNumber: "-",
      },
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      additionalServices: booking.additionalServices,
      status: booking.status,
    }));

    res.status(200).json({
      success: true,
      bookings: safeBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get bookings for guest
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guestId: req.user.id })
      .populate("roomId", "roomNumber type")
      .populate("billingId", "status amount invoiceNumber");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking and billing status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      roomId,
      guestId,
      checkInDate,
      checkOutDate,
      status,
      billingStatus,
      additionalServices,
      totalPrice,
    } = req.body;

    // First, find and update the booking
    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        roomId,
        guestId,
        checkInDate,
        checkOutDate,
        status,
        additionalServices,
      },
      { new: true }
    ).populate("billingId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Then, update billing status if provided
    if (booking.billingId) {
      if (billingStatus) {
        booking.billingId.status = billingStatus;
      }
      if (totalPrice) {
        booking.billingId.amount = totalPrice;
      }
      await booking.billingId.save();
    }
    // 🟡 If booking is cancelled, mark room as available
    if (status === "cancelled") {
      await Room.findByIdAndUpdate(
        roomId,
        { status: "available" },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete bookings
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // delete associated billing
    await Billing.findByIdAndDelete(booking.billingId);

    // delete booking
    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Booking and billing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get total number of bookings
export const totalBookings = async (req, res) => {
  try {
    const count = await Booking.countDocuments();

    res.status(200).json({
      success: true,
      totalBookings: count,
    });
  } catch (error) {
    console.error("Error getting total bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
