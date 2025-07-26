# 🏨 LuxuryStay - Hotel Management System

LuxuryStay is a full-stack hotel management system designed to streamline hotel operations such as room booking, billing, housekeeping, and user management. The platform supports multiple user roles including Guest, Receptionist, Manager, and Admin — each with role-based dashboards and access control.

---

## 🚀 Features

- 🔐 User Register/Login (with profile image & bio)
- 🛏️ Room Listings & Detail Pages
- 📅 Booking Management (Create, View, Cancel)
- 💳 Stripe Payment Integration
- 🧾 Billing & Invoice System
- 🧹 Housekeeping Panel (Room status, cleaning status)
- 💼 Manager Dashboard (Stats, occupancy, revenue)
- 🧍 Receptionist Panel (Guest check-in/out, guest search)
- 🌙 Dark Mode Support
- 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS
- React Router
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Stripe API

---

---

## 🔄 User Flow (Roles Overview)

- **Guest:** Browse rooms → Book → Pay with Stripe → View billing
- **Receptionist:** Check-in/out guests → Search guest records
- **Manager:** View booking stats, revenue reports
- **Admin:** Manage rooms, users, bookings, housekeeping

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone github.com/yourusername/luxurystay.git](https://github.com/imtiaza1/LuxuryStay_HMS)
cd luxurystay

# 2. Install dependencies
npm install

# 3. Create environment variables
# .env (example)
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

# 4. Start the frontend
npm run dev


