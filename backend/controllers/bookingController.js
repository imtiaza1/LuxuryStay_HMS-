import Billing from "../models/billingModels.js";
import Booking from "../models/bookingModels.js";
import Room from "../models/roomModel.js";

export const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      checkInDate,
      checkOutDate,
      status,
      additionalServices,
      totalPrice,
    } = req.body;

    const guestId = req.user.id;

    // verify room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // 1️⃣ Booking create
    const booking = await Booking.create({
      guestId,
      roomId,
      checkInDate,
      checkOutDate,
      status,
      additionalServices,
      totalPrice,
    });

    // 2️⃣ Billing create
    const invoiceNumber = `INV-${Date.now()}`;
    const billing = await Billing.create({
      booking: booking._id,
      amount: totalPrice,
      invoiceNumber,
    });

    // 3️⃣ Booking me billingId update
    booking.billingId = billing._id;
    await booking.save();

    res.status(201).json({
      success: true,
      message: "succes",
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
      .populate("guestId", "name email")
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

// update booking status only
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("billingId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
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
