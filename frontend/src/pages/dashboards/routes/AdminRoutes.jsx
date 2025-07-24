import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";

import Dashboard from "../AdminDashboard";
import BillingPage from "../pages/admin_pages/BillingPage";
import BookingsPage from "../pages/admin_pages/BookingsPage";
import GuestPage from "../pages/admin_pages/GuestPage";
import ReviewsPage from "../pages/admin_pages/ReviewsPage";
import RoomsPage from "../pages/admin_pages/RoomsPage";
import StaffPage from "../pages/admin_pages/StaffPage";
import TaskAssignmentPage from "../pages/admin_pages/TaskAssignmentPage";
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
        <Route path="guest" element={<GuestPage />} />
        <Route path="taskassign" element={<TaskAssignmentPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
