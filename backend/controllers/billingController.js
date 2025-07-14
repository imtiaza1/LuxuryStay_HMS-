import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import Billing from "../models/billingModels.js";
import Booking from "../models/bookingModels.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ============= Reusable invoice sender =============
const sendInvoiceEmail = async (toEmail, invoiceData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"LuxuryStay" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject: `Your Invoice - ${invoiceData.invoiceNumber}`,
      html: `
        <h2>Thank you for staying with us!</h2>
        <p>Invoice Number: <strong>${invoiceData.invoiceNumber}</strong></p>
        <p>Amount: <strong>${invoiceData.amount}</strong></p>
        <p>Status: <strong>${invoiceData.status}</strong></p>
        <p>Payment Method: <strong>${invoiceData.paymentMethod}</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Email sending failed:", err.message);
  }
};

// ============= Cash Billing =============
export const createCashBilling = async (req, res) => {
  try {
    const { bookingId, amount, notes } = req.body;
    const booking = await Booking.findById(bookingId).populate("guestId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    const invoiceNumber = `INV-${Date.now()}`;

    const billing = await Billing.create({
      booking: booking._id,
      amount,
      invoiceNumber,
      paymentMethod: "cash",
      status: "confirmed",
      paidAt: new Date(),
      notes,
    });

    booking.billingId = billing._id;
    await booking.save();

    await sendInvoiceEmail(booking.guestId.email, billing);

    res.status(201).json({ success: true, billing });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// ============= Online Billing - Simple PaymentIntent =============
export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ============= Confirm Online Billing after payment success =============
export const confirmOnlineBilling = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    const booking = await Booking.findById(bookingId).populate("guestId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const invoiceNumber = `INV-${Date.now()}`;

    const billing = await Billing.create({
      booking: booking._id,
      amount,
      invoiceNumber,
      paymentMethod: "online",
      status: "confirmed",
      paidAt: new Date(),
    });

    booking.billingId = billing._id;
    await booking.save();

    await sendInvoiceEmail(booking.guestId.email, billing);

    res.status(201).json({ success: true, billing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============= Other CRUD =============
export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find().populate("booking");
    res.json({ success: true, billings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBilling = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate("booking");
    if (!billing) return res.status(404).json({ message: "Billing not found" });
    res.json({ success: true, billing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!billing) return res.status(404).json({ message: "Billing not found" });
    res.json({ success: true, billing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) return res.status(404).json({ message: "Billing not found" });
    res.json({ success: true, message: "Billing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get total revenue from all billings
export const getTotalRevenue = async (req, res) => {
  try {
    const billings = await Billing.find({ status: "confirmed" });

    const totalRevenue = billings.reduce((sum, bill) => {
      return sum + (bill.amount || 0);
    }, 0);

    res.status(200).json({
      success: true,
      totalRevenue,
    });
  } catch (err) {
    console.error("Error calculating total revenue:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
