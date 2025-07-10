import React from 'react';
import { 
  Utensils, 
  Car, 
  Wifi, 
  Dumbbell, 
  Waves, 
  Sparkles, 
  Coffee, 
  ShoppingBag, 
  Plane, 
  Users, 
  Clock, 
  Shield,
  Baby,
  PawPrint,
  Briefcase,
  Camera,
  Music,
  Gift
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Utensils,
      title: '24/7 Room Service',
      description: 'Gourmet dining delivered to your room at any hour',
      features: ['Fine dining menu', 'Dietary accommodations', 'Express service', 'In-room dining setup'],
      category: 'dining'
    },
    {
      icon: Car,
      title: 'Valet Parking',
      description: 'Professional valet service for your convenience',
      features: ['24/7 availability', 'Secure parking', 'Car washing service', 'Airport transfers'],
      category: 'transportation'
    },
    {
      icon: Sparkles,
      title: 'Concierge Service',
      description: 'Personal assistance for all your needs',
      features: ['Local recommendations', 'Reservation assistance', 'Tour bookings', 'Personal shopping'],
      category: 'personal'
    },
    {
      icon: Waves,
      title: 'Spa & Wellness',
      description: 'Rejuvenating treatments and wellness programs',
      features: ['Massage therapy', 'Facial treatments', 'Wellness programs', 'Meditation sessions'],
      category: 'wellness'
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art fitness facilities',
      features: ['Modern equipment', 'Personal trainers', '24/7 access', 'Group classes'],
      category: 'wellness'
    },
    {
      icon: ShoppingBag,
      title: 'Laundry & Dry Cleaning',
      description: 'Professional garment care services',
      features: ['Same-day service', 'Dry cleaning', 'Pressing service', 'Shoe shine'],
      category: 'personal'
    },
    {
      icon: Plane,
      title: 'Airport Transportation',
      description: 'Luxury transfers to and from the airport',
      features: ['Private vehicles', 'Flight tracking', 'Meet & greet', 'Luggage assistance'],
      category: 'transportation'
    },
    {
      icon: Users,
      title: 'Event Planning',
      description: 'Professional event coordination services',
      features: ['Wedding planning', 'Corporate events', 'Private parties', 'Catering services'],
      category: 'events'
    },
    {
      icon: Briefcase,
      title: 'Business Center',
      description: 'Complete business support services',
      features: ['Meeting rooms', 'Printing services', 'Secretarial support', 'Video conferencing'],
      category: 'business'
    },
    {
      icon: Baby,
      title: 'Childcare Services',
      description: 'Professional childcare and family amenities',
      features: ['Babysitting service', 'Kids club', 'Family activities', 'Child-friendly dining'],
      category: 'family'
    },
    {
      icon: PawPrint,
      title: 'Pet Services',
      description: 'Comprehensive care for your furry companions',
      features: ['Pet sitting', 'Walking service', 'Pet grooming', 'Veterinary contacts'],
      category: 'personal'
    },
    {
      icon: Camera,
      title: 'Photography Services',
      description: 'Professional photography for special occasions',
      features: ['Event photography', 'Portrait sessions', 'Photo editing', 'Digital delivery'],
      category: 'events'
    }
  ];

  const premiumServices = [
    {
      icon: Gift,
      title: 'Personal Butler Service',
      description: 'Dedicated butler for ultimate luxury experience',
      price: 'From $200/day'
    },
    {
      icon: Music,
      title: 'Private Chef Service',
      description: 'Personal chef for in-room dining experiences',
      price: 'From $300/meal'
    },
    {
      icon: Car,
      title: 'Luxury Car Rental',
      description: 'Premium vehicle rental with chauffeur',
      price: 'From $150/hour'
    },
    {
      icon: Plane,
      title: 'Helicopter Tours',
      description: 'Scenic helicopter tours of the city',
      price: 'From $500/person'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', color: 'gold' },
    { id: 'dining', name: 'Dining', color: 'blue' },
    { id: 'wellness', name: 'Wellness', color: 'green' },
    { id: 'transportation', name: 'Transportation', color: 'purple' },
    { id: 'personal', name: 'Personal', color: 'pink' },
    { id: 'events', name: 'Events', color: 'indigo' },
    { id: 'business', name: 'Business', color: 'gray' },
    { id: 'family', name: 'Family', color: 'yellow' }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Exceptional services tailored to exceed your expectations
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gold-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Exclusive services for the ultimate luxury experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 rounded-xl p-6 text-center border border-gold-200 dark:border-gold-800">
                  <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    {service.description}
                  </p>
                  <p className="text-gold-600 font-semibold">
                    {service.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Hours */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Service Hours
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We're here to serve you around the clock
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <Clock className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">24/7 Services</h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                <li>Room Service</li>
                <li>Concierge</li>
                <li>Front Desk</li>
                <li>Security</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <Shield className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Business Hours</h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                <li>Spa: 6 AM - 10 PM</li>
                <li>Business Center: 24/7</li>
                <li>Fitness Center: 24/7</li>
                <li>Pool: 6 AM - 11 PM</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <Wifi className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Always Available</h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                <li>High-Speed WiFi</li>
                <li>Valet Parking</li>
                <li>Emergency Services</li>
                <li>Medical Assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Need a Custom Service?
          </h2>
          <p className="text-xl text-gold-100 mb-8">
            Our concierge team can arrange any special request you may have
          </p>
          <button className="bg-white text-gold-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block transform hover:scale-105">
            Contact Concierge
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;