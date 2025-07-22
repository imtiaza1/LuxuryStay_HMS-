// src/routes/AdminRoutes.jsx
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";

// Import your page components
import Dashboard from "../HousekeepingDashboard";

const HousekeepingRoute = () => {
  return (
    <DashboardLayout title="House keeping panel">
      <Routes>
        <Route path="" element={<Dashboard />} />
      </Routes>
    </DashboardLayout>
  );
};

export default HousekeepingRoute;
