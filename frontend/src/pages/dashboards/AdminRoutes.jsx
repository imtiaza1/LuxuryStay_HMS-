// src/routes/AdminRoutes.jsx
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

// Import your page components
import Dashboard from "../dashboards/AdminDashboard";
import BillingPage from "../dashboards/pages/BillingPage";
import BookingsPage from "../dashboards/pages/BookingsPage";
import HousekeepingPage from "../dashboards/pages/HousekeepingPage";
import ReviewsPage from "../dashboards/pages/ReviewsPage";
import RoomsPage from "../dashboards/pages/RoomsPage";
import SettingsPage from "../dashboards/pages/SettingsPage";
import StaffPage from "../dashboards/pages/StaffPage";

const AdminRoutes = () => {
  return (
    <DashboardLayout title="Admin Panel">
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="housekeeping" element={<HousekeepingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
