import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";
import { useAuth } from "./AuthContext";

export const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeGuests, setActiveGuests] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [housekeepingTasks, setHousekeepingTasks] = useState([]);
  const [CheckedINNOut, setCheckedINNOut] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // These endpoints should return values based on user role
        const [
          revenueRes,
          bookingsRes,
          guestsRes,
          roomsRes,
          recentBookingsRes,
          tasksRes,
          getAllCheckInNCheckOut,
        ] = await Promise.all([
          api.get(API_ENDPOINTS.TOTAL_REVENUE),
          api.get(API_ENDPOINTS.TOTAL_BOOKINGS),
          api.get(API_ENDPOINTS.ACTIVE_GUESTS),
          api.get(API_ENDPOINTS.AVAILABLE_ROOMS),
          api.get(API_ENDPOINTS.RECENT_BOOKINGS),
          api.get(API_ENDPOINTS.HOUSEKEEPING_TASKS),
          api.get(API_ENDPOINTS.GET_ALL_CHECKED_IN_N_CHECKOUT),
        ]);

        setTotalRevenue(revenueRes.data.totalRevenue || 0);
        setTotalBookings(bookingsRes.data.totalBookings || 0);
        setActiveGuests(guestsRes.data.totalActiveGuests || 0);
        setAvailableRooms(roomsRes.data.totalRooms || 0);
        setRecentBookings(recentBookingsRes.data.bookings || []);
        setHousekeepingTasks(tasksRes.data.tasks || []);
        setCheckedINNOut(getAllCheckInNCheckOut.data || []);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const value = {
    totalRevenue,
    totalBookings,
    activeGuests,
    availableRooms,
    recentBookings,
    housekeepingTasks,
    loading,
    CheckedINNOut,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
