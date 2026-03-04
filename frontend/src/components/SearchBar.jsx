import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-300" style={{ color: focused ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="pl-10 pr-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all duration-300 w-52 focus:w-72"
          style={{
            color: 'var(--color-text)',
            background: focused ? 'var(--color-surface)' : 'var(--color-card)',
            border: focused ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
            boxShadow: focused ? 'var(--shadow-glow-cyan)' : 'none',
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;