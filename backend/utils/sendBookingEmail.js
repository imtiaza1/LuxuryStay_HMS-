import nodemailer from "nodemailer";

export const sendBookingConfirmationEmail = async (toEmail, bookingData) => {
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
      subject: `Booking Confirmation - ${bookingData._id}`,
      html: `
        <h2>Thank you for booking with LuxuryStay!</h2>
        <p>Booking ID: <strong>${bookingData._id}</strong></p>
        <p>Check-In: <strong>${bookingData.checkInDate.toDateString()}</strong></p>
        <p>Check-Out: <strong>${bookingData.checkOutDate.toDateString()}</strong></p>
        <p>Amount Due: <strong>${bookingData.totalPrice}</strong></p>
        <p>Status: <strong>Pending Payment</strong></p>
        <p>Please complete payment soon to confirm your booking.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${toEmail}`);
  } catch (err) {
    console.log("Booking confirmation email failed:", err.message);
  }
};
