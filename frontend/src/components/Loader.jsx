import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-[-8px] rounded-3xl opacity-50" style={{ background: 'var(--gradient-primary)', filter: 'blur(15px)', animation: 'pulse-glow 2s infinite' }}></div>
          
          <div className="relative w-16 h-16 rounded-3xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-cyan)' }}>
            <svg className="w-8 h-8 text-white" style={{ animation: 'spin-slow 3s linear infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-glow-cyan)', animationDelay: '0s' }}></div>
          <div className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ background: 'var(--gradient-primary)', animationDelay: '0.15s' }}></div>
          <div className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow-orange)', animationDelay: '0.3s' }}></div>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Loading recipes...</p>
      </div>
    </div>
  );
};

export default Loader;
