import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
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

  const [filters, setFilters] = useState({ status: "", type: "" });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedToEmail: "",
    dueDate: "",
    priority: "low",
    type: "cleaning",
  });

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
      await axios.patch(`/api/tasks/${taskId}`, { status });
      success("Task updated");
      fetchTasks();
    } catch {
      error("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      success("Task deleted");
      fetchTasks();
    } catch {
      error("Failed to delete task");
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing && currentTask) {
        await api.put(`/api/tasks/${currentTask._id}`, formData);
        success("Task updated");
      } else {
        await api.post(`/api/tasks`, formData);
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
  }, [filters]);

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
                <th className="p-2">Title</th>
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
                    <td className="p-2 capitalize">{task.type}</td>
                    <td className="p-2 capitalize">{task.status}</td>
                    <td className="p-2 capitalize">{task.priority}</td>
                    <td className="p-2">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {task.assignedTo?.name || "Unassigned"}
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <select
                        className="p-1 rounded border dark:bg-gray-800"
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(task._id, e.target.value)
                        }
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
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
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
