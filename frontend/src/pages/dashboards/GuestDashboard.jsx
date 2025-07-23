import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import api from "../../utils/api";
import { API_ENDPOINTS } from "../../utils/constants";

const GuestDashboard = () => {
  const isDarkMode = document.documentElement.classList.contains("dark");
  const [cardError, setCardError] = useState(null);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [booking, setBooking] = useState([]);

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { error, success } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ENDPOINTS.GUEST_BOOKINGS);
      setBooking(res.data);
    } catch (err) {
      error("Failed to fetch billings");
    } finally {
      setLoading(false);
    }
  };

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/payment/create-payment-intent",
        {
          amount: recentBooking.billingId.amount * 100, // Stripe needs cents
        }
      );

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post("http://localhost:4000/api/v1/payment/confirm", {
          bookingId: recentBooking._id,
          amount: recentBooking.billingId.amount,
        });

        success("Payment successful! 🎉");
        setShowStripeForm(false);
        // Optionally refresh booking data here
      }
    } catch (err) {
      error(err.response.data.message || err.message);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const reviews = [
    {
      id: 1,
      room: "Deluxe Ocean View",
      rating: 5,
      comment:
        "Absolutely wonderful stay! The view was breathtaking and the service was impeccable.",
      date: "2024-01-19",
      helpful: 12,
    },
    {
      id: 2,
      room: "Executive Suite",
      rating: 4,
      comment:
        "Great room with excellent amenities. The staff was very helpful throughout our stay.",
      date: "2023-12-24",
      helpful: 8,
    },
  ];

  const quickStats = [
    {
      title: "Total Bookings",
      value: booking?.totalBookings,
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Total Spent",
      value: `$ ${booking?.totalAmountSpent}`,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Reviews Given",
      value: "2",
      icon: Star,
      color: "yellow",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const recentBooking = booking?.bookings
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  return (
    <DashboardLayout title="Guest Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back! </h2>
              <p className="text-gold-100">
                Thank you for choosing LuxuryStay HMS. Manage your bookings and
                explore our services.
              </p>
            </div>
            <div className="hidden md:block">
              <Link
                to="/rooms"
                className="bg-white text-gold-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Browse Rooms
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
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

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-gold-500 text-gold-600 dark:text-gold-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-gold-500 text-gold-600 dark:text-gold-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-gold-500 text-gold-600 dark:text-gold-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                My Reviews
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-gold-500 text-gold-600 dark:text-gold-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Current Booking */}
                {/* Current Booking */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Current Booking
                  </h3>

                  {recentBooking ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {recentBooking.roomId?.title || "Room Title"}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {recentBooking.checkInDate?.split("T")[0]} -{" "}
                            {recentBooking.checkOutDate?.split("T")[0]}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${recentBooking.billingId?.amount || 0}
                          </p>

                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              recentBooking.billingId?.status === "paid"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }`}
                          >
                            {recentBooking.billingId?.status === "paid" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                            {recentBooking.billingId?.status}
                          </span>

                          {recentBooking.billingId?.status === "pending" && (
                            <button
                              onClick={() => setShowStripeForm(true)}
                              className="mt-3 w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 rounded-md transition"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No bookings found</p>
                      <Link
                        to="/rooms"
                        className="mt-2 text-gold-600 hover:text-gold-500 font-medium"
                      >
                        Browse available rooms
                      </Link>
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Review submitted for Deluxe Ocean View
                      </span>
                      <span className="text-gray-400">2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Booking confirmed for Standard Garden View
                      </span>
                      <span className="text-gray-400">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-6">
                {booking?.bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {/* <img
                          src={booking.image}
                          alt={booking.room}
                          className="w-20 h-20 rounded-lg object-cover"
                        /> */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {booking.roomId.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.checkInDate.slice(0, 10)} -{" "}
                            {booking.checkOutDate.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                          ${booking.billingId.amount}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.billingId.status
                          )}`}
                        >
                          {getStatusIcon(booking.billingId.status)}
                          {booking.billingId.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>Ocean View</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Check-in: 3:00 PM</span>
                        </div>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gold-600 hover:text-gold-500">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-500">
                          <Download className="w-4 h-4" />
                          <span>Invoice</span>
                        </button>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {review.room}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {review.comment}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.helpful} people found this helpful
                      </span>
                      <button className="text-sm text-gold-600 hover:text-gold-500">
                        Edit Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={user?.phone || "Not Found!"}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showStripeForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
                Complete Payment
              </h2>

              <form onSubmit={handleStripeSubmit} className="space-y-4">
                <CardElement
                  onChange={(e) => {
                    if (e.error) {
                      setCardError(e.error.message);
                    } else {
                      setCardError(null);
                    }
                  }}
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: isDarkMode ? "#f9fafb" : "#1f2937",
                        "::placeholder": {
                          color: isDarkMode ? "#9ca3af" : "#6b7280",
                        },
                      },
                      invalid: {
                        color: "#ef4444",
                      },
                    },
                  }}
                />

                {cardError && (
                  <p className="text-red-500 text-sm">{cardError}</p>
                )}
                {error && !cardError && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!stripe || processing}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-5 py-2 rounded-md transition"
                >
                  {processing ? "Processing..." : "Pay Now"}
                </button>
              </form>

              <button
                onClick={() => setShowStripeForm(false)}
                className="mt-4 w-full bg-gray-200 dark:bg-red-500 hover:bg-gray-300 dark:hover:bg-red-600 text-gray-800 dark:text-white text-sm px-5 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GuestDashboard;
