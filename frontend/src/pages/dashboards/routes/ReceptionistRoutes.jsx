import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";
import BookingsPage from "../pages/receptionist_pages/BookingsPage";

import Dashboard from "../ReceptionistDashboard";

const ReceptionistRoute = () => {
  return (
    <DashboardLayout title="Receptionist panel">
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="bookings" element={<BookingsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ReceptionistRoute;