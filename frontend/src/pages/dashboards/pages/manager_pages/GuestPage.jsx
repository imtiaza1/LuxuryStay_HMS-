import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useToast } from "../../../../contexts/ToastContext";
import api from "../../../../utils/api";
import { API_ENDPOINTS } from "../../../../utils/constants";

const GuestPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error, success } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ENDPOINTS.GET_ALL_GUEST);
      setUsers(res.data.users || []);
    } catch (err) {
      error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.DELETE_GUEST}/${id}`);
      success("guest deleted successfully");
      fetchUsers();
    } catch (err) {
      error(err.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        All Users
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <thead className="bg-gold-100 dark:bg-gold-900/20 text-left text-gray-900 dark:text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 capitalize">
                    {user.status || "active"}
                  </td>
                  <td className="px-4 py-2">
                    {user.createdAt?.slice(0, 10) || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center px-4 py-4 text-gray-500 dark:text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default GuestPage;
