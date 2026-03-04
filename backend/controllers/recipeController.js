import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

// Get all recipes (with search and category filter)
export const getRecipes = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Filter by category if provided
    if (category && (category === 'Veg' || category === 'Non-Veg')) {
      query.category = category;
    }

    // Search by title or ingredients
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } },
      ];
    }

    const recipes = await Recipe.find(query)
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

// Get single recipe by ID
export const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new recipe
export const createRecipe = async (req, res, next) => {
  try {
    const { title, imageUrl, ingredients, instructions, cookingTime, category, createdBy } =
      req.body;

    // Validation
    if (!title || !imageUrl || !ingredients || !instructions || !cookingTime || !category) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Ingredients must be an array with at least one item',
      });
    }

    if (category !== 'Veg' && category !== 'Non-Veg') {
      return res.status(400).json({
        success: false,
        message: 'Category must be either Veg or Non-Veg',
      });
    }

    // Create recipe with createdBy from request body or use a default user ID
    const recipe = await Recipe.create({
      title,
      imageUrl,
      ingredients,
      instructions,
      cookingTime,
      category,
      createdBy: createdBy || '507f1f77bcf86cd799439011',
    });

    await recipe.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update recipe
export const updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    // Check if user is owner or admin
    if (recipe.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this recipe',
      });
    }

    // Update recipe
    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res, next) => {
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
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add recipe to favorites
export const addToFavorites = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    const user = await User.findById(req.user.id);

    // Check if already in favorites
    if (user.favorites.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Recipe already in favorites',
      });
    }

    user.favorites.push(req.params.id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Recipe added to favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove recipe from favorites
export const removeFromFavorites = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Recipe not in favorites',
      });
    }

    user.favorites = user.favorites.filter(fav => fav.toString() !== req.params.id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's favorite recipes
export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'favorites',
      populate: { path: 'createdBy', select: 'name email' },
    });

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
