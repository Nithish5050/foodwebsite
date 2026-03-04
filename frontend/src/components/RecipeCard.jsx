import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import recipeService from '../services/recipeService';

const RecipeCard = ({ recipe, onFavoriteToggle, isFavorite }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleViewDetails = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await recipeService.removeFromFavorites(recipe._id);
      } else {
        await recipeService.addToFavorites(recipe._id);
      }
      onFavoriteToggle(recipe._id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="group relative rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-400 cursor-pointer card"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        {!imgError ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--color-surface)' }}>
            <svg className="w-16 h-16" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${recipe.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'} flex items-center gap-1.5`}>
            {recipe.category === 'Veg' ? '🌿 VEG' : '🍖 NON-VEG'}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          disabled={loading}
          className={`absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isFavorite
              ? 'text-red-400 scale-100'
              : 'text-white/80'
          }`}
          style={{
            background: isFavorite 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.15))'
              : 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: isFavorite ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255,255,255,0.15)',
            boxShadow: isFavorite ? '0 4px 15px rgba(239, 68, 68, 0.3)' : 'none',
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Cooking Time - Bottom of image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
          style={{ 
            background: 'var(--gradient-primary)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{recipe.cookingTime} min</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-snug transition-all duration-300" style={{ color: 'var(--color-text)', fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {recipe.title}
          </span>
        </h3>

        {/* Author */}
        <div className="flex items-center gap-3 mt-auto pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'var(--gradient-accent)' }}
          >
            {recipe.createdBy?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate font-medium" style={{ color: 'var(--color-text-muted)' }}>
              {recipe.createdBy?.name || 'Unknown Chef'}
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 group-hover:scale-105"
            style={{
              color: 'white',
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-glow-cyan)',
            }}
          >
            View
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
