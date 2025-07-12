import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useToast } from "../../../contexts/ToastContext";
import api from "../../../utils/api";
import { API_ENDPOINTS } from "../../../utils/constants";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.GET_ALL_STAFF);
      setStaff(response.data.users);
    } catch (err) {
      error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { role } = form;
    try {
      setLoading(true);
      if (editingId) {
        await api.put(`${API_ENDPOINTS.UPDATE_STAFF}/${editingId}`, form);
        success("Staff updated successfully");
      } else {
        if (role === "receptionist") {
          await api.post(API_ENDPOINTS.RECEPTIONIST_REGISTER, form);
        } else if (role === "manager") {
          await api.post(API_ENDPOINTS.MANAGER_REGISTER, form);
        } else {
          await api.post(API_ENDPOINTS.HOUSEKEEPING_REGISTER, form);
        }
        success("Staff added successfully");
      }
      setForm({ name: "", email: "", password: "", contact: "", role: "" });
      setEditingId(null);
      fetchStaff();
    } catch (err) {
      error(err.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff) => {
    setForm({
      name: staff.name,
      email: staff.email,
      password: "",
      contact: staff.contact || "",
      role: staff.role,
    });
    setEditingId(staff._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.DELETE_STAFF}/${id}`);
      success("user delete successfully");
      fetchStaff();
    } catch (err) {
      error("Failed to delete staff");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Staff Management
        </h2>
        <button className="flex items-center space-x-1 text-gold-600 dark:text-gold-400">
          <PlusCircle className="w-5 h-5" />
          <span>{editingId ? "Edit Staff" : "Add Staff"}</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required={!editingId}
        />
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="receptionist">Receptionist</option>
          <option value="manager">Manager</option>
          <option value="housekeeping">Housekeeping</option>
        </select>

        <button
          type="submit"
          className="col-span-1 md:col-span-3 p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
        >
          {editingId ? "Update Staff" : "Add Staff"}
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg">
            <thead className="bg-gold-100 dark:bg-gold-900/20 text-left text-gray-900 dark:text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {staff.map((person) => (
                <tr key={person.id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{person.name}</td>
                  <td className="px-4 py-2">{person.email}</td>
                  <td className="px-4 py-2">{person.contact}</td>
                  <td className="px-4 py-2">{person.role}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(person)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(person._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No staff found.
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

export default StaffPage;
