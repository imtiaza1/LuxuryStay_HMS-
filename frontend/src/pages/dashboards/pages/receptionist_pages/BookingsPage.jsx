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
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useToast } from "../../../../contexts/ToastContext";
import api from "../../../../utils/api";
import { API_ENDPOINTS } from "../../../../utils/constants";

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "checked_in":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "checked_in":
      return <Clock className="w-4 h-4" />;
    case "pending":
    case "cancelled":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};
const getBookingStatusColor = (status) => {
  switch (status) {
    case "reserved":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "checked-in":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "checked-out":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getBookingStatusIcon = (status) => {
  switch (status) {
    case "reserved":
      return <Clock className="w-4 h-4" />;
    case "checked-in":
      return <CheckCircle className="w-4 h-4" />;
    case "checked-out":
      return <CheckCircle className="w-4 h-4" />;
    case "cancelled":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    guestId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    status: "",
    billingStatus: "",
    additionalServices: "",
    totalPrice: "",
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { error, success } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ENDPOINTS.BOOKINGS);
      setBookings(res.data.bookings);
    } catch (err) {
      error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await api.put(`${API_ENDPOINTS.UPDATE_BOOKING}/${editingId}`, form);
        success("Booking updated successfully");
      } else {
        await api.post(API_ENDPOINTS.CREATE_BOOKING, form);
        success("Booking created successfully");
      }
      setForm({
        guestId: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        status: "",
        additionalServices: "",
        totalPrice: "",
        billingStatus: "",
      });
      setEditingId(null);
      setFormVisible(false);
      fetchBookings();
    } catch (err) {
      error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Bookings
        </h2>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="flex items-center space-x-2 text-gold-600 dark:text-gold-400"
        >
          <PlusCircle className="w-5 h-5" />
          <span>
            {formVisible
              ? "Hide Form"
              : editingId
              ? "Edit Booking"
              : "Create Booking"}
          </span>
        </button>
      </div>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <input
            type="text"
            placeholder="Guest ID"
            value={form.guestId}
            onChange={(e) => setForm({ ...form, guestId: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <input
            type="text"
            placeholder="Room ID"
            value={form.roomId}
            onChange={(e) => setForm({ ...form, roomId: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <input
            type="date"
            value={form.checkInDate}
            onChange={(e) => setForm({ ...form, checkInDate: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <input
            type="date"
            value={form.checkOutDate}
            onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select Status</option>
            <option value="reserved">Reserved</option>
            <option value="checked-in">Checked-In</option>
            <option value="checked-out">Checked-Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={form.billingStatus}
            onChange={(e) =>
              setForm({ ...form, billingStatus: e.target.value })
            }
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Billing Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">confirmed</option>
            <option value="failed">Failed</option>
          </select>

          <input
            type="text"
            placeholder="Additional Services"
            value={form.additionalServices}
            onChange={(e) =>
              setForm({ ...form, additionalServices: e.target.value })
            }
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="number"
            placeholder="Total Price"
            value={form.totalPrice}
            onChange={(e) => setForm({ ...form, totalPrice: e.target.value })}
            className="p-2 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-3 p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600"
          >
            {editingId ? "Update Booking" : "Submit Booking"}
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
                <th className="px-4 py-2">Guest</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Check In</th>
                <th className="px-4 py-2">Check Out</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Billing Status</th>
                <th className="px-4 py-2">Booking Status</th> {/* ✅ NEW */}
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 dark:text-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{booking.guest.name}</td>
                  <td className="px-4 py-2">{booking.room.roomNumber}</td>
                  <td className="px-4 py-2">
                    {booking.checkInDate.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2">
                    {booking.checkOutDate.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2">${booking.billing.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.billing.status
                      )}`}
                    >
                      {getStatusIcon(booking.billing.status)}
                      <span className="ml-1 capitalize">
                        {booking.billing.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(
                        booking.status
                      )}`}
                    >
                      {getBookingStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </span>
                  </td>

                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center px-4 py-4 text-gray-500 dark:text-gray-400"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Booking Details
            </h3>
            <p className="text-sm dark:text-gray-300">
              <strong>Guest ID:</strong> {selectedBooking.guest._id}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Guest Name:</strong> {selectedBooking.guest.name}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Email:</strong> {selectedBooking.guest.email}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Room ID:</strong> {selectedBooking.room._id}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Room Number:</strong> {selectedBooking.room.roomNumber}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Room Type:</strong> {selectedBooking.room.type}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Check In:</strong>{" "}
              {selectedBooking.checkInDate.slice(0, 10)}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Check Out:</strong>{" "}
              {selectedBooking.checkOutDate.slice(0, 10)}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Status:</strong> {selectedBooking.billing.status}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Services:</strong> {selectedBooking.additionalServices}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Total:</strong> ${selectedBooking.billing.amount}
            </p>
            <button
              onClick={() => setSelectedBooking(null)}
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

export default BookingsPage;