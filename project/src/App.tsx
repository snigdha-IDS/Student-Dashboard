import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  CheckCircle as CircleCheck, 
  Brain, 
  BarChart as ChartBar,
  Calendar,
  Clock,
  Siren as Fire,
  ArrowUpRight,
  Award,
  Mail,
  Linkedin,
  Menu,
  X,
  Home,
  BookOpen,
  Settings,
  Bell,
  User,
  Shield,
  Palette,
  Globe,
  HardDrive,
  KeyRound,
  Languages
} from 'lucide-react';

function App() {
  const [problems] = useState([
    { id: 1, title: "Two Sum", difficulty: "Easy", status: "Solved", acceptance: "48%" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", status: "Attempted", acceptance: "35%" },
    { id: 3, title: "Longest Substring", difficulty: "Medium", status: "Todo", acceptance: "32%" },
    { id: 4, title: "Median of Arrays", difficulty: "Hard", status: "Todo", acceptance: "28%" },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [claimedCredential, setClaimedCredential] = useState(false);

  const stats = {
    solved: 143,
    attempted: 200,
    easySolved: 89,
    mediumSolved: 42,
    hardSolved: 12,
    streak: 7,
    ranking: 254367,
  };

  const credentials = [
    { title: "Problem Solver", description: "Solved 100+ coding problems", icon: Brain },
    { title: "Consistency Master", description: "7-day solving streak", icon: Fire },
    { title: "Algorithm Expert", description: "Mastered advanced algorithms", icon: Star },
  ];

  const handleClaimCredential = () => {
    setShowCelebration(true);
    setClaimedCredential(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const settingsCategories = [
    { icon: User, title: "Account", description: "Manage your account settings and preferences" },
    { icon: Bell, title: "Notifications", description: "Configure your notification preferences" },
    { icon: Shield, title: "Privacy & Security", description: "Control your privacy and security settings" },
    { icon: Palette, title: "Appearance", description: "Customize the look and feel of your dashboard" },
    { icon: Globe, title: "Language", description: "Change your preferred language" },
    { icon: HardDrive, title: "Data Management", description: "Manage your data and storage preferences" },
    { icon: KeyRound, title: "API Access", description: "Manage your API keys and access tokens" },
    { icon: Languages, title: "Integration", description: "Configure third-party integrations" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'solved': return 'bg-green-100 text-green-800';
      case 'attempted': return 'bg-yellow-100 text-yellow-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 glass-effect transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-200/30">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent text-center tracking-tight">HEDERA</h2>
          </div>
          
          <nav className="flex-1 p-6 space-y-3">
            <button className="nav-item">
              <Home className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button className="nav-item">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Problems</span>
            </button>
            
            <button 
              onClick={() => setShowCredentialModal(true)}
              className="nav-item"
            >
              <Award className="h-5 w-5" />
              <span className="font-medium">Credentials</span>
            </button>
            
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="nav-item"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Settings</h3>
              <button onClick={() => setShowSettingsModal(false)} className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <div className="space-y-4">
              {settingsCategories.map((category, index) => (
                <button key={index} className="settings-item w-full text-left">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-cyan-50">
                    <category.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{category.title}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Credential Modal */}
      {showCredentialModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-[500px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Your Credentials</h3>
              <button onClick={() => setShowCredentialModal(false)} className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className={`p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full shadow-xl transform transition-all duration-500 ${showCelebration ? 'scale-110' : ''}`}>
                <Trophy className="h-20 w-20 text-yellow-500" />
              </div>
            </div>

            {claimedCredential && (
              <div className="space-y-4 mb-8">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl transform hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full">
                      <credential.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{credential.title}</h4>
                      <p className="text-sm text-gray-600">{credential.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-3">
              <button 
                onClick={handleClaimCredential}
                disabled={claimedCredential}
                className={`w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium ${claimedCredential ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {claimedCredential ? 'Credentials Claimed!' : 'Claim Your Credentials'}
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium">
                <Mail className="h-5 w-5" />
                <span>Verify with Email</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium">
                <Linkedin className="h-5 w-5" />
                <span>Share on LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-72' : 'ml-0'} transition-all duration-300 ease-in-out min-h-screen`}>
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
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Coding Progress Dashboard</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="gradient-border rounded-2xl card-hover">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Problems Solved</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.solved}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-lg">
                    <CircleCheck className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-2xl card-hover">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Streak</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.streak} days</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full shadow-lg">
                    <Fire className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-2xl card-hover">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Global Rank</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">#{stats.ranking}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full shadow-lg">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-2xl card-hover">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{((stats.solved/stats.attempted) * 100).toFixed(1)}%</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full shadow-lg">
                    <ChartBar className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 card-hover gradient-border">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-6">Problem-Solving Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-green-700">Easy Problems</p>
                  <p className="text-2xl font-bold text-green-800">{stats.easySolved} solved</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-yellow-700">Medium Problems</p>
                  <p className="text-2xl font-bold text-yellow-800">{stats.mediumSolved} solved</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-red-700">Hard Problems</p>
                  <p className="text-2xl font-bold text-red-800">{stats.hardSolved} solved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Problems Table */}
          <div className="glass-effect rounded-2xl overflow-hidden card-hover gradient-border">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/30">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Recent Activity</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200/30">
                <thead className="bg-white/50">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Problem Name</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Difficulty</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Success Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/30">
                  {problems.map((problem) => (
                    <tr key={problem.id} className="hover:bg-white/50 transition-colors duration-150 cursor-pointer">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(problem.status)}`}>
                          {problem.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-600">
                        {problem.acceptance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;