import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  UserCheck, 
  Calendar, 
  Users, 
  Key, 
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  Edit,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState('checkin');
  const [searchTerm, setSearchTerm] = useState('');

  const todayStats = [
    {
      title: 'Check-ins Today',
      value: '12',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Check-outs Today',
      value: '8',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Current Guests',
      value: '156',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Available Rooms',
      value: '42',
      icon: Key,
      color: 'orange'
    }
  ];

  const checkInList = [
    {
      id: 1,
      guest: 'John Smith',
      room: '205 - Deluxe Ocean View',
      checkIn: '3:00 PM',
      status: 'pending',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      nights: 3,
      amount: '$897'
    },
    {
      id: 2,
      guest: 'Emily Johnson',
      room: '501 - Presidential Suite',
      checkIn: '2:30 PM',
      status: 'ready',
      phone: '+1 (555) 234-5678',
      email: 'emily.johnson@email.com',
      nights: 4,
      amount: '$2,696'
    },
    {
      id: 3,
      guest: 'Michael Brown',
      room: '102 - Standard Garden View',
      checkIn: '4:00 PM',
      status: 'pending',
      phone: '+1 (555) 345-6789',
      email: 'michael.brown@email.com',
      nights: 2,
      amount: '$398'
    }
  ];

  const checkOutList = [
    {
      id: 1,
      guest: 'Sarah Davis',
      room: '305 - Executive Suite',
      checkOut: '11:00 AM',
      status: 'completed',
      phone: '+1 (555) 456-7890',
      email: 'sarah.davis@email.com',
      nights: 4,
      amount: '$1,596'
    },
    {
      id: 2,
      guest: 'Robert Wilson',
      room: '201 - Deluxe City View',
      checkOut: '10:30 AM',
      status: 'pending',
      phone: '+1 (555) 567-8901',
      email: 'robert.wilson@email.com',
      nights: 2,
      amount: '$598'
    }
  ];

  const currentGuests = [
    {
      id: 1,
      guest: 'Alice Cooper',
      room: '401 - Luxury Ocean Suite',
      checkIn: '2024-01-14',
      checkOut: '2024-01-18',
      phone: '+1 (555) 678-9012',
      email: 'alice.cooper@email.com',
      status: 'checked_in',
      requests: ['Extra towels', 'Late checkout']
    },
    {
      id: 2,
      guest: 'David Lee',
      room: '203 - Deluxe Garden View',
      checkIn: '2024-01-15',
      checkOut: '2024-01-17',
      phone: '+1 (555) 789-0123',
      email: 'david.lee@email.com',
      status: 'checked_in',
      requests: ['Room service']
    },
    {
      id: 3,
      guest: 'Maria Garcia',
      room: '301 - Executive Suite',
      checkIn: '2024-01-13',
      checkOut: '2024-01-16',
      phone: '+1 (555) 890-1234',
      email: 'maria.garcia@email.com',
      status: 'checked_in',
      requests: []
    }
  ];

  const availableRooms = [
    {
      number: '101',
      type: 'Standard Garden View',
      status: 'clean',
      price: '$199'
    },
    {
      number: '202',
      type: 'Deluxe Ocean View',
      status: 'clean',
      price: '$299'
    },
    {
      number: '304',
      type: 'Executive Suite',
      status: 'maintenance',
      price: '$499'
    },
    {
      number: '402',
      type: 'Luxury Ocean Suite',
      status: 'clean',
      price: '$699'
    },
    {
      number: '105',
      type: 'Comfort Double',
      status: 'cleaning',
      price: '$179'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
      case 'completed':
      case 'clean':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'checked_in':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
      case 'cleaning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'maintenance':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
      case 'completed':
      case 'clean':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'cleaning':
      case 'maintenance':
        return <AlertCircle className="w-4 h-4" />;
      case 'checked_in':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredGuests = currentGuests.filter(guest =>
    guest.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Receptionist Dashboard">
      <div className="space-y-6">
        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {todayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
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

        {/* Main Content Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('checkin')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'checkin'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Check-in ({checkInList.length})
              </button>
              <button
                onClick={() => setActiveTab('checkout')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'checkout'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Check-out ({checkOutList.length})
              </button>
              <button
                onClick={() => setActiveTab('guests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'guests'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Current Guests ({currentGuests.length})
              </button>
              <button
                onClick={() => setActiveTab('rooms')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rooms'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Room Status
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'checkin' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Today's Check-ins
                  </h3>
                  <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Walk-in</span>
                  </button>
                </div>
                {checkInList.map((guest) => (
                  <div key={guest.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {guest.guest}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {guest.room} • {guest.nights} nights • {guest.amount}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                          {getStatusIcon(guest.status)}
                          {guest.status}
                        </span>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Check In
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{guest.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{guest.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Expected: {guest.checkIn}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'checkout' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Today's Check-outs
                  </h3>
                </div>
                {checkOutList.map((guest) => (
                  <div key={guest.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {guest.guest}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {guest.room} • {guest.nights} nights • {guest.amount}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                          {getStatusIcon(guest.status)}
                          {guest.status}
                        </span>
                        {guest.status === 'pending' && (
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Check Out
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{guest.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{guest.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Expected: {guest.checkOut}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'guests' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Current Guests
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search guests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>
                {filteredGuests.map((guest) => (
                  <div key={guest.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {guest.guest}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {guest.room} • {guest.checkIn} to {guest.checkOut}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                          {getStatusIcon(guest.status)}
                          {guest.status.replace('_', ' ')}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{guest.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{guest.email}</span>
                      </div>
                    </div>
                    {guest.requests.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Special Requests:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {guest.requests.map((request, index) => (
                            <span key={index} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 px-2 py-1 rounded-full text-xs">
                              {request}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Room Status Overview
                  </h3>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Clean
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Cleaning
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Maintenance
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableRooms.map((room, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Room {room.number}
                        </h4>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                          {getStatusIcon(room.status)}
                          {room.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {room.type}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {room.price}/night
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceptionistDashboard;