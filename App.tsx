import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { MentorView } from './components/MentorView';
import { StudentView } from './components/StudentView';
import { User, Role } from './types';
import { getCurrentUser, logoutUser } from './services/db';
import { LogOut, LayoutDashboard, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check session on mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-900 font-semibold animate-pulse">Loading ADZ4NEEDZ...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">ADZ4NEEDZ</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
         <div className="p-6 border-b border-gray-100 hidden md:block">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight">
               ADZ4NEEDZ
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Workforce Portal</p>
         </div>
         
         <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            <div className="px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm flex items-center gap-3 shadow-sm border border-blue-100">
               <LayoutDashboard className="w-5 h-5" />
               Dashboard
            </div>
            {/* Additional Nav Items could be added here */}
         </div>

         <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="px-4 py-3 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.role === 'MENTOR' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-800 truncate">{user.fullName}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">{user.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 truncate font-mono bg-gray-50 p-1 rounded text-center">{user.id}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition text-sm font-bold border border-transparent hover:border-red-100"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
         </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {user.role === Role.MENTOR ? (
            <MentorView />
          ) : (
            <StudentView user={user} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;