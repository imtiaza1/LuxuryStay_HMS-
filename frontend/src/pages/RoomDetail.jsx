import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Users, Wifi, Car, Utensils, Tv, Coffee, Bath, Calendar, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  // Mock room data (in real app, this would come from API)
  const room = {
    id: 1,
    title: "Deluxe Ocean View",
    type: "deluxe",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    amenities: ["Ocean View", "King Bed", "WiFi", "Mini Bar", "Room Service", "Air Conditioning"],
    maxGuests: 2,
    size: "45 sqm",
    bedType: "King Size Bed",
    view: "Ocean View",
    features: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Car, label: "Valet Parking" },
      { icon: Utensils, label: "Room Service" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Coffee Machine" },
      { icon: Bath, label: "Luxury Bathroom" }
    ],
    description: `Experience luxury at its finest in our Deluxe Ocean View room. This beautifully appointed accommodation features a king-size bed, stunning ocean views, and premium amenities to ensure your stay is nothing short of extraordinary.

    The room includes a private balcony with breathtaking ocean views, a spacious marble bathroom with premium toiletries, and a comfortable seating area perfect for relaxation. Guests can enjoy 24/7 room service, high-speed WiFi, and access to all hotel amenities.

    Whether you're here for business or leisure, our Deluxe Ocean View room provides the perfect sanctuary for a memorable stay at LuxuryStay HMS.`
  };

  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2024-01-10",
      comment: "Absolutely stunning room with an incredible ocean view! The bed was incredibly comfortable and the bathroom was luxurious. Staff was very attentive.",
      helpful: 12
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      date: "2024-01-05",
      comment: "Great room with excellent amenities. The view was spectacular and the room was very clean. Only minor issue was the WiFi was a bit slow.",
      helpful: 8
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      rating: 5,
      date: "2023-12-28",
      comment: "Perfect for our anniversary stay. The room was romantic and the service was exceptional. The balcony was our favorite spot for morning coffee.",
      helpful: 15
    }
  ];

  const handleBooking = () => {
    if (!user) {
      error('Please login to make a booking');
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      error('Please select check-in and check-out dates');
      return;
    }

    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      error('Check-out date must be after check-in date');
      return;
    }

    // Mock booking logic
    success(`Booking confirmed for ${nights} nights! Total: $${room.price * nights}`);
    
    // In real app, this would make an API call to create the booking
    // TODO: Implement actual booking API call
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Room Not Found</h2>
          <button
            onClick={() => navigate('/rooms')}
            className="text-gold-600 hover:text-gold-500"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/rooms')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Rooms</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={room.images[currentImage]}
                  alt={room.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {room.type}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      currentImage === index ? 'ring-2 ring-gold-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Room view ${index + 1}`}
                      className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {room.originalPrice > room.price && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through mr-2">
                      ${room.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${room.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">/night</span>
                </div>
                {room.originalPrice > room.price && (
                  <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full text-sm font-medium">
                    Save ${room.originalPrice - room.price}
                  </span>
                )}
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
                  <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {room.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  ({room.reviews} reviews)
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      {room.maxGuests > 2 && <option value="3">3 Guests</option>}
                      {room.maxGuests > 3 && <option value="4">4 Guests</option>}
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Book Now
              </button>

              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Free cancellation up to 24 hours before check-in
              </div>
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {room.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">Up to {room.maxGuests} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 text-gray-500">📐</span>
                  <span className="text-gray-700 dark:text-gray-300">{room.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 text-gray-500">🛏️</span>
                  <span className="text-gray-700 dark:text-gray-300">{room.bedType}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {room.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Room Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gold-500" />
                      <span className="text-gray-700 dark:text-gray-300">{feature.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Guest Reviews
              </h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {review.author}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-gold-400 text-gold-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {review.comment}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {review.helpful} people found this helpful
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Check-in / Check-out</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check-in: 3:00 PM<br />
                    Check-out: 11:00 AM
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free cancellation up to 24 hours before check-in. After that, the first night will be charged.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hotel Policies</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    • No smoking<br />
                    • No pets allowed<br />
                    • Quiet hours: 10 PM - 6 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;