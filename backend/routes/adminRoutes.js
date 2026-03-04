import express from 'express';
import {
  getAllRecipes,
  getAllUsers,
  adminDeleteRecipe,
  adminUpdateRecipe,
  getDashboardStats,
  changeUserRole,
} from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// All admin routes are protected and require admin role
router.use(authMiddleware, adminMiddleware);

// Dashboard stats
router.get('/stats', getDashboardStats);

// Get all recipes and users
router.get('/recipes', getAllRecipes);
router.get('/users', getAllUsers);

// Admin recipe management
router.put('/recipes/:id', adminUpdateRecipe);
router.delete('/recipes/:id', adminDeleteRecipe);

// Change user role
router.put('/users/:userId/role', changeUserRole);

export default router;
