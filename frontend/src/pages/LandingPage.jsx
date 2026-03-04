import { useState, useEffect } from 'react';

function LandingPage({ onGetStarted }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Content */}
      <div className={`landing-content ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-section">
          {/* Logo/Icon with Enhanced Animation */}
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <div className="logo-icon">🍳</div>
              <div className="logo-ring"></div>
              <div className="logo-ring-2"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            <span className="gradient-text">Culinary</span> 
            <span className="gradient-text-alt"> Sanctuary</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Where Every Recipe Tells a Delicious Story
          </p>
          <p className="hero-tagline">
            Discover • Create • Share • Savor
          </p>

          {/* Features */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-bg">
                <div className="feature-icon">📖</div>
              </div>
              <h3>Endless Discovery</h3>
              <p>Explore a world of culinary delights</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-bg">
                <div className="feature-icon">✨</div>
              </div>
              <h3>Share Your Magic</h3>
              <p>Showcase your culinary masterpieces</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-bg">
                <div className="feature-icon">💜</div>
              </div>
              <h3>Curate Favorites</h3>
              <p>Keep your beloved recipes close</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="cta-button" onClick={onGetStarted}>
            <span>Begin Your Journey</span>
            <div className="button-glow"></div>
            <div className="button-sparkle"></div>
          </button>

          {/* Floating Food Icons */}
          <div className="floating-icons">
            <span className="floating-icon icon-1">🍕</span>
            <span className="floating-icon icon-2">🍰</span>
            <span className="floating-icon icon-3">🥗</span>
            <span className="floating-icon icon-4">🍜</span>
            <span className="floating-icon icon-5">🌮</span>
            <span className="floating-icon icon-6">🍱</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
