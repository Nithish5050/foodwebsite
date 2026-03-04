import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from '../../services/recipeService';
import Loader from '../../components/Loader';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    category: 'Veg',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await recipeService.getRecipeById(id);
      const recipe = response.recipe;
      setFormData({
        title: recipe.title,
        imageUrl: recipe.imageUrl,
        ingredients: recipe.ingredients.join('\n'),
        instructions: recipe.instructions,
        cookingTime: recipe.cookingTime.toString(),
        category: recipe.category,
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load recipe');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const ingredients = formData.ingredients
        .split('\n')
        .map(ing => ing.trim())
        .filter(ing => ing);

      if (ingredients.length === 0) {
        setError('Please add at least one ingredient');
        setSubmitting(false);
        return;
      }

      const recipeData = {
        ...formData,
        ingredients,
        cookingTime: parseInt(formData.cookingTime),
      };

      const response = await recipeService.updateRecipe(id, recipeData);
      if (response.success) {
        navigate(`/recipe/${id}`);
      } else {
        setError(response.message || 'Failed to update recipe');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update recipe');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-2xl">
        <h1 className="section-title">✏️ Edit Recipe</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ingredients (one per line)
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                className="input-field h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instructions
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
                className="input-field h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cooking Time (minutes)
              </label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                required
                min="1"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
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

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {submitting ? 'Updating...' : 'Update Recipe'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
