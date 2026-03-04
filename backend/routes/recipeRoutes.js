import express from 'express';
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from '../controllers/recipeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all recipes (public) and create new recipe (public for demo)
router.get('/', getRecipes);
router.post('/', createRecipe);

// Get single recipe
router.get('/:id', getRecipeById);

// Update and delete recipe (public for demo)
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

// Favorites
router.put('/:id/favorite', authMiddleware, addToFavorites);
router.delete('/:id/favorite', authMiddleware, removeFromFavorites);
router.get('/user/favorites', authMiddleware, getFavorites);

export default router;
