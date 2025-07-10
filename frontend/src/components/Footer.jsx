import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold">LuxuryStay HMS</span>
            </div>
            <p className="text-gray-400">
              Experience luxury and comfort at its finest. Your perfect stay awaits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/rooms" className="text-gray-400 hover:text-gold-400 transition-colors">Rooms</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gold-400 transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-gold-400 transition-colors">Services</Link></li>
              <li><Link to="/amenities" className="text-gray-400 hover:text-gold-400 transition-colors">Amenities</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Room Service</span></li>
              <li><span className="text-gray-400">Concierge</span></li>
              <li><span className="text-gray-400">Spa & Wellness</span></li>
              <li><span className="text-gray-400">Laundry</span></li>
              <li><span className="text-gray-400">Transportation</span></li>
              <li><span className="text-gray-400">Event Planning</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">123 Luxury Avenue</p>
                  <p className="text-gray-400">Paradise City, PC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <p className="text-gray-400">info@luxurystay.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 LuxuryStay HMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;