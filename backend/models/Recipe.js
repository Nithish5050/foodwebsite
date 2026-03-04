import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a recipe title'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Please provide ingredients'],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'At least one ingredient is required',
      },
    },
    instructions: {
      type: String,
      required: [true, 'Please provide cooking instructions'],
      minlength: [10, 'Instructions must be at least 10 characters long'],
    },
    cookingTime: {
      type: Number,
      required: [true, 'Please provide cooking time in minutes'],
      min: [1, 'Cooking time must be at least 1 minute'],
    },
    category: {
      type: String,
      enum: ['Veg', 'Non-Veg'],
      required: [true, 'Please specify category as Veg or Non-Veg'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Recipe', recipeSchema);
