import { Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";

const Rooms = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [rooms, setRoom] = useState([]);
  const fetchRooms = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_ALL_AVAILABLE_ROOMS);
      const result = response.data.rooms;
      setRoom(result);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    return room.type === filter;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover your perfect accommodation
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === "all"
                  ? "bg-gold-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              All Rooms
            </button>
            <button
              onClick={() => setFilter("standard")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === "standard"
                  ? "bg-gold-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setFilter("deluxe")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === "deluxe"
                  ? "bg-gold-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Deluxe
            </button>
            <button
              onClick={() => setFilter("suite")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === "suite"
                  ? "bg-gold-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Suite
            </button>
            <button
              onClick={() => setFilter("presidential")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === "presidential"
                  ? "bg-gold-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Presidential
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                {room.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${api.defaults.baseURL}uploads/rooms/${img[0]}`} // 👈 this uses the axios baseURL
                    alt={`Room ${idx}`}
                    className="object-cover h-28 w-full"
                  />
                ))}
                <div className="absolute top-4 left-4">
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {room.type}
                  </span>
                </div>
                {room.originalPrice > room.price && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Save ${room.originalPrice - room.price}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {room.title}
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {room.rating} ({room.reviews} reviews)
                    </span>
                  </div>
                  <div className="ml-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    {room.maxGuests} guests
                  </div>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{room.size}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {room.features.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md text-xs">
                      +{room.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {room.originalPrice > room.price && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through mr-2">
                        ${room.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${room.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      /night
                    </span>
                  </div>
                  <Link
                    to={`/room/${room.id}`}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No rooms found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
