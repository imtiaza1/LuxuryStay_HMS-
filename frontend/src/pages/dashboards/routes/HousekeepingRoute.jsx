// src/routes/AdminRoutes.jsx
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";

// Import your page components
import Dashboard from "../HousekeepingDashboard";
import Task from "../pages/Housekeeping_pages/Task";

const HousekeepingRoute = () => {
  return (
    <DashboardLayout title="House keeping panel">
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="tasks" element={<Task />} />
        {/* <Route path="rooms" element={<RoomsPage />} /> */}
        {/* <Route path="bookings" element={<BookingsPage />} /> */}
      </Routes>
    </DashboardLayout>
  );
};

export default HousekeepingRoute;
