import {
  AlertCircle,
  CheckCircle,
  CheckSquare,
  Clock,
  MapPin,
  Search,
  ShieldAlert,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../utils/api";
import { API_ENDPOINTS } from "../../../../../utils/constants";

export const Main = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState({});
  const [myTasks, setMyTasks] = useState([]);
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState("tasks");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.MY_TASKS);
      setMyTasks(response.data.tasks);
    } catch (err) {
      error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };
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

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`${API_ENDPOINTS.UPDATE_STATUS}/${taskId}`, {
        status: newStatus,
      });
      setMyTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      success("Task status updated");
      fetchTasks();
      fetchRooms();
    } catch (err) {
      error("Failed to update task status");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchRooms();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
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

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
    setSelectedTaskStatus((prev) => ({ ...prev, [taskId]: newStatus }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tasks"
                ? "border-gold-500 text-gold-600 dark:text-gold-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            My Tasks ({myTasks.length})
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
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Today's Tasks
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {myTasks.filter((task) => task.status === "completed").length}{" "}
                of {myTasks.length} completed
              </div>
            </div>

            {myTasks.length > 0 ? (
              myTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                >
                  {/* Top Section: Priority, Status, and Action */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority} priority
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex flex-col items-start text-sm text-gray-600 dark:text-gray-300">
                      <span className="mb-1 font-semibold">Action</span>
                      <select
                        className="bg-white dark:bg-gray-600 text-sm text-gray-700 dark:text-white border border-gray-300 dark:border-gray-500 rounded px-3 py-1 focus:outline-none"
                        value={selectedTaskStatus[task._id] || ""}
                        onChange={(e) =>
                          handleStatusChange(task._id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Change Status
                        </option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Due Date: {task.dueDate?.slice(0, 10) || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          task.type
                        )}`}
                      >
                        {getTypeIcon(task.type)}
                        {task.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Room No: {task.title}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                No tasks found.
              </div>
            )}
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
  );
};
