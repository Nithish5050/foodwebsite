import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import recipeService from '../services/recipeService';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await recipeService.getFavorites();
      setFavorites(response.favorites || []);
    } catch (err) {
      setError('Failed to load favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (recipeId) => {
    setFavorites(prev => prev.filter(recipe => recipe._id !== recipeId));
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-secondary)' }}>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, var(--color-primary-rgb) 0%, transparent 70%)', opacity: '0.08' }}></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, var(--color-accent-rgb) 0%, transparent 70%)', opacity: '0.06' }}></div>
      </div>

      <div className="relative overflow-hidden py-16 mb-8">
        {/* Gradient Background */}
        <div className="absolute inset-0" style={{ background: 'var(--gradient-primary)', opacity: '0.06' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-primary)', opacity: '0.3' }}></div>
        
        <div className="container-custom relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--shadow-glow-orange)' }}>
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text)' }}>My Favorites</h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Your personally curated collection of recipes you love</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom pb-16 relative">
        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-8 text-sm" style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#FB7185' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <svg className="w-12 h-12" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <p className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)', fontFamily: 'Space Grotesk, sans-serif' }}>No favorites yet</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Start exploring and save recipes you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {favorites.map((recipe, index) => (
              <div key={recipe._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.06}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <RecipeCard
                  recipe={recipe}
                  onFavoriteToggle={() => handleRemoveFavorite(recipe._id)}
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
