import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  Car,
  Coffee,
  Star,
  Tv,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";

const ICONS = { Wifi, Car, Utensils, Tv, Coffee, Bath };

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();

  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [additionalServices, setAdditionalServices] = useState([]);

  const availableServices = ["Room Service", "Laundry", "Wake-up Call"];
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const { data } = await api.get(
          `${API_ENDPOINTS.GET_SINGLE_ROOM}/${id}`
        );
        setRoom(data.room);
      } catch {
        error("Failed to load room details");
        navigate("/rooms");
      } finally {
        setLoadingRoom(false);
      }
    }

    async function fetchReviews() {
      try {
        const { data } = await api.get(
          `${API_ENDPOINTS.GET_REVIEWS_BY_ROOM}/${id}`
        );
        setReviews(data.reviews);
      } catch {
        error("Failed to load reviews");
      } finally {
        setLoadingReviews(false);
      }
    }

    fetchRoom();
    fetchReviews();
  }, [id, error, navigate]);

  const handleBooking = async () => {
    if (!user) return error("Login required"), navigate("/login");
    if (!checkIn || !checkOut)
      return error("Select check-in and check-out dates");

    const ci = new Date(checkIn),
      co = new Date(checkOut);
    const nights = Math.ceil((co - ci) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return error("Check-out must be after check-in");

    try {
      setBookingLoading(true);
      await api.post(API_ENDPOINTS.CREATE_BOOKING, {
        roomId: room._id,
        guestId: user.id,
        checkInDate: ci,
        checkOutDate: co,
        totalPrice: nights * room.price,
        additionalServices,
      });
      success(
        `Booked ${nights} night(s) successfully. Please confirm to complete the booking.`
      );
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loadingRoom) return <LoadingSpinner size={48} center />;
  if (!room) return <p className="text-center">Room not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 lg:px-8">
      <button
        onClick={() => navigate("/rooms")}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Rooms
      </button>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Gallery */}
        <div className="lg:col-span-2 mb-6 lg:mb-0">
          <img
            src={`${api.defaults.baseURL}uploads/rooms/${room.images[currentImage]}`}
            alt=""
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {room.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={
                  i === currentImage
                    ? "ring-2 ring-gold-500 rounded-lg"
                    : "rounded-lg"
                }
              >
                <img
                  src={`${api.defaults.baseURL}uploads/rooms/${img}`}
                  alt=""
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Booking */}
        <div className="sticky top-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              {room.originalPrice > room.price && (
                <span className="line-through text-gray-500 mr-2">
                  ${room.originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold">${room.price}</span>
              <span className="ml-1 text-gray-500">/night</span>
            </div>
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 fill-gold-400" />
              <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                {room.rating} ({reviews.length})
              </span>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {/* Dates */}
              {["checkIn", "checkOut"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-sm">
                    {field === "checkIn" ? "Check-in" : "Check-out"}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={field === "checkIn" ? checkIn : checkOut}
                      onChange={(e) =>
                        field === "checkIn"
                          ? setCheckIn(e.target.value)
                          : setCheckOut(e.target.value)
                      }
                      className="pl-10 pr-4 py-3 w-full rounded-lg border dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              ))}

              {/* Guests */}
              <div>
                <label className="block mb-1 text-sm">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 text-gray-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full rounded-lg border dark:bg-gray-800 dark:text-white"
                  >
                    {Array.from({ length: 2 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} Guest{i > 0 && "s"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Services */}
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Additional Services Optional
                </label>
                <div className="space-y-2">
                  {availableServices.map((service, idx) => (
                    <label
                      key={idx}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        value={service}
                        checked={additionalServices.includes(service)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setAdditionalServices([
                              ...additionalServices,
                              service,
                            ]);
                          } else {
                            setAdditionalServices(
                              additionalServices.filter((s) => s !== service)
                            );
                          }
                        }}
                        className="form-checkbox h-4 w-4 text-gold-600 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-gold-600"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div> */}
              {/* Additional Services Dropdown with Checkboxes */}
              <div className="relative" ref={dropdownRef}>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Additional Services (Optional)
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full py-2 px-4 border rounded-lg bg-white dark:bg-gray-800 text-left dark:text-white"
                >
                  {additionalServices.length > 0
                    ? additionalServices.join(", ")
                    : "Select services"}
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-md max-h-60 overflow-auto">
                    {availableServices.map((service, idx) => (
                      <label
                        key={idx}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={service}
                          checked={additionalServices.includes(service)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              setAdditionalServices([
                                ...additionalServices,
                                service,
                              ]);
                            } else {
                              setAdditionalServices(
                                additionalServices.filter((s) => s !== service)
                              );
                            }
                          }}
                          className="form-checkbox h-4 w-4 text-gold-600 border-gray-300 dark:border-gray-600 dark:bg-gray-800 mr-3"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full py-3 font-semibold text-white rounded-lg bg-gold-600 hover:bg-gold-700"
            >
              {bookingLoading ? <LoadingSpinner size="sm" /> : "Book Now"}
            </button>

            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              Free cancellation up to 24h before check-in
            </p>
          </div>
        </div>
      </div>
      {/* Details */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section (2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{room.title}</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Users className="w-5 h-5 text-gray-500" />
              <span>Guests up to 2</span>

              <Tv className="w-5 h-5 text-gray-500" />
              <span>Room size: 45 cm</span>

              <Bed className="w-5 h-5 text-gray-500" />
              <span>King Size Bed</span>
            </div>

            <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
              Experience a comfortable stay in this modern and spacious room.
              Equipped with all the basic amenities including WiFi, air
              conditioning, and a king-sized bed. Ideal for up to two guests.
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.features[0]?.split(",").map((f, i) => {
                const Icon = ICONS[f.trim()] || Wifi;
                return (
                  <div key={i} className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gold-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {f.trim()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Guest Reviews</h3>
            {loadingReviews ? (
              <LoadingSpinner size={24} center />
            ) : reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((rv) => (
                  <div key={rv._id} className="border-b pb-6 last:border-none">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{rv.author}</span>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rv.rating
                                  ? "fill-gold-400 text-gold-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {rv.date.slice(0, 10)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {rv.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section (Additional Info) */}
        <div className="space-y-8">
          {/* Additional Information */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Additional Information</h3>
            <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">
                  Check-in / Check-out
                </p>
                <p>Check-in: 3:00 PM</p>
                <p>Check-out: 11:00 AM</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">
                  Cancellation Policy
                </p>
                <p>
                  Free cancellation up to 24 hours before check-in. After that,
                  the first night will be charged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Hotel Policies</h3>
        <p className="text-sm text-gray-600">
          • No smoking
          <br />
          • No pets allowed
          <br />• Quiet hours: 10PM–6AM
        </p>
      </div>
    </div>
  );
};

export default RoomDetail;
