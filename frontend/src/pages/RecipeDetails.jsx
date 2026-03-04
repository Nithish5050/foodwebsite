import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import recipeService from '../services/recipeService';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await recipeService.getRecipeById(id);
      setRecipe(response.recipe);
    } catch (err) {
      setError('Failed to load recipe details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await recipeService.deleteRecipe(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete recipe');
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await recipeService.removeFromFavorites(id);
      } else {
        await recipeService.addToFavorites(id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  if (loading) return <Loader />;

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.08)' }}>
            <svg className="w-10 h-10" style={{ color: '#FF6B00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-xl font-semibold text-white mb-2">Recipe not found</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-4">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user?._id === recipe.createdBy?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="container-custom py-8 pb-16">
        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl mb-8 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>

          <div className="rounded-2xl overflow-hidden animate-fade-in-up" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
            {/* Hero Image */}
            <div className="h-80 sm:h-96 overflow-hidden relative">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Recipe+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={recipe.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'}>
                        {recipe.category}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-white" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {recipe.cookingTime} min
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {recipe.title}
                    </h1>
                  </div>
                  <button
                    onClick={handleFavoriteToggle}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isFavorite ? 'text-red-400' : 'text-white/70 hover:text-red-400'
                    }`}
                    style={{
                      background: isFavorite ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: isFavorite ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Author */}
              <div className="flex items-center gap-3 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A3D)' }}>
                  {recipe.createdBy?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{recipe.createdBy?.name || 'Unknown'}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Recipe Creator</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#FF6B00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  </div>
                  Ingredients
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FF6B00' }}></div>
                      <span className="text-gray-300">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#FF6B00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                  </div>
                  Instructions
                </h2>
                <div className="rounded-xl p-6 text-gray-300 leading-relaxed whitespace-pre-wrap text-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', lineHeight: '1.8' }}>
                  {recipe.instructions}
                </div>
              </div>

              {/* Action Buttons */}
              {(isOwner || isAdmin) && (
                <div className="flex gap-3 pt-6 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <button onClick={() => navigate(`/recipe/${id}/edit`)} className="btn-primary flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit Recipe
                  </button>
                  <button onClick={handleDelete} className="btn-danger flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
