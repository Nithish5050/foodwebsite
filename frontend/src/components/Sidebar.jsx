import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/add-recipe', label: 'Add Recipe', icon: '➕' },
    { path: '/my-recipes', label: 'My Recipes', icon: '📖' },
    { path: '/favorites', label: 'Favorites', icon: '❤️' },
  ];

  const adminItems = user?.role === 'admin' ? [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/manage-recipes', label: 'Manage Recipes', icon: '🍽️' },
  ] : [];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50 shadow-xl" style={{ backgroundColor: '#1A1A1A', borderRight: '1px solid #2A2A2A' }}>
      {/* Logo/Branding */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">
          <span style={{ color: '#FF6600' }}>Foodie</span>
        </h2>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white text-2xl font-bold mb-3">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <p className="text-gray-400 text-xs text-center text-ellipsis">{user?.email}</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                  style={isActive ? { backgroundColor: '#FF6600' } : {}}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* Admin Section */}
          {adminItems.length > 0 && (
            <>
              <li className="pt-4 mt-4 border-t border-gray-800">
                <h3 className="text-xs uppercase text-gray-600 font-bold px-4 py-2">Admin</h3>
              </li>
              {adminItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                      style={isActive ? { backgroundColor: '#FF6600' } : {}}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-red-600/20 transition-all duration-300"
        >
          <span className="text-xl">🚪</span>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
