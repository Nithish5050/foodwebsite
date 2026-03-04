import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeService from '../services/recipeService';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    category: 'Veg',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ingredients = formData.ingredients
        .split('\n')
        .map(ing => ing.trim())
        .filter(ing => ing);

      if (ingredients.length === 0) {
        setError('Please add at least one ingredient');
        setLoading(false);
        return;
      }

      const recipeData = {
        ...formData,
        ingredients,
        cookingTime: parseInt(formData.cookingTime),
      };

      const response = await recipeService.createRecipe(recipeData);

      if (response.success) {
        navigate('/');
      } else {
        setError(response.message || 'Failed to create recipe');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <div className="relative overflow-hidden py-14 mb-6" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(15,15,15,0) 60%)' }}>
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A3D)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Add Recipe</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Share your culinary creation with the community</p>
        </div>
      </div>

      <div className="container-custom max-w-3xl pb-16">
        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl mb-8 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <div className="rounded-2xl p-8" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Recipe Title <span style={{ color: '#FF6B00' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter recipe name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Image URL <span style={{ color: '#FF6B00' }}>*</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-3 rounded-xl overflow-hidden h-40" style={{ border: '1px solid var(--color-border)' }}>
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Ingredients <span style={{ color: '#FF6B00' }}>*</span>
                <span className="text-xs font-normal text-gray-500 ml-2">(one per line)</span>
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                className="input-field h-40 resize-none"
                placeholder={"1 cup flour\n2 eggs\n1/2 cup sugar\n..."}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Instructions <span style={{ color: '#FF6B00' }}>*</span>
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
                className="input-field h-40 resize-none"
                placeholder="Describe the cooking steps in detail..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Cooking Time <span style={{ color: '#FF6B00' }}>*</span>
                  <span className="text-xs font-normal text-gray-500 ml-2">(minutes)</span>
                </label>
                <input
                  type="number"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input-field"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category <span style={{ color: '#FF6B00' }}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Creating...
                </span>
              ) : 'Create Recipe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
