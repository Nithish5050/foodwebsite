import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import api from '../../services/api';

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/recipes');
      setRecipes(response.data.recipes);
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await api.delete(`/admin/recipes/${recipeId}`);
      setRecipes(recipes.filter(r => r._id !== recipeId));
    } catch (err) {
      setError('Failed to delete recipe');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="section-title">📚 Manage Recipes</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No recipes found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Created By</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map(recipe => (
                  <tr key={recipe._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{recipe.title}</td>
                    <td className="px-6 py-4">{recipe.category}</td>
                    <td className="px-6 py-4">{recipe.createdBy?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/recipe/${recipe._id}`)}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/admin/edit-recipe/${recipe._id}`)}
                        className="text-green-500 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(recipe._id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRecipes;
