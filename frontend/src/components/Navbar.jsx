import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>)},
    { path: '/veg', label: 'Veg', icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>)},
    { path: '/non-veg', label: 'Non-Veg', icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>)},
  ];

  const authLinks = isAuthenticated ? [
    { path: '/favorites', label: 'Favorites', icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>)},
    { path: '/add-recipe', label: 'Add Recipe', icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>)},
  ] : [];

  const allLinks = [...navLinks, ...authLinks];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
      style={{
        background: `${scrolled ? 'var(--glass-bg)' : 'rgba(' + (isDark ? '12, 17, 22, 0.7' : '255, 255, 255, 0.7') + ')'}`,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid var(--color-border-hover)' : '1px solid var(--color-border)',
        boxShadow: scrolled ? 'var(--shadow-card)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-glow-cyan)'
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span style={{ color: 'var(--color-text)' }}>Recipe</span>
            <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>App</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 p-1.5 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {allLinks.map(link => {
              const active = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300`}
                  style={active ? {
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-glow-cyan)'
                  } : {
                    color: 'var(--color-text-muted)'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'var(--color-surface-light)';
                      e.currentTarget.style.color = 'var(--color-text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                    }
                  }}
                >
                  {link.icon} <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side: Theme Toggle + Search + Auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <SearchBar />
          
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-2xl transition-all duration-300" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-light)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--shadow-glow-orange)' }}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{user?.name?.split(' ')[0]}</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden py-2 animate-fade-in-up"
                  style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card-hover)' }}>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface-light)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-200" style={{ color: '#EF4444' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-5 py-2.5 text-sm font-medium rounded-2xl transition-all duration-300" style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >Log In</Link>
              <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-white rounded-2xl transition-all duration-300" style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-cyan)' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          {isMenuOpen ? (
            <svg className="w-5 h-5" style={{ color: 'var(--color-text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" style={{ color: 'var(--color-text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;