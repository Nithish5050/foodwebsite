import api from './api';

export const recipeService = {
  // Get all recipes
  getAllRecipes: async (search = '', category = '') => {
    try {
      const response = await api.get('/recipes', {
        params: {
          search,
          category,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single recipe
  getRecipeById: async (id) => {
    try {
      const response = await api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create recipe
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update recipe
  updateRecipe: async (id, recipeData) => {
    try {
      const response = await api.put(`/recipes/${id}`, recipeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete recipe
  deleteRecipe: async (id) => {
    try {
      const response = await api.delete(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Add to favorites
  addToFavorites: async (recipeId) => {
    try {
      const response = await api.put(`/recipes/${recipeId}/favorite`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Remove from favorites
  removeFromFavorites: async (recipeId) => {
    try {
      const response = await api.delete(`/recipes/${recipeId}/favorite`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user favorites
  getFavorites: async () => {
    try {
      const response = await api.get('/recipes/user/favorites');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Search recipes
  searchRecipes: async (query) => {
    try {
      const response = await api.get('/recipes', {
        params: { search: query },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get recipes by category
  getRecipesByCategory: async (category) => {
    try {
      const response = await api.get('/recipes', {
        params: { category },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default recipeService;
