import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Circle,
  ClipboardList,
  Clock,
  Pencil,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useToast } from "../../../contexts/ToastContext";
import api from "../../../utils/api";
import { API_ENDPOINTS } from "../../../utils/constants";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { success, error } = useToast();
  const [room, setRoom] = useState([]);

  const [filters, setFilters] = useState({ status: "", type: "" });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedToEmail: "",
    dueDate: "",
    priority: "low",
    type: "cleaning",
  });
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_ENDPOINTS.OTHERS_ROOMS);
      setRoom(data.rooms);
    } catch {
      error("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_ENDPOINTS.GET_ALL_TASK);
      let filteredTasks = data.tasks;
      if (filters.status)
        filteredTasks = filteredTasks.filter(
          (task) => task.status === filters.status
        );
      if (filters.type)
        filteredTasks = filteredTasks.filter(
          (task) => task.type === filters.type
        );
      setTasks(filteredTasks);
    } catch {
      error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.GET_ALL_HOUSEKEEPING);
      setStaff(data.users);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.put(`${API_ENDPOINTS.UPDATE_STATUS}/${taskId}`, { status });
      success("Task updated");
      fetchTasks();
    } catch (err) {
      error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.DELETE_TASKS}/${id}`);
      success("Task deleted");
      fetchTasks();
    } catch {
      error("Failed to delete task");
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing && currentTask) {
        await api.put(
          `${API_ENDPOINTS.UPDATE_TASKS}/${currentTask._id}`,
          formData
        );
        success("Task updated");
      } else {
        await api.post(API_ENDPOINTS.CREATE_TASK, formData);
        success("Task created");
      }
      setIsModalOpen(false);
      fetchTasks();
      resetForm();
    } catch {
      error("Operation failed");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assignedToEmail: "",
      dueDate: "",
      priority: "low",
      type: "cleaning",
    });
    setCurrentTask(null);
    setIsEditing(false);
  };

  const openEditModal = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      assignedToEmail: task.assignedTo?.email || "",
      dueDate: task.dueDate?.substring(0, 10),
      priority: task.priority,
      type: task.type,
    });
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTasks();
    fetchStaff();
    fetchRooms();
  }, [filters]);
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
      case "paid":
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
  const getTypeColor = (type) => {
    switch (type) {
      case "cleaning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "inspection":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "cleaning":
        return <ClipboardList className="w-3 h-3" />;
      case "maintenance":
        return <Wrench className="w-3 h-3" />;
      case "inspection":
        return <Briefcase className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-4 text-gray-800 dark:text-gold-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Housekeeping & Maintenance Tasks
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <select
          className="p-2 rounded border dark:bg-gray-800"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className="p-2 rounded border dark:bg-gray-800"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
          <option value="inspection">Inspection</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="p-2">Room No</th>
                <th className="p-2">Type</th>
                <th className="p-2">Status</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Assigned To</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-gray-500 dark:text-gold-300"
                  >
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id} className="border-b dark:border-gray-700">
                    <td className="p-2">{task.title}</td>

                    {/* TYPE */}
                    <td className="p-2">
                      <span
                        className={`capitalize text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${getTypeColor(
                          task.type
                        )}`}
                      >
                        {getTypeIcon(task.type)}
                        {task.type}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="p-2">
                      <span
                        className={`capitalize text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status.replace("_", " ")}
                      </span>
                    </td>

                    {/* PRIORITY */}
                    <td
                      className={`p-2 capitalize ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      }`}
                    >
                      {task.priority}
                    </td>

                    {/* DUE DATE */}
                    <td className="p-2">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>

                    {/* ASSIGNED TO */}
                    <td className="p-2">
                      {task.assignedTo?.name || "Unassigned"}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-2 flex items-center gap-2">
                      <select
                        className={`p-1 rounded border dark:bg-gray-800 ${getStatusColor(
                          task.status
                        )}`}
                        value={task.status}
                        onChange={(e) => {
                          updateTaskStatus(task._id, e.target.value);
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      <button
                        onClick={() => openEditModal(task)}
                        className="text-gold-500 hover:text-gold-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Task" : "Create Task"}
            </h3>
            <div className="space-y-2">
              <select
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              >
                <option value="" disabled>
                  SELECT AVAILABLE ROOM
                </option>
                {room.map((item, key) => (
                  <option key={key} value={item.roomNumber}>
                    {item.roomNumber}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Assigned Staff Email"
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.assignedToEmail}
                onChange={(e) =>
                  setFormData({ ...formData, assignedToEmail: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
              <select
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrUpdate}
                className="px-4 py-2 bg-gold-600 text-white rounded hover:bg-gold-700"
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
