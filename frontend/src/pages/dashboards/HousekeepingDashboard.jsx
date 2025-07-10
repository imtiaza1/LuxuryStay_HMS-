import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  CheckSquare, 
  Hotel, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

const HousekeepingDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  const todayStats = [
    {
      title: 'Tasks Assigned',
      value: '8',
      icon: CheckSquare,
      color: 'blue'
    },
    {
      title: 'Tasks Completed',
      value: '5',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'In Progress',
      value: '2',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Pending',
      value: '1',
      icon: AlertCircle,
      color: 'red'
    }
  ];

  const myTasks = [
    {
      id: 1,
      room: 'Room 201',
      type: 'Deep Cleaning',
      priority: 'high',
      status: 'in_progress',
      estimatedTime: '2 hours',
      startTime: '9:00 AM',
      description: 'Complete deep cleaning including bathroom, bedroom, and balcony',
      checklist: [
        { item: 'Vacuum carpets', completed: true },
        { item: 'Clean bathroom', completed: true },
        { item: 'Change bed linens', completed: false },
        { item: 'Dust furniture', completed: false },
        { item: 'Clean balcony', completed: false }
      ]
    },
    {
      id: 2,
      room: 'Room 305',
      type: 'Standard Cleaning',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '1 hour',
      startTime: '11:00 AM',
      description: 'Standard room cleaning and maintenance check',
      checklist: [
        { item: 'Make beds', completed: false },
        { item: 'Clean bathroom', completed: false },
        { item: 'Vacuum floor', completed: false },
        { item: 'Empty trash', completed: false },
        { item: 'Restock amenities', completed: false }
      ]
    },
    {
      id: 3,
      room: 'Room 102',
      type: 'Maintenance Check',
      priority: 'low',
      status: 'completed',
      estimatedTime: '30 minutes',
      startTime: '8:00 AM',
      description: 'Check all fixtures and report any issues',
      checklist: [
        { item: 'Check plumbing', completed: true },
        { item: 'Test electrical outlets', completed: true },
        { item: 'Inspect furniture', completed: true },
        { item: 'Check air conditioning', completed: true }
      ]
    },
    {
      id: 4,
      room: 'Room 401',
      type: 'Inspection',
      priority: 'high',
      status: 'pending',
      estimatedTime: '45 minutes',
      startTime: '2:00 PM',
      description: 'Final inspection before guest check-in',
      checklist: [
        { item: 'Overall cleanliness check', completed: false },
        { item: 'Amenities inventory', completed: false },
        { item: 'Room functionality test', completed: false },
        { item: 'Final touch-ups', completed: false }
      ]
    }
  ];

  const roomStatus = [
    {
      number: '101',
      type: 'Standard Garden View',
      status: 'clean',
      lastCleaned: '2024-01-15 10:30 AM',
      nextGuest: '3:00 PM Today'
    },
    {
      number: '102',
      type: 'Standard Garden View',
      status: 'maintenance',
      lastCleaned: '2024-01-15 8:00 AM',
      nextGuest: 'Tomorrow'
    },
    {
      number: '201',
      type: 'Deluxe Ocean View',
      status: 'cleaning',
      lastCleaned: 'In Progress',
      nextGuest: '4:00 PM Today'
    },
    {
      number: '202',
      type: 'Deluxe Ocean View',
      status: 'dirty',
      lastCleaned: '2024-01-14 2:00 PM',
      nextGuest: 'Tomorrow'
    },
    {
      number: '305',
      type: 'Executive Suite',
      status: 'assigned',
      lastCleaned: '2024-01-14 4:00 PM',
      nextGuest: '5:00 PM Today'
    },
    {
      number: '401',
      type: 'Luxury Ocean Suite',
      status: 'inspection',
      lastCleaned: '2024-01-15 11:00 AM',
      nextGuest: '6:00 PM Today'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'clean':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress':
      case 'cleaning':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
      case 'assigned':
      case 'dirty':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'maintenance':
      case 'inspection':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'clean':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
      case 'cleaning':
        return <Clock className="w-4 h-4" />;
      case 'pending':
      case 'assigned':
      case 'dirty':
        return <AlertCircle className="w-4 h-4" />;
      case 'maintenance':
      case 'inspection':
        return <CheckSquare className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    // TODO: Implement task status update
    console.log(`Updating task ${taskId} to ${newStatus}`);
  };

  const toggleChecklistItem = (taskId, itemIndex) => {
    // TODO: Implement checklist item toggle
    console.log(`Toggling checklist item ${itemIndex} for task ${taskId}`);
  };

  return (
    <DashboardLayout title="Housekeeping Dashboard">
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
                onClick={() => setActiveTab('tasks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tasks'
                    ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                My Tasks ({myTasks.length})
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
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Today's Tasks
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {myTasks.filter(task => task.status === 'completed').length} of {myTasks.length} completed
                  </div>
                </div>

                {myTasks.map((task) => (
                  <div key={task.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {task.room}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => updateTaskStatus(task.id, 'in_progress')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>Start</span>
                          </button>
                        )}
                        {task.status === 'in_progress' && (
                          <>
                            <button
                              onClick={() => updateTaskStatus(task.id, 'pending')}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                            >
                              <Pause className="w-3 h-3" />
                              <span>Pause</span>
                            </button>
                            <button
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Complete</span>
                            </button>
                          </>
                        )}
                        {task.status === 'completed' && (
                          <button
                            onClick={() => updateTaskStatus(task.id, 'in_progress')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reopen</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {task.estimatedTime} • Start: {task.startTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{task.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{task.room}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {task.description}
                    </p>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Checklist ({task.checklist.filter(item => item.completed).length}/{task.checklist.length})
                      </h5>
                      <div className="space-y-2">
                        {task.checklist.map((item, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleChecklistItem(task.id, index)}
                              className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 rounded focus:ring-gold-500 dark:focus:ring-gold-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className={`text-sm ${
                              item.completed 
                                ? 'text-gray-500 dark:text-gray-400 line-through' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {item.item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
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
                  <div className="flex space-x-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Clean
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Cleaning
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Dirty/Assigned
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Maintenance/Inspection
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roomStatus.map((room, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
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
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>Last cleaned: {room.lastCleaned}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>Next guest: {room.nextGuest}</span>
                        </div>
                      </div>
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

export default HousekeepingDashboard;