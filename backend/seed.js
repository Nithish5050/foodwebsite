import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Recipe from './models/Recipe.js';
import connectDB from './config/db.js';

dotenv.config();

const demoRecipes = [
  // Vegetarian Recipes
  {
    title: 'Classic Margherita Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    ingredients: [
      '2 cups all-purpose flour',
      '1 tsp instant yeast',
      '1 tsp sugar',
      '2 tbsp olive oil',
      '1 cup tomato sauce',
      '200g mozzarella cheese',
      'Fresh basil leaves',
      'Salt to taste'
    ],
    instructions: 'Mix flour, yeast, sugar, and salt. Add warm water and olive oil to form dough. Knead for 10 minutes. Let it rise for 1 hour. Roll out the dough, spread tomato sauce, add mozzarella cheese. Bake at 220°C for 12-15 minutes. Top with fresh basil leaves and serve hot.',
    cookingTime: 90,
    category: 'Veg'
  },
  {
    title: 'Vegetable Stir Fry',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    ingredients: [
      '2 cups mixed vegetables (broccoli, carrots, bell peppers)',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      '3 cloves garlic, minced',
      '1 inch ginger, grated',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      'Salt and pepper to taste'
    ],
    instructions: 'Heat oil in a wok. Add garlic and ginger, stir fry for 30 seconds. Add vegetables and stir fry on high heat for 5 minutes. Mix soy sauce with cornstarch and water. Pour into the wok and toss everything together. Cook for 2 more minutes until sauce thickens. Serve hot with rice.',
    cookingTime: 20,
    category: 'Veg'
  },
  {
    title: 'Creamy Mushroom Pasta',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    ingredients: [
      '300g pasta',
      '250g mushrooms, sliced',
      '1 cup heavy cream',
      '3 cloves garlic, minced',
      '1/2 cup parmesan cheese',
      '2 tbsp butter',
      'Fresh parsley',
      'Salt and black pepper'
    ],
    instructions: 'Cook pasta according to package instructions. In a pan, melt butter and sauté garlic until fragrant. Add mushrooms and cook until golden brown. Pour in heavy cream and bring to a simmer. Add cooked pasta and parmesan cheese. Toss everything together. Season with salt and pepper. Garnish with fresh parsley.',
    cookingTime: 25,
    category: 'Veg'
  },
  {
    title: 'Caprese Salad',
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800',
    ingredients: [
      '4 large tomatoes, sliced',
      '200g fresh mozzarella, sliced',
      'Fresh basil leaves',
      '3 tbsp extra virgin olive oil',
      '2 tbsp balsamic vinegar',
      'Salt and pepper to taste'
    ],
    instructions: 'Arrange tomato and mozzarella slices alternately on a plate. Tuck basil leaves between the slices. Drizzle with olive oil and balsamic vinegar. Season with salt and freshly ground black pepper. Serve immediately.',
    cookingTime: 10,
    category: 'Veg'
  },
  {
    title: 'Paneer Tikka Masala',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
    ingredients: [
      '300g paneer, cubed',
      '2 onions, chopped',
      '3 tomatoes, pureed',
      '1 cup yogurt',
      '2 tbsp tikka masala spice',
      '1 tbsp ginger-garlic paste',
      '1/2 cup cream',
      'Fresh coriander',
      'Oil for cooking'
    ],
    instructions: 'Marinate paneer in yogurt and tikka masala for 30 minutes. Grill or pan-fry until golden. In a pan, sauté onions until golden. Add ginger-garlic paste, tomato puree, and remaining tikka masala. Cook for 10 minutes. Add cream and grilled paneer. Simmer for 5 minutes. Garnish with coriander.',
    cookingTime: 50,
    category: 'Veg'
  },
  
  // Non-Vegetarian Recipes
  {
    title: 'Grilled Chicken Breast',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
    ingredients: [
      '4 chicken breasts',
      '3 tbsp olive oil',
      '2 tbsp lemon juice',
      '4 cloves garlic, minced',
      '1 tsp paprika',
      '1 tsp dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: 'Mix olive oil, lemon juice, garlic, paprika, oregano, salt, and pepper in a bowl. Add chicken breasts and marinate for at least 30 minutes. Preheat grill to medium-high heat. Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F. Let rest for 5 minutes before serving.',
    cookingTime: 45,
    category: 'Non-Veg'
  },
  {
    title: 'Butter Chicken',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    ingredients: [
      '500g chicken, boneless',
      '3 tomatoes, pureed',
      '1 cup yogurt',
      '100g butter',
      '1 cup heavy cream',
      '2 tbsp ginger-garlic paste',
      '2 tbsp tandoori masala',
      '1 tbsp garam masala',
      'Kasuri methi (dried fenugreek)',
      'Salt to taste'
    ],
    instructions: 'Marinate chicken in yogurt and tandoori masala for 2 hours. Grill until cooked. In a pan, melt butter and sauté ginger-garlic paste. Add tomato puree and cook for 15 minutes. Add garam masala, cream, and kasuri methi. Add grilled chicken and simmer for 10 minutes. Serve with naan or rice.',
    cookingTime: 150,
    category: 'Non-Veg'
  },
  {
    title: 'Fish Tacos',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
    ingredients: [
      '500g white fish fillets',
      '8 corn tortillas',
      '1 cup shredded cabbage',
      '2 tbsp taco seasoning',
      '1 avocado, sliced',
      '1/2 cup sour cream',
      '1 lime, cut into wedges',
      'Fresh cilantro',
      'Hot sauce (optional)'
    ],
    instructions: 'Season fish with taco seasoning. Cook in a skillet with oil for 3-4 minutes per side until cooked through. Break into chunks. Warm tortillas. Assemble tacos with fish, cabbage, avocado, and sour cream. Squeeze lime juice on top. Garnish with cilantro and hot sauce if desired.',
    cookingTime: 20,
    category: 'Non-Veg'
  },
  {
    title: 'Chicken Biryani',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    ingredients: [
      '500g chicken',
      '2 cups basmati rice',
      '2 onions, sliced',
      '1 cup yogurt',
      '2 tbsp biryani masala',
      '1 tsp saffron',
      '4 tbsp ghee',
      'Fresh mint and coriander',
      'Whole spices (bay leaf, cardamom, cinnamon)',
      'Salt to taste'
    ],
    instructions: 'Marinate chicken in yogurt and biryani masala for 1 hour. Fry onions until golden. Cook rice 70% done. Layer marinated chicken, fried onions, rice, saffron milk, and herbs in a pot. Cover tightly and cook on low heat for 30 minutes (dum). Serve hot with raita.',
    cookingTime: 120,
    category: 'Non-Veg'
  },
  {
    title: 'BBQ Ribs',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ingredients: [
      '1kg pork ribs',
      '1 cup BBQ sauce',
      '2 tbsp brown sugar',
      '1 tbsp paprika',
      '1 tbsp garlic powder',
      '1 tsp black pepper',
      '1 tsp salt',
      '1 tsp cayenne pepper'
    ],
    instructions: 'Mix all dry spices to create a rub. Coat ribs generously with the rub and let sit for 1 hour. Preheat oven to 150°C. Wrap ribs in foil and bake for 2.5 hours. Remove foil, brush with BBQ sauce. Increase heat to 200°C and bake for 30 more minutes, basting with sauce every 10 minutes.',
    cookingTime: 210,
    category: 'Non-Veg'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Recipe.deleteMany({});
    await User.deleteMany({});

    // Create demo admin user
    console.log('👤 Creating demo users...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@recipe.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create demo regular user
    const regularUser = await User.create({
      name: 'Demo User',
      email: 'user@recipe.com',
      password: 'user123',
      role: 'user'
    });

    console.log('✅ Users created successfully!');
    console.log(`   Admin: admin@recipe.com / admin123`);
    console.log(`   User: user@recipe.com / user123`);

    // Add createdBy field to all recipes
    const recipesWithUser = demoRecipes.map((recipe, index) => ({
      ...recipe,
      // Alternate between admin and regular user
      createdBy: index % 2 === 0 ? adminUser._id : regularUser._id
    }));

    // Insert recipes
    console.log('\n🍳 Seeding recipes...');
    const createdRecipes = await Recipe.insertMany(recipesWithUser);

    console.log(`✅ ${createdRecipes.length} recipes created successfully!`);
    
    // Display summary
    const vegCount = createdRecipes.filter(r => r.category === 'Veg').length;
    const nonVegCount = createdRecipes.filter(r => r.category === 'Non-Veg').length;
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total Recipes: ${createdRecipes.length}`);
    console.log(`   Vegetarian: ${vegCount}`);
    console.log(`   Non-Vegetarian: ${nonVegCount}`);
    
    console.log('\n✨ Database seeded successfully!');
    console.log('\n🎉 You can now login and view the recipes!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
