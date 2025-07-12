// src/routes/AdminRoutes.jsx
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

// Import your page components
// import BillingPage from "../pages/admin/BillingPage";
// import BookingsPage from "../pages/admin/BookingsPage";
// import HousekeepingPage from "../pages/admin/HousekeepingPage";
// import ReviewsPage from "../pages/admin/ReviewsPage";
// import RoomsPage from "../pages/admin/RoomsPage";
// import SettingsPage from "../pages/admin/SettingsPage";
import Dashboard from "../dashboards/AdminDashboard";
import StaffPage from "../dashboards/pages/StaffPage";

const AdminRoutes = () => {
  return (
    <DashboardLayout title="Admin Panel">
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="staff" element={<StaffPage />} />
        {/* <Route path="rooms" element={<RoomsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="housekeeping" element={<HousekeepingPage />} />
        <Route path="settings" element={<SettingsPage />} /> */}
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
