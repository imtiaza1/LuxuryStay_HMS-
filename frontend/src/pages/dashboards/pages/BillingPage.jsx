// BillingsPage.jsx
import { AlertCircle, CheckCircle, Clock, Info } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useToast } from "../../../contexts/ToastContext";
import api from "../../../utils/api";
import { API_ENDPOINTS } from "../../../utils/constants";

const getBillingStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getBillingStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "failed":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const BillingsPage = () => {
  const [billings, setBillings] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [loading, setLoading] = useState(false);
  const { error } = useToast();

  const fetchBillings = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ENDPOINTS.BILLINGS);
      setBillings(res.data.billings);
    } catch (err) {
      error("Failed to fetch billings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillings();
  }, []);

  const filteredBillings =
    filteredStatus === "all"
      ? billings
      : billings.filter((b) => b.status === filteredStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Billings
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4">
        {["all", "pending", "confirmed", "failed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilteredStatus(status)}
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              filteredStatus === status
                ? "bg-gold-500 text-white border-gold-500"
                : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg">
            <thead className="bg-gold-100 dark:bg-gold-900/20 text-left text-gray-900 dark:text-white">
              <tr>
                <th className="px-4 py-2">Booking</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Create At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {filteredBillings.map((billing) => (
                <tr key={billing._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{billing.booking?._id}</td>
                  <td className="px-4 py-2">${billing.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBillingStatusColor(
                        billing.status
                      )}`}
                    >
                      {getBillingStatusIcon(billing.status)}
                      <span className="ml-1 capitalize">{billing.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2">{billing.paymentMethod}</td>
                  <td className="px-4 py-2">
                    {billing.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                      onClick={() => setSelectedBilling(billing)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBillings.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center px-4 py-4 text-gray-500 dark:text-gray-400"
                  >
                    No billings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedBilling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Billing Details
            </h3>
            <p className="text-sm dark:text-gray-300">
              <strong>Booking ID:</strong> {selectedBilling.booking?._id}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Amount:</strong> ${selectedBilling.amount}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Status:</strong> {selectedBilling.status}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Payment Method:</strong> {selectedBilling.paymentMethod}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Created ATt:</strong>{" "}
              {selectedBilling.createdAt?.slice(0, 10) || "-"}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Updated At:</strong> {selectedBilling.updatedAt || "-"}
            </p>
            <button
              onClick={() => setSelectedBilling(null)}
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

export default BillingsPage;
