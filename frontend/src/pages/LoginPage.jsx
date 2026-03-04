import { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      const success = onLogin(username, password);
      if (!success) {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Content */}
      <div className="login-container">
        {/* Login Card */}
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue to Recipe Haven</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
              <div className="button-glow"></div>
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="demo-hint">
            <p>Demo Credentials:</p>
            <p>Username: <strong>Ragavi</strong></p>
            <p>Password: <strong>ragavipon</strong></p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="floating-icons">
          <span className="floating-icon icon-1">🍕</span>
          <span className="floating-icon icon-2">🍰</span>
          <span className="floating-icon icon-3">🥗</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
