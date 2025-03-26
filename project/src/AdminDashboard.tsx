import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Award,
  History,
  UserCircle,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Download,
  Filter,
  ChevronDown,
  Bell,
  Settings,
  Calendar,
  Clock,
  ArrowUpRight,
  Mail,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New credential request", time: "5 minutes ago", unread: true },
    { id: 2, title: "System update completed", time: "1 hour ago", unread: true },
    { id: 3, title: "Weekly report generated", time: "2 hours ago", unread: false },
  ]);

  const [recentActivity] = useState([
    { id: 1, action: "Credential Issued", user: "John Doe", time: "2 minutes ago", status: "success" },
    { id: 2, action: "Profile Updated", user: "Admin", time: "15 minutes ago", status: "success" },
    { id: 3, action: "Login Attempt", user: "Unknown", time: "1 hour ago", status: "failed" },
  ]);

  const departmentData = {
    labels: ['CSE-A', 'CSE-B', 'CSE-C'],
    datasets: [
      {
        data: [75, 65, 85],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CSE-A Progress',
        data: [65, 70, 75, 78, 82, 85],
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'CSE-B Progress',
        data: [60, 65, 68, 72, 75, 78],
        borderColor: 'rgba(6, 182, 212, 1)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const credentialHistory = [
    {
      id: 1,
      student: "John Doe",
      credential: "Problem Solver",
      date: "2024-03-15",
      department: "CSE-A",
      status: "Verified",
    },
    {
      id: 2,
      student: "Jane Smith",
      credential: "Algorithm Master",
      date: "2024-03-14",
      department: "CSE-B",
      status: "Pending",
    },
    {
      id: 3,
      student: "Mike Johnson",
      credential: "Database Expert",
      date: "2024-03-13",
      department: "CSE-C",
      status: "Verified",
    },
  ];

  const adminHistory = [
    {
      id: 1,
      action: "Issued Credential",
      details: "Problem Solver to John Doe",
      timestamp: "2024-03-15 14:30",
      admin: "Admin1",
      status: "success",
    },
    {
      id: 2,
      action: "Updated Profile",
      details: "Modified department settings",
      timestamp: "2024-03-14 11:20",
      admin: "Admin2",
      status: "success",
    },
    {
      id: 3,
      action: "System Update",
      details: "Added new credential type",
      timestamp: "2024-03-13 09:45",
      admin: "Admin1",
      status: "failed",
    },
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status.toLowerCase()) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'verified':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +12% this month
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full">
                    <UserCircle className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credentials Issued</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">856</p>
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +8% this month
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-full">
                    <Award className="h-8 w-8 text-cyan-600" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Departments</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                    <p className="text-sm text-gray-600 mt-2">CSE Departments</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full">
                    <LayoutDashboard className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Uptime</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">99.9%</p>
                    <p className="text-sm text-gray-600 mt-2">Last 30 days</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Department Progress</h3>
                  <button className="btn-secondary">
                    <Calendar className="h-4 w-4" />
                    <span>This Month</span>
                  </button>
                </div>
                <div className="h-[300px]">
                  <Pie data={departmentData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Progress Timeline</h3>
                  <button className="btn-secondary">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <div className="h-[300px]">
                  <Line 
                    data={progressData} 
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                        },
                      },
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                <div className="flex space-x-2">
                  <button className="btn-secondary">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="btn-secondary">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {activity.status === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">by {activity.user}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'issue-credentials':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Issue Credentials</h2>
              <button
                onClick={() => setShowIssueModal(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4" />
                <span>Issue New Credential</span>
              </button>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full sm:w-auto">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search credentials..."
                    className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button className="btn-secondary flex-1 sm:flex-none">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button className="btn-secondary flex-1 sm:flex-none">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Credential</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credentialHistory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{item.student}</td>
                        <td className="py-3 px-4">{item.credential}</td>
                        <td className="py-3 px-4">{item.date}</td>
                        <td className="py-3 px-4">{item.department}</td>
                        <td className="py-3 px-4">
                          <span className={getStatusBadge(item.status)}>{item.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-green-600 hover:text-green-800">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'credential-history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Credential History</h2>
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full sm:w-auto">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search history..."
                    className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button className="btn-secondary flex-1 sm:flex-none">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="btn-secondary flex-1 sm:flex-none">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Credential</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credentialHistory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{item.student}</td>
                        <td className="py-3 px-4">{item.credential}</td>
                        <td className="py-3 px-4">{item.date}</td>
                        <td className="py-3 px-4">{item.department}</td>
                        <td className="py-3 px-4">
                          <span className={getStatusBadge(item.status)}>{item.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-indigo-600 hover:text-indigo-800">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'admin-history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Admin History</h2>
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full sm:w-auto">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search admin history..."
                    className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button className="btn-secondary flex-1 sm:flex-none">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="btn-secondary flex-1 sm:flex-none">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Action</th>
                      <th className="text-left py-3 px-4">Details</th>
                      <th className="text-left py-3 px-4">Timestamp</th>
                      <th className="text-left py-3 px-4">Admin</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminHistory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{item.action}</td>
                        <td className="py-3 px-4">{item.details}</td>
                        <td className="py-3 px-4">{item.timestamp}</td>
                        <td className="py-3 px-4">{item.admin}</td>
                        <td className="py-3 px-4">
                          <span className={getStatusBadge(item.status)}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Profile</h2>
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <UserCircle className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Admin User</h3>
                  <p className="text-gray-600">admin@hedera.com</p>
                  <p className="text-gray-600">Super Admin</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Personal Information</h4>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value="Admin User"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      value="admin@hedera.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Security</h4>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                      type="password"
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="btn-secondary">Cancel</button>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-4">Notification Preferences</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive email updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive text messages for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 glass-effect transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-200/30">
            <h2 className="sidebar-logo">HEDERA</h2>
            <p className="text-center text-gray-600 mt-2">Admin Dashboard</p>
          </div>

          <nav className="flex-1 p-6 space-y-3">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'issue-credentials' ? 'active' : ''}`}
              onClick={() => setActiveTab('issue-credentials')}
            >
              <Award className="h-5 w-5" />
              <span className="font-medium">Issue Credentials</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'credential-history' ? 'active' : ''}`}
              onClick={() => setActiveTab('credential-history')}
            >
              <History className="h-5 w-5" />
              <span className="font-medium">Credential History</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'admin-history' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin-history')}
            >
              <History className="h-5 w-5" />
              <span className="font-medium">Admin History</span>
            </button>

            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <UserCircle className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </button>
          </nav>

          <div className="p-6 border-t border-gray-200/30">
            <button className="nav-item text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-72' : 'ml-0'
        } transition-all duration-300 ease-in-out min-h-screen`}
      >
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-6 left-6 z-40 p-3 rounded-xl glass-effect hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Header */}
        <header className="glass-effect shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="page-title">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg hover:bg-gray-100 relative"
                  >
                    <Bell className="h-6 w-6 text-gray-600" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 glass-effect rounded-xl shadow-lg">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-200 last:border-0 ${
                              notification.unread ? 'bg-indigo-50' : ''
                            }`}
                          >
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  {isSidebarOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>

      {/* Issue Credential Modal */}
      {showIssueModal && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Issue New Credential
              </h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="input-field">
                  <option value="">Select department</option>
                  <option value="CSE-A">CSE-A</option>
                  <option value="CSE-B">CSE-B</option>
                  <option value="CSE-C">CSE-C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential Type
                </label>
                <select className="input-field">
                  <option value="">Select credential</option>
                  <option value="problem-solver">Problem Solver</option>
                  <option value="algorithm-master">Algorithm Master</option>
                  <option value="database-expert">Database Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Enter credential description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowIssueModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button className="btn-primary">Issue Credential</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;