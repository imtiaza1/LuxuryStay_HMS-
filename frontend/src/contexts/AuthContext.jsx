import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { API_ENDPOINTS, DASHBOARD_ROUTES } from "../utils/constants";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored and user data
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
        setUser(null);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.LOGIN,
        { email, password },
        { withCredentials: true } // ✅ send credentials like cookies
      );

      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      const dashboardRoute = DASHBOARD_ROUTES[user.role];
      if (dashboardRoute) {
        navigate(dashboardRoute);
      } else {
        navigate("/dashboard/guest");
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.response.data.message };
    }
  };

  const register = async (userData) => {
    try {
      // TODO: Replace with actual API call
      const response = await api.post(API_ENDPOINTS.GUEST_REGISTER, userData);
      navigate("/login");

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.response.data.message };
    }
  };

  const logout = async () => {
    try {
      await api.post(
        API_ENDPOINTS.LOGOUT,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
