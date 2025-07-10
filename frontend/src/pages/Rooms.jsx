import {
  Bath,
  Car,
  Coffee,
  Star,
  Tv,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Rooms = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [room, setRoom] = useState([]);
  const fetchRooms = async () => {
    try {
      const response = await api.get("/api/rooms");
      const result = response.data;
      setRoom(result);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  };

  const rooms = [
    {
      id: 1,
      title: "Deluxe Ocean View",
      type: "deluxe",
      price: 299,
      originalPrice: 349,
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["Ocean View", "King Bed", "WiFi", "Mini Bar"],
      maxGuests: 2,
      size: "45 sqm",
      features: [Wifi, Car, Utensils, Tv, Coffee, Bath],
    },
    {
      id: 2,
      title: "Presidential Suite",
      type: "presidential",
      price: 899,
      originalPrice: 999,
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: [
        "Panoramic Views",
        "Separate Living Area",
        "Premium WiFi",
        "Butler Service",
      ],
      maxGuests: 4,
      size: "120 sqm",
      features: [Wifi, Car, Utensils, Tv, Coffee, Bath],
    },
    {
      id: 3,
      title: "Standard Garden View",
      type: "standard",
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 201,
      image:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["Garden View", "Queen Bed", "WiFi", "Work Desk"],
      maxGuests: 2,
      size: "32 sqm",
      features: [Wifi, Tv, Coffee, Bath],
    },
    {
      id: 4,
      title: "Executive Suite",
      type: "suite",
      price: 499,
      originalPrice: 599,
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: [
        "City View",
        "Separate Living Room",
        "Premium WiFi",
        "Concierge Access",
      ],
      maxGuests: 3,
      size: "75 sqm",
      features: [Wifi, Car, Utensils, Tv, Coffee, Bath],
    },
    {
      id: 5,
      title: "Luxury Ocean Suite",
      type: "suite",
      price: 699,
      originalPrice: 799,
      rating: 4.9,
      reviews: 92,
      image:
        "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["Ocean View", "Jacuzzi", "Premium WiFi", "24/7 Room Service"],
      maxGuests: 4,
      size: "95 sqm",
      features: [Wifi, Car, Utensils, Tv, Coffee, Bath],
    },
    {
      id: 6,
      title: "Comfort Double",
      type: "standard",
      price: 179,
      originalPrice: 229,
      rating: 4.5,
      reviews: 178,
      image:
        "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["City View", "Double Bed", "WiFi", "Air Conditioning"],
      maxGuests: 2,
      size: "28 sqm",
      features: [Wifi, Tv, Coffee],
    },
  ];

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
    console.log(room);
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
          {sortedRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-48 object-cover"
                />
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
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md text-xs">
                      +{room.amenities.length - 3} more
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
