import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import recipeService from '../services/recipeService';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await recipeService.getAllRecipes();
      setRecipes(response.recipes || []);
    } catch (err) {
      setError('Failed to load your recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (recipeId) => {
    setFavorites(prev =>
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="relative overflow-hidden py-14 mb-6" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(15,15,15,0) 60%)' }}>
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A3D)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>My Recipes</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Manage your created recipes</p>
        </div>
      </div>

      <div className="container-custom pb-16">
        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl mb-8 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.08)' }}>
              <svg className="w-10 h-10" style={{ color: '#FF6B00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
            </div>
            <p className="text-xl font-semibold text-white mb-2">No recipes yet</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Start creating delicious recipes!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe, index) => (
              <div key={recipe._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <RecipeCard
                  recipe={recipe}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.includes(recipe._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
