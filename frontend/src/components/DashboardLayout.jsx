import {
  Calendar,
  CheckSquare,
  ClipboardList,
  DollarSign,
  Home,
  Hotel,
  Key,
  LogOut,
  Menu,
  Settings,
  Star,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROLES } from "../utils/constants";

const DashboardLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { name: "Dashboard", icon: Home, path: `/dashboard/${user.role}` },
    ];

    switch (user.role) {
      case ROLES.ADMIN:
        return [
          ...baseItems,
          {
            name: "Staff Management",
            icon: Users,
            path: "/dashboard/admin/staff",
          },
          {
            name: "Room Management",
            icon: Hotel,
            path: "/dashboard/admin/rooms",
          },
          {
            name: "Bookings",
            icon: Calendar,
            path: "/dashboard/admin/bookings",
          },
          { name: "Reviews", icon: Star, path: "/dashboard/admin/reviews" },
          {
            name: "Billing",
            icon: DollarSign,
            path: "/dashboard/admin/billing",
          },
          {
            name: "TaskAsign",
            icon: CheckSquare,
            path: "/dashboard/admin/taskassign",
          },
        ];
      case ROLES.MANAGER:
        return [
          ...baseItems,
          {
            name: "Bookings",
            icon: Calendar,
            path: "/dashboard/manager/bookings",
          },
          {
            name: "Housekeeping",
            icon: ClipboardList,
            path: "/dashboard/manager/housekeeping",
          },
          {
            name: "Revenue",
            icon: DollarSign,
            path: "/dashboard/manager/revenue",
          },
          { name: "Staff", icon: Users, path: "/dashboard/manager/staff" },
        ];
      case ROLES.RECEPTIONIST:
        return [
          ...baseItems,
          {
            name: "Check-in/out",
            icon: UserCheck,
            path: "/dashboard/receptionist/checkin",
          },
          {
            name: "Bookings",
            icon: Calendar,
            path: "/dashboard/receptionist/bookings",
          },
          {
            name: "Guests",
            icon: Users,
            path: "/dashboard/receptionist/guests",
          },
          { name: "Rooms", icon: Key, path: "/dashboard/receptionist/rooms" },
        ];
      case ROLES.HOUSEKEEPING:
        return [
          ...baseItems,
          {
            name: "My Tasks",
            icon: CheckSquare,
            path: "/dashboard/housekeeping/tasks",
          },
          {
            name: "Room Status",
            icon: Hotel,
            path: "/dashboard/housekeeping/rooms",
          },
        ];
      case ROLES.GUEST:
        return [
          ...baseItems,
          {
            name: "My Bookings",
            icon: Calendar,
            path: "/dashboard/guest/bookings",
          },
          { name: "Browse Rooms", icon: Hotel, path: "/dashboard/guest/rooms" },
          { name: "Reviews", icon: Star, path: "/dashboard/guest/reviews" },
          { name: "Profile", icon: Settings, path: "/dashboard/guest/profile" },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gold-100 text-gold-800 dark:bg-gold-900/20 dark:text-gold-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Welcome, {user.name}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
