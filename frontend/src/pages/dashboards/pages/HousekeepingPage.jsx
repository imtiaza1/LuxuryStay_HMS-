import {
  AlarmClock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Filter,
  Moon,
  RefreshCcw,
  Sun,
  UserRound,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

const HousekeepingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("room");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    const timeout = setTimeout(() => {
      setRooms([
        {
          id: 101,
          type: "Deluxe",
          status: "Needs Cleaning",
          lastCleaned: "2025-07-14",
          staff: "John Doe",
          maintenanceNote: "",
        },
        {
          id: 102,
          type: "Standard",
          status: "In Progress",
          lastCleaned: "2025-07-16",
          staff: "Anna Smith",
          maintenanceNote: "Light not working",
        },
        {
          id: 103,
          type: "Suite",
          status: "Cleaned",
          lastCleaned: "2025-07-17",
          staff: "Michael Brown",
          maintenanceNote: "",
        },
        {
          id: 104,
          type: "Standard",
          status: "Pending",
          lastCleaned: "2025-07-13",
          staff: "",
          maintenanceNote: "",
        },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Cleaned":
        return <CheckCircle className="text-green-500" size={18} />;
      case "In Progress":
        return (
          <RefreshCcw className="text-yellow-500 animate-spin" size={18} />
        );
      case "Pending":
        return <ClipboardList className="text-gray-500" size={18} />;
      case "Needs Cleaning":
        return <AlertCircle className="text-red-500" size={18} />;
      default:
        return <ClipboardList className="text-gray-400" size={18} />;
    }
  };

  const filteredRooms = rooms
    .filter((room) => {
      if (filter === "All") return true;
      return room.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === "room") return a.id - b.id;
      if (sortBy === "status") return a.status.localeCompare(b.status);
      if (sortBy === "staff") return a.staff.localeCompare(b.staff);
      return 0;
    });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gold-600 dark:text-gold-400">
          🧹 Housekeeping Dashboard
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gold-100 dark:bg-gold-800 rounded-full shadow hover:scale-105 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <Filter size={16} />
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded bg-gold-100 dark:bg-gold-900/20"
            value={filter}
          >
            <option value="All">All</option>
            <option value="Cleaned">Cleaned</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Needs Cleaning">Needs Cleaning</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ChevronDown size={16} />
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded bg-gold-100 dark:bg-gold-900/20"
            value={sortBy}
          >
            <option value="room">Room #</option>
            <option value="status">Status</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gold-500">Loading rooms...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg text-sm">
            <thead className="bg-gold-100 dark:bg-gold-900/20 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Room</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Cleaned</th>
                <th className="px-4 py-3 text-left">Assigned Staff</th>
                <th className="px-4 py-3 text-left">Maintenance</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gold-50 dark:hover:bg-gold-900/10 transition"
                >
                  <td className="px-4 py-3 font-semibold">#{room.id}</td>
                  <td className="px-4 py-3">{room.type}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {getStatusIcon(room.status)}
                    <span>{room.status}</span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <AlarmClock size={16} />
                    {room.lastCleaned}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <UserRound size={16} />
                    {room.staff || "Unassigned"}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2 text-sm text-red-400">
                    {room.maintenanceNote ? (
                      <>
                        <Wrench size={16} /> {room.maintenanceNote}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="bg-gold-500 hover:bg-gold-600 text-white px-3 py-1 rounded text-xs shadow">
                      Mark Cleaned
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs shadow">
                      Assign
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow">
                      Report
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

export default HousekeepingPage;
