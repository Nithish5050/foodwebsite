import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import recipeService from '../services/recipeService';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchRecipes();
  }, [searchParams]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError('');
      const search = searchParams.get('search') || '';
      const response = await recipeService.getAllRecipes(search);
      setRecipes(response.recipes || []);
    } catch (err) {
      setError('Failed to load recipes');
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

  const searchQuery = searchParams.get('search');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-secondary)' }}>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, var(--color-primary-rgb) 0%, transparent 60%)', opacity: '0.1' }}></div>
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--color-accent-rgb) 0%, transparent 60%)', opacity: '0.08' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, var(--color-primary-rgb) 0%, transparent 60%)', opacity: '0.06' }}></div>
      </div>

      {/* Hero Section */}
      {!searchQuery && (
        <div className="relative overflow-hidden py-20 mb-10">
          {/* Hero Background */}
          <div className="absolute inset-0" style={{ background: 'var(--gradient-primary)', opacity: '0.08' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-primary)', opacity: '0.4' }}></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span style={{ color: 'var(--color-text)' }}>Discover </span>
                <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Delicious</span>
                <span style={{ color: 'var(--color-text)' }}> Recipes</span>
              </h1>
              <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
                Explore a curated collection of homemade recipes from food lovers around the world.
              </p>
              <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <span><strong style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{recipes.length}</strong> <span style={{ color: 'var(--color-text-muted)' }}>Recipes</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-custom pb-16 relative">
        {searchQuery && (
          <div className="mb-10">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span style={{ color: 'var(--color-text)' }}>Results for "</span>
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{searchQuery}</span>
              <span style={{ color: 'var(--color-text)' }}>"</span>
            </h2>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-8 text-sm" style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#FB7185' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <svg className="w-12 h-12" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <p className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)', fontFamily: 'Space Grotesk, sans-serif' }}>No recipes found</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Try a different search or come back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {recipes.map((recipe, index) => (
              <div key={recipe._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.06}s`, opacity: 0, animationFillMode: 'forwards' }}>
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

export default Home;
