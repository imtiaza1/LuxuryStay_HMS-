import {
  AlertCircle,
  CheckCircle,
  CheckSquare,
  Clock,
  Key,
  Mail,
  Search,
  ShieldAlert,
  Sparkles,
  User,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/constants";

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState("checkin");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { activeGuests, availableRooms, CheckedINNOut } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.GET_ALL_TASK);
      setRooms(response.data.tasks);
    } catch (err) {
      error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  const todayStats = [
    {
      title: "Check-ins ",
      value: CheckedINNOut?.counts?.checkedIn,
      icon: UserCheck,
      color: "green",
    },
    {
      title: "Check-outs ",
      value: CheckedINNOut?.counts?.checkedOut,
      icon: Clock,
      color: "blue",
    },
    {
      title: "Active Guests",
      value: activeGuests,
      icon: Users,
      color: "purple",
    },
    {
      title: "Available Rooms",
      value: availableRooms,
      icon: Key,
      color: "orange",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "checked-out":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "checked-in":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "clean":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "in-progress":
      case "progress": // just in case you use "progress" instead of "in_progress"
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";

      case "cleaning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "assigned":
      case "dirty":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "maintenance":
      case "inspection":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "checked-out":
        return <CheckCircle className="w-4 h-4" />;
      case "checked-in":
        return <UserCheck className="w-4 h-4" />;
      case "clean":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
      case "cleaning":
        return <Clock className="w-4 h-4" />;
      case "pending":
      case "assigned":
      case "dirty":
        return <AlertCircle className="w-4 h-4" />;
      case "maintenance":
      case "inspection":
        return <CheckSquare className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100";
      case "cleaning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-blue-100";
      case "inspection":
        return "bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100";
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "maintenance":
        return <Wrench className="w-3.5 h-3.5" />;
      case "cleaning":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "security":
        return <ShieldAlert className="w-3.5 h-3.5" />;
      case "inspection":
        return <Search className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}
                >
                  <Icon
                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("checkin")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "checkin"
                  ? "border-gold-500 text-gold-600 dark:text-gold-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Check-in ({CheckedINNOut?.checkedInGuests?.length})
            </button>
            <button
              onClick={() => setActiveTab("checkout")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "checkout"
                  ? "border-gold-500 text-gold-600 dark:text-gold-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Check-out ({CheckedINNOut?.checkedOutGuests?.length})
            </button>

            <button
              onClick={() => setActiveTab("rooms")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "rooms"
                  ? "border-gold-500 text-gold-600 dark:text-gold-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Room Status
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "checkin" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Check-ins
                </h3>
              </div>
              {CheckedINNOut?.checkedInGuests?.map((guest) => (
                <div
                  key={guest._id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {guest.guest.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {guest.room.title} • {guest.billing.amount}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          guest.status
                        )}`}
                      >
                        {getStatusIcon(guest.status)}
                        {guest.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {guest.guest.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "checkout" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Check-outs
                </h3>
              </div>
              {CheckedINNOut?.checkedOutGuests?.map((guest) => (
                <div
                  key={guest._id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {guest.guest.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {guest.room.title} • {`${guest.billing.amount}\u0024`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          guest.status
                        )}`}
                      >
                        {getStatusIcon(guest.status)}
                        {guest.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {guest.guest.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "rooms" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Room Status Overview
                </h3>
                <div className="flex space-x-2 text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Clean
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Cleaning
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Dirty/Assigned
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Maintenance/Inspection
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Room {room.title}
                        </h4>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            room.status
                          )}`}
                        >
                          {getStatusIcon(room.status)}
                          {room.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {room.description || "No description provided."}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            room.type
                          )}`}
                        >
                          {getTypeIcon(room.type)}
                          {room.type}
                        </span>
                      </p>

                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>
                            Due Date: {room.dueDate?.slice(0, 10) || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>Next guest: Tomorrow</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                    No rooms found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
