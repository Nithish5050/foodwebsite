import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import recipeService from '../services/recipeService';

const NonVeg = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNonVegRecipes();
  }, []);

  const fetchNonVegRecipes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await recipeService.getRecipesByCategory('Non-Veg');
      setRecipes(response.recipes || []);
    } catch (err) {
      setError('Failed to load non-vegetarian recipes');
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
      <div className="relative overflow-hidden py-14 mb-6" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(15,15,15,0) 60%)' }}>
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Non-Veg Recipes</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Savor the richness of meat, poultry and seafood dishes</p>
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
            <p className="text-xl font-semibold text-white mb-2">No non-veg recipes found</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Check back later for new recipes!</p>
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

export default NonVeg;
