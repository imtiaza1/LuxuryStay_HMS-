import {
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Sparkles,
  Star,
  Users,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Absolutely stunning hotel! The service was impeccable and the rooms were luxurious. Will definitely return!",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Perfect for our anniversary getaway. The staff went above and beyond to make our stay memorable.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment:
        "The spa facilities are world-class. I've never felt so relaxed and rejuvenated. Highly recommended!",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  const amenities = [
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Complimentary wireless internet throughout the property",
    },
    {
      icon: Car,
      title: "Valet Parking",
      description: "24/7 valet service for your convenience",
    },
    {
      icon: Utensils,
      title: "Fine Dining",
      description: "Multiple restaurants with world-class cuisine",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "State-of-the-art gym equipment and personal trainers",
    },
    {
      icon: Waves,
      title: "Swimming Pool",
      description: "Infinity pool with stunning city views",
    },
    {
      icon: Sparkles,
      title: "Spa & Wellness",
      description: "Full-service spa with luxury treatments",
    },
  ];

  const services = [
    "24/7 Room Service",
    "Concierge Service",
    "Laundry & Dry Cleaning",
    "Airport Transportation",
    "Event Planning",
    "Business Center",
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              LuxuryStay HMS
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Experience unparalleled luxury and comfort in the heart of
              paradise
            </p>

            {/* Booking Form */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    &nbsp;
                  </label>
                  <Link
                    to="/rooms"
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block text-center"
                  >
                    Browse Rooms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              World-Class Amenities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for the perfect stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {amenity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Dedicated to making your stay unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white font-medium">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hear from those who've experienced luxury with us
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-gold-400 text-gold-400"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                "{testimonials[currentTestimonial].comment}"
              </p>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Video Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience LuxuryStay
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Take a virtual tour of our magnificent property
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto mt-10 px-4">
            <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-lg">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/videos/hotel-tour.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* Overlay content */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="text-center px-4">
                  <h2 className="text-white text-2xl md:text-4xl font-bold opacity-40">
                    Welcome to LuxuryStay Hotel
                  </h2>
                  <p className="text-gray-200 mt-2 text-sm md:text-base opacity-40">
                    Experience comfort, elegance, and breathtaking views.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for Your Perfect Stay?
          </h2>
          <p className="text-xl text-gold-100 mb-8">
            Book now and experience luxury like never before
          </p>
          <Link
            to="/rooms"
            className="bg-white text-gold-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block transform hover:scale-105"
          >
            Book Your Room
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
