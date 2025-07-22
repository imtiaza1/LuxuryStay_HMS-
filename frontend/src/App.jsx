import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import NotFound from "./pages/NotFound";

// Public Pages
import About from "./pages/About";
import Amenities from "./pages/Amenities";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import Rooms from "./pages/Rooms";
import Services from "./pages/Services";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import GuestDashboard from "./pages/dashboards/GuestDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import AdminRoutes from "./pages/dashboards/routes/AdminRoutes";
import HousekeepingRoutes from "./pages/dashboards/routes/HousekeepingRoute";
import ReceptionistRoutes from "./pages/dashboards/routes/ReceptionistRoutes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardProvider>
          <ToastProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/room/:id" element={<RoomDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/amenities" element={<Amenities />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Dashboard Routes */}

                  <Route
                    path="/dashboard/admin/*"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminRoutes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/manager"
                    element={
                      <ProtectedRoute allowedRoles={["manager"]}>
                        <ManagerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/receptionist/*"
                    element={
                      <ProtectedRoute allowedRoles={["receptionist"]}>
                        <ReceptionistRoutes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/housekeeping/*"
                    element={
                      <ProtectedRoute allowedRoles={["housekeeping"]}>
                        <HousekeepingRoutes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/guest"
                    element={
                      <ProtectedRoute allowedRoles={["guest"]}>
                        <GuestDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
