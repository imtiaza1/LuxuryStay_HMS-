import {
  ChevronDown,
  ClipboardCheck,
  Filter,
  Moon,
  Plus,
  Sun,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";

const TaskAssignmentPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    room: "",
    staff: "",
    time: "",
    priority: "Medium",
    note: "",
  });

  const [filters, setFilters] = useState({
    staff: "All",
    priority: "All",
    status: "All",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    // Simulate API data
    setRooms([
      { id: 101, status: "Needs Cleaning" },
      { id: 102, status: "Needs Cleaning" },
      { id: 104, status: "Needs Cleaning" },
    ]);

    setStaffList(["John Doe", "Anna Smith", "Michael Brown"]);
  }, [darkMode]);

  const handleAssign = () => {
    if (!form.room || !form.staff) return;

    const newTask = {
      id: Date.now(),
      ...form,
      status: "Assigned",
    };
    setTasks((prev) => [...prev, newTask]);
    setForm({ room: "", staff: "", time: "", priority: "Medium", note: "" });
  };

  const markCompleted = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Completed" } : t))
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const filteredTasks = tasks.filter((t) => {
    return (
      (filters.staff === "All" || t.staff === filters.staff) &&
      (filters.priority === "All" || t.priority === filters.priority) &&
      (filters.status === "All" || t.status === filters.status)
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gold-600 dark:text-gold-400">
          📝 Task Assignment
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gold-100 dark:bg-gold-800"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Task Form */}
      <div className="bg-gold-50 dark:bg-gold-900/10 p-4 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-3">Assign New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <select
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
            className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room #{room.id}
              </option>
            ))}
          </select>

          <select
            value={form.staff}
            onChange={(e) => setForm({ ...form, staff: e.target.value })}
            className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
          >
            <option value="">Assign Staff</option>
            {staffList.map((staff) => (
              <option key={staff}>{staff}</option>
            ))}
          </select>

          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
          />

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <textarea
            placeholder="Special instructions"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-700 col-span-full"
          ></textarea>
        </div>

        <button
          onClick={handleAssign}
          className="mt-4 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded shadow flex items-center gap-2"
        >
          <Plus size={18} />
          Assign Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter size={16} />
          <select
            value={filters.staff}
            onChange={(e) => setFilters({ ...filters, staff: e.target.value })}
            className="p-2 rounded bg-gold-100 dark:bg-gold-900/20"
          >
            <option value="All">All Staff</option>
            {staffList.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ChevronDown size={16} />
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
            className="p-2 rounded bg-gold-100 dark:bg-gold-900/20"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ClipboardCheck size={16} />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-2 rounded bg-gold-100 dark:bg-gold-900/20"
          >
            <option value="All">All Statuses</option>
            <option value="Assigned">Assigned</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg text-sm">
            <thead className="bg-gold-100 dark:bg-gold-900/20 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Staff</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Note</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gold-50 dark:hover:bg-gold-900/10 transition"
                >
                  <td className="px-4 py-2">#{task.room}</td>
                  <td className="px-4 py-2">{task.staff}</td>
                  <td className="px-4 py-2">{task.time || "—"}</td>
                  <td className="px-4 py-2">{task.priority}</td>
                  <td className="px-4 py-2">{task.note || "—"}</td>
                  <td className="px-4 py-2">{task.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => markCompleted(task.id)}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Mark Done
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      <Trash size={14} className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskAssignmentPage;
