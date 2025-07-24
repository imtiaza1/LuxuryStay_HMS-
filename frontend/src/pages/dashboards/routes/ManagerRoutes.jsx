import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";

import Dashboard from "../ManagerDashboard";
import RoomsPage from "../pages/admin_pages/RoomsPage";
import BookingsPage from "../pages/manager_pages/BookingsPage";
import GuestPage from "../pages/manager_pages/GuestPage";
import ReviewsPage from "../pages/manager_pages/ReviewsPage";
import StaffPage from "../pages/manager_pages/StaffPage";
import TaskAssignmentPage from "../pages/manager_pages/TaskAssignmentPage";
const ManagerRoutes = () => {
  return (
    <DashboardLayout title="Manager Panel">
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="guest" element={<GuestPage />} />
        <Route path="taskassign" element={<TaskAssignmentPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ManagerRoutes;
