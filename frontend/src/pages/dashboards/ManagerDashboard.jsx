import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Hotel, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  ClipboardList,
  BarChart3,
  PieChart
} from 'lucide-react';

const ManagerDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Monthly Revenue',
      value: '$89,500',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Occupancy Rate',
      value: '87%',
      change: '+5.1%',
      trend: 'up',
      icon: Hotel,
      color: 'blue'
    },
    {
      title: 'Active Bookings',
      value: '234',
      change: '+12.3%',
      trend: 'up',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Staff on Duty',
      value: '28',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'orange'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      guest: 'John Smith',
      room: 'Deluxe Ocean View - 205',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      amount: '$897',
      status: 'confirmed'
    },
    {
      id: 2,
      guest: 'Emily Johnson',
      room: 'Presidential Suite - 501',
      checkIn: '2024-01-16',
      checkOut: '2024-01-20',
      amount: '$2,696',
      status: 'checked_in'
    },
    {
      id: 3,
      guest: 'Michael Brown',
      room: 'Standard Garden View - 102',
      checkIn: '2024-01-17',
      checkOut: '2024-01-19',
      amount: '$398',
      status: 'pending'
    },
    {
      id: 4,
      guest: 'Sarah Davis',
      room: 'Executive Suite - 305',
      checkIn: '2024-01-18',
      checkOut: '2024-01-22',
      amount: '$1,596',
      status: 'confirmed'
    }
  ];

  const housekeepingTasks = [
    {
      id: 1,
      room: 'Room 201',
      type: 'Deep Cleaning',
      assignedTo: 'Maria Garcia',
      status: 'in_progress',
      priority: 'high',
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      room: 'Room 305',
      type: 'Maintenance Check',
      assignedTo: 'David Wilson',
      status: 'pending',
      priority: 'medium',
      estimatedTime: '1 hour'
    },
    {
      id: 3,
      room: 'Room 102',
      type: 'Standard Cleaning',
      assignedTo: 'Sarah Lee',
      status: 'completed',
      priority: 'low',
      estimatedTime: '45 minutes'
    },
    {
      id: 4,
      room: 'Room 401',
      type: 'Inspection',
      assignedTo: 'Carlos Rodriguez',
      status: 'pending',
      priority: 'high',
      estimatedTime: '30 minutes'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 85000, occupancy: 82 },
    { month: 'Feb', revenue: 92000, occupancy: 85 },
    { month: 'Mar', revenue: 78000, occupancy: 79 },
    { month: 'Apr', revenue: 89500, occupancy: 87 },
  ];

  const staffSchedule = [
    {
      name: 'Alice Johnson',
      role: 'Receptionist',
      shift: '6:00 AM - 2:00 PM',
      status: 'on_duty'
    },
    {
      name: 'Bob Smith',
      role: 'Housekeeping',
      shift: '8:00 AM - 4:00 PM',
      status: 'on_duty'
    },
    {
      name: 'Carol Davis',
      role: 'Concierge',
      shift: '2:00 PM - 10:00 PM',
      status: 'scheduled'
    },
    {
      name: 'David Wilson',
      role: 'Maintenance',
      shift: '9:00 AM - 5:00 PM',
      status: 'on_break'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
      case 'on_duty':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'checked_in':
      case 'in_progress':
      case 'on_break':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
      case 'on_duty':
        return <CheckCircle className="w-4 h-4" />;
      case 'checked_in':
      case 'in_progress':
      case 'on_break':
        return <Clock className="w-4 h-4" />;
      case 'pending':
      case 'scheduled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout title="Manager Dashboard">
      <div className="space-y-6">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Management Overview
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
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
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('housekeeping')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'housekeeping'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Housekeeping
              </button>
              <button
                onClick={() => setActiveTab('staff')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'staff'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Staff
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Revenue Trend
                    </h3>
                    <BarChart3 className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="space-y-4">
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            ${data.revenue.toLocaleString()}
                          </span>
                          <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-gold-500 h-2 rounded-full" 
                              style={{ width: `${data.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{data.occupancy}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm">New Booking</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <ClipboardList className="w-5 h-5" />
                      <span className="text-sm">Assign Task</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">Staff Schedule</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                      <PieChart className="w-5 h-5" />
                      <span className="text-sm">Reports</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Bookings
                  </h3>
                  <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    New Booking
                  </button>
                </div>
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {booking.guest}
                        </h4>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {booking.amount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.room}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.checkIn} - {booking.checkOut}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'housekeeping' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Housekeeping Tasks
                  </h3>
                  <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Assign Task
                  </button>
                </div>
                {housekeepingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.room} - {task.type}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Assigned to: {task.assignedTo}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Estimated time: {task.estimatedTime}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'staff' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Staff Schedule
                  </h3>
                  <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Manage Schedule
                  </button>
                </div>
                {staffSchedule.map((staff, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {staff.name}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {staff.shift}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {staff.role}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                        {getStatusIcon(staff.status)}
                        {staff.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;