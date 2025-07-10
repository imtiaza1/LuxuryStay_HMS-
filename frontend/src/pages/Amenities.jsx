import React from 'react';
import { 
  Waves, 
  Dumbbell, 
  Sparkles, 
  Wifi, 
  Car, 
  Utensils, 
  Coffee, 
  Tv, 
  Bath, 
  Wind, 
  Shield, 
  Baby,
  PawPrint,
  Briefcase,
  Music,
  Camera,
  Gamepad2,
  Book,
  Flower,
  Sun,
  Snowflake,
  Users,
  Clock,
  MapPin
} from 'lucide-react';

const Amenities = () => {
  const amenityCategories = [
    {
      title: 'Recreation & Wellness',
      icon: Waves,
      color: 'blue',
      amenities: [
        {
          icon: Waves,
          name: 'Infinity Pool',
          description: 'Stunning infinity pool with panoramic city views',
          features: ['Heated pool', 'Pool bar', 'Cabanas', 'Night lighting']
        },
        {
          icon: Dumbbell,
          name: 'Fitness Center',
          description: 'State-of-the-art fitness equipment and personal trainers',
          features: ['24/7 access', 'Personal trainers', 'Group classes', 'Modern equipment']
        },
        {
          icon: Sparkles,
          name: 'Luxury Spa',
          description: 'Full-service spa with rejuvenating treatments',
          features: ['Massage therapy', 'Facial treatments', 'Sauna', 'Steam room']
        },
        {
          icon: Sun,
          name: 'Rooftop Terrace',
          description: 'Beautiful rooftop space with lounge areas',
          features: ['City views', 'Outdoor seating', 'Bar service', 'Event space']
        }
      ]
    },
    {
      title: 'Dining & Entertainment',
      icon: Utensils,
      color: 'green',
      amenities: [
        {
          icon: Utensils,
          name: 'Fine Dining Restaurant',
          description: 'Award-winning restaurant with world-class cuisine',
          features: ['Michelin-starred chef', 'Wine cellar', 'Private dining', 'Tasting menus']
        },
        {
          icon: Coffee,
          name: 'Café & Lounge',
          description: 'Casual dining with artisanal coffee and light meals',
          features: ['Specialty coffee', 'Fresh pastries', 'Light meals', 'Outdoor seating']
        },
        {
          icon: Music,
          name: 'Piano Bar',
          description: 'Elegant bar with live piano entertainment',
          features: ['Live music', 'Premium cocktails', 'Wine selection', 'Intimate atmosphere']
        },
        {
          icon: Gamepad2,
          name: 'Game Room',
          description: 'Entertainment room with various games and activities',
          features: ['Pool table', 'Board games', 'Video games', 'Private parties']
        }
      ]
    },
    {
      title: 'Business & Technology',
      icon: Briefcase,
      color: 'purple',
      amenities: [
        {
          icon: Wifi,
          name: 'High-Speed WiFi',
          description: 'Complimentary high-speed internet throughout the property',
          features: ['Fiber optic', 'Unlimited bandwidth', 'Secure connection', '24/7 support']
        },
        {
          icon: Briefcase,
          name: 'Business Center',
          description: 'Fully equipped business facilities',
          features: ['Meeting rooms', 'Printing services', 'Video conferencing', 'Secretarial support']
        },
        {
          icon: Tv,
          name: 'Smart Room Technology',
          description: 'Advanced in-room technology and entertainment',
          features: ['Smart TV', 'Voice control', 'Mobile app', 'Automated systems']
        }
      ]
    },
    {
      title: 'Comfort & Convenience',
      icon: Bath,
      color: 'gold',
      amenities: [
        {
          icon: Car,
          name: 'Valet Parking',
          description: 'Professional valet service with secure parking',
          features: ['24/7 service', 'Car washing', 'Secure garage', 'Electric charging']
        },
        {
          icon: Wind,
          name: 'Climate Control',
          description: 'Individual climate control in all rooms',
          features: ['Smart thermostats', 'Air purification', 'Humidity control', 'Energy efficient']
        },
        {
          icon: Bath,
          name: 'Luxury Bathrooms',
          description: 'Marble bathrooms with premium amenities',
          features: ['Rain showers', 'Soaking tubs', 'Premium toiletries', 'Heated floors']
        },
        {
          icon: Shield,
          name: '24/7 Security',
          description: 'Comprehensive security and safety systems',
          features: ['CCTV monitoring', 'Key card access', 'Security personnel', 'Safe deposit boxes']
        }
      ]
    },
    {
      title: 'Family & Pet Services',
      icon: Baby,
      color: 'pink',
      amenities: [
        {
          icon: Baby,
          name: 'Kids Club',
          description: 'Supervised activities and entertainment for children',
          features: ['Age-appropriate activities', 'Qualified staff', 'Safe environment', 'Educational programs']
        },
        {
          icon: PawPrint,
          name: 'Pet-Friendly Services',
          description: 'Comprehensive services for your furry companions',
          features: ['Pet sitting', 'Walking service', 'Pet amenities', 'Veterinary contacts']
        },
        {
          icon: Users,
          name: 'Family Suites',
          description: 'Spacious accommodations designed for families',
          features: ['Connecting rooms', 'Kitchenette', 'Child-proofing', 'Extra bedding']
        }
      ]
    },
    {
      title: 'Additional Services',
      icon: Clock,
      color: 'indigo',
      amenities: [
        {
          icon: Book,
          name: 'Library & Reading Room',
          description: 'Quiet space with extensive book collection',
          features: ['Classic literature', 'Magazines', 'Comfortable seating', 'Study areas']
        },
        {
          icon: Flower,
          name: 'Garden & Landscaping',
          description: 'Beautiful gardens and outdoor spaces',
          features: ['Tropical plants', 'Walking paths', 'Meditation areas', 'Outdoor events']
        },
        {
          icon: Camera,
          name: 'Photography Services',
          description: 'Professional photography for special occasions',
          features: ['Event photography', 'Portrait sessions', 'Photo editing', 'Digital delivery']
        },
        {
          icon: MapPin,
          name: 'Concierge Services',
          description: 'Personal assistance for all your needs',
          features: ['Local recommendations', 'Reservations', 'Tour bookings', 'Transportation']
        }
      ]
    }
  ];

  const premiumAmenities = [
    {
      icon: Sparkles,
      name: 'Presidential Suite Amenities',
      description: 'Exclusive amenities for our most luxurious accommodations',
      features: ['Private butler', 'Personal chef', 'Limousine service', 'Private balcony']
    },
    {
      icon: Snowflake,
      name: 'Climate-Controlled Wine Cellar',
      description: 'Extensive wine collection in temperature-controlled environment',
      features: ['Rare vintages', 'Wine tastings', 'Sommelier service', 'Private dining']
    },
    {
      icon: Users,
      name: 'Private Event Spaces',
      description: 'Exclusive venues for special occasions',
      features: ['Wedding chapel', 'Ballroom', 'Conference halls', 'Outdoor pavilion']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Hotel Amenities
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              World-class facilities designed for your comfort and enjoyment
            </p>
          </div>
        </div>
      </section>

      {/* Amenities by Category */}
      {amenityCategories.map((category, categoryIndex) => {
        const CategoryIcon = category.icon;
        return (
          <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className={`w-16 h-16 bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <CategoryIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {category.amenities.map((amenity, index) => {
                  const AmenityIcon = amenity.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AmenityIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {amenity.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {amenity.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {amenity.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Premium Amenities */}
      <section className="py-20 bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Premium Amenities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Exclusive facilities for the ultimate luxury experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {premiumAmenities.map((amenity, index) => {
              const AmenityIcon = amenity.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border-2 border-gold-200 dark:border-gold-800 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AmenityIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {amenity.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {amenity.description}
                  </p>
                  <div className="space-y-2">
                    {amenity.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities Hours */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Facility Hours
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Operating hours for our various amenities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <Waves className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pool & Spa</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">6:00 AM - 11:00 PM</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <Dumbbell className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fitness Center</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">24/7 Access</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <Utensils className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Restaurant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">6:00 AM - 12:00 AM</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <Briefcase className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Business Center</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">24/7 Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience Our Amenities
          </h2>
          <p className="text-xl text-gold-100 mb-8">
            Book your stay and enjoy access to all our world-class facilities
          </p>
          <button className="bg-white text-gold-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block transform hover:scale-105">
            Book Your Stay
          </button>
        </div>
      </section>
    </div>
  );
};

export default Amenities;