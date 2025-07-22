import { AlertCircle, CheckCircle, CheckSquare, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/constants";
import { Main } from "../dashboards/pages/Housekeeping_pages/components/Main";

const HousekeepingDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_ENDPOINTS.GET_ALL_TASK);
      setTasks(data);
    } catch {
      error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const todayStats = [
    {
      title: "Tasks Assigned",
      value: tasks.totalTasks,
      icon: CheckSquare,
      color: "blue",
    },
    {
      title: "Tasks Completed",
      value: tasks.completedTasks,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "In Progress",
      value: tasks.progressTasks,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Pending",
      value: tasks.pendingTasks,
      icon: AlertCircle,
      color: "red",
    },
  ];

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
      <Main />
    </div>
  );
};

export default HousekeepingDashboard;
