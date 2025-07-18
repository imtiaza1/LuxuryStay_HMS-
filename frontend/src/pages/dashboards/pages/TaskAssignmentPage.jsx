import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { API_ENDPOINTS } from "../../../utils/constants";
const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    priority: "",
  });

  const fetchTasks = async () => {
    const res = await api.get(API_ENDPOINTS.GET_ALL_TASK);
    setTasks(res.data.tasks);
  };

  const fetchStaff = async () => {
    const res = await api.get(API_ENDPOINTS.GET_ALL_HOUSEKEEPING);
    setStaff(res.data);
  };

  const updateTaskStatus = async (taskId, status) => {
    await axios.patch(`/api/tasks/${taskId}`, { status });
    fetchTasks();

    // Room status update
    const task = tasks.find((t) => t._id === taskId);
    if (status === "completed") {
      let roomStatus;
      if (task.type === "cleaning") roomStatus = "available";
      if (task.type === "maintenance") roomStatus = "maintenance";
      if (roomStatus) {
        await axios.patch(`/api/rooms/${task.room}`, { status: roomStatus });
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStaff();
  }, [filters]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Housekeeping & Maintenance Tasks
      </h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
          <option value="inspection">Inspection</option>
        </select>
      </div>

      {/* Task Table */}
      <table className="min-w-full bg-white dark:bg-gray-800 rounded">
        <thead>
          <tr className="text-left">
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.type}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.assignedTo?.name || "Unassigned"}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPage;
