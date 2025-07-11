import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Hotel,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useDashboard } from "../../contexts/DashboardContext";
import { useToast } from "../../contexts/ToastContext";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const {
    totalRevenue,
    totalBookings,
    activeGuests,
    availableRooms,
    // recentBookings,
    // housekeepingTasks,
  } = useDashboard();
  const { success, error } = useToast();

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Active Guests",
      value: activeGuests,
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "purple",
    },
    {
      title: "Available Rooms",
      value: availableRooms,
      change: "+5.4%",
      trend: "up",
      icon: Hotel,
      color: "orange",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "John Smith",
      room: "Deluxe Ocean View",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      amount: "$897",
      status: "confirmed",
    },
    {
      id: 2,
      guest: "Emily Johnson",
      room: "Presidential Suite",
      checkIn: "2024-01-16",
      checkOut: "2024-01-20",
      amount: "$2,696",
      status: "checked_in",
    },
    {
      id: 3,
      guest: "Michael Brown",
      room: "Standard Garden View",
      checkIn: "2024-01-17",
      checkOut: "2024-01-19",
      amount: "$398",
      status: "pending",
    },
  ];

  const housekeepingTasks = [
    {
      id: 1,
      room: "Room 101",
      type: "Cleaning",
      assignedTo: "Maria Garcia",
      status: "completed",
      priority: "high",
    },
    {
      id: 2,
      room: "Room 205",
      type: "Maintenance",
      assignedTo: "David Wilson",
      status: "in_progress",
      priority: "medium",
    },
    {
      id: 3,
      room: "Room 310",
      type: "Inspection",
      assignedTo: "Sarah Lee",
      status: "pending",
      priority: "low",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "checked_in":
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "checked_in":
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Dashboard Overview
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}
                  >
                    <Icon
                      className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                    />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendIcon className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Bookings and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Bookings
            </h3>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {booking.guest}
                      </h4>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.amount}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.room}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.checkIn} - {booking.checkOut}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Housekeeping Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Housekeeping Tasks
            </h3>
            <div className="space-y-4">
              {housekeepingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {task.room}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.type} - {task.assignedTo}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {getStatusIcon(task.status)}
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 rounded-lg hover:bg-gold-100 dark:hover:bg-gold-900/30 transition-colors">
              <Users className="w-5 h-5" />
              <span>Add Staff</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <Hotel className="w-5 h-5" />
              <span>Add Room</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <Calendar className="w-5 h-5" />
              <span>New Booking</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <Star className="w-5 h-5" />
              <span>View Reviews</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
