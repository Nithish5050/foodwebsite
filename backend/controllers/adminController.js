import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

// Get all recipes (admin view)
export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users (admin view)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete any recipe (admin only)
export const adminDeleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    // Remove recipe from all users' favorites
    await User.updateMany({ favorites: req.params.id }, { $pull: { favorites: req.params.id } });

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully by admin',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update any recipe (admin only)
export const adminUpdateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully by admin',
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalRecipes = await Recipe.countDocuments();
    const totalUsers = await User.countDocuments();
    const veggieRecipes = await Recipe.countDocuments({ category: 'Veg' });
    const nonVeggieRecipes = await Recipe.countDocuments({ category: 'Non-Veg' });

    res.status(200).json({
      success: true,
      stats: {
        totalRecipes,
        totalUsers,
        veggieRecipes,
        nonVeggieRecipes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change user role (admin only)
export const changeUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: 'User ID and role are required',
      });
    }

    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Role must be either user or admin',
      });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
