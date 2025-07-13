import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Info,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useToast } from "../../../contexts/ToastContext";
import api from "../../../utils/api";
import { API_ENDPOINTS } from "../../../utils/constants";

const getStatusColor = (status) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "occupied":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "cleaning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "maintenance":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "available":
      return <CheckCircle className="w-4 h-4" />;
    case "occupied":
      return <Clock className="w-4 h-4" />;
    case "cleaning":
    case "maintenance":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    price: "",
    status: "",
    features: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { success, error } = useToast();

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ENDPOINTS.GET_ALL_ROOMS);
      setRooms(res.data.rooms);
    } catch (err) {
      error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("roomNumber", form.roomNumber);
      formData.append("type", form.type);
      formData.append("price", form.price);
      formData.append("status", form.status);
      formData.append("features", form.features);
      form.images.forEach((img) => formData.append("images", img));

      if (editingId) {
        await api.put(`${API_ENDPOINTS.UPDATE_ROOM}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        success("Room updated successfully");
      } else {
        await api.post(API_ENDPOINTS.CREATE_ROOM, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        success("Room created successfully");
      }

      setForm({
        roomNumber: "",
        type: "",
        price: "",
        status: "",
        features: "",
        images: [],
      });
      setEditingId(null);
      setFormVisible(false);
      fetchRooms();
    } catch (err) {
      error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (room) => {
    setForm({
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      status: room.status,
      features: room.features,
      images: [], // Clear images on edit
    });
    setEditingId(room._id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.DELETE_ROOM}/${id}`);
      success("Room deleted successfully");
      fetchRooms();
    } catch (err) {
      error("Failed to delete room");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      error("You can upload a maximum of 5 images");
      return;
    }
    setForm({ ...form, images: files });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Room Management
        </h2>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="flex items-center space-x-2 text-gold-600 dark:text-gold-400"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{formVisible ? "Hide Form" : "Add Room"}</span>
        </button>
      </div>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <input
            type="text"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-3 p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
          >
            {editingId ? "Update Room" : "Add Room"}
          </button>
        </form>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg">
            <thead className="bg-gold-100 dark:bg-gold-900/20 text-left text-gray-900 dark:text-white">
              <tr>
                <th className="px-4 py-2">Room Number</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {rooms.map((room) => (
                <tr key={room._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{room.roomNumber}</td>
                  <td className="px-4 py-2">{room.type}</td>
                  <td className="px-4 py-2">${room.price}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        room.status
                      )}`}
                    >
                      {getStatusIcon(room.status)}
                      <span className="ml-1 capitalize">{room.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(room)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Room Details
            </h3>
            <p className="text-sm dark:text-gray-300">
              <strong>Room Number:</strong> {selectedRoom.roomNumber}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Type:</strong> {selectedRoom.type}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Price:</strong> ${selectedRoom.price}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Status:</strong> {selectedRoom.status}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Features:</strong> {selectedRoom.features}
            </p>
            {selectedRoom.images?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold dark:text-white mb-2">
                  Images:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedRoom.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${api.defaults.baseURL}uploads/rooms/${img}`} // 👈 this uses the axios baseURL
                      alt={`Room ${idx}`}
                      className="rounded-lg object-cover h-28 w-full"
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setSelectedRoom(null)}
              className="mt-4 bg-gold-500 text-white px-4 py-2 rounded hover:bg-gold-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPage;
