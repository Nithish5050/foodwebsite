import { useState, useEffect } from 'react';
import axios from 'axios';

// Use production API URL when deployed, localhost for development
const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-url.onrender.com/api'  // Replace with your Render backend URL after deployment
  : 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

console.log('API URL:', API_URL); // For debugging

function Dashboard({ onLogout }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // New Recipe Form
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    imageUrl: '',
    ingredients: [''],
    instructions: '',
    cookingTime: '',
    category: 'Veg'
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on category and search
    let filtered = recipes;
    
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(recipe => recipe.category === categoryFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRecipes(filtered);
  }, [recipes, categoryFilter, searchTerm]);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const fetchRecipes = async () => {
    try {
      console.log('Fetching recipes from:', `${API_URL}/recipes`);
      const response = await api.get('/recipes');
      console.log('Response:', response.data);
      
      // Extract recipes from response - handle different response structures
      let recipeData = [];
      if (Array.isArray(response.data)) {
        recipeData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        recipeData = response.data.data;
      } else if (response.data.recipes && Array.isArray(response.data.recipes)) {
        recipeData = response.data.recipes;
      }
      
      console.log('Recipe data (array):', recipeData);
      setRecipes(recipeData);
      setFilteredRecipes(recipeData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error.response || error);
      setRecipes([]);
      setFilteredRecipes([]);
      setLoading(false);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty ingredients
      const filteredIngredients = newRecipe.ingredients.filter(ing => ing.trim() !== '');
      
      const recipeData = {
        ...newRecipe,
        ingredients: filteredIngredients,
        createdBy: '507f1f77bcf86cd799439011' // Demo user ID
      };
      
      console.log('Adding recipe:', recipeData);
      await api.post('/recipes', recipeData);
      
      // Reset form and close modal
      setNewRecipe({
        title: '',
        imageUrl: '',
        ingredients: [''],
        instructions: '',
        cookingTime: '',
        category: 'Veg'
      });
      setShowAddModal(false);
      
      // Refresh recipes
      fetchRecipes();
    } catch (error) {
      console.error('Error adding recipe:', error.response || error);
      alert('Error adding recipe. Please try again.');
    }
  };

  const handleDeleteRecipe = async (recipeId, recipeName) => {
    if (window.confirm(`Are you sure you want to delete "${recipeName}"?`)) {
      try {
        await api.delete(`/recipes/${recipeId}`);
        // Refresh recipes
        fetchRecipes();
        // Close detail modal if open
        setSelectedRecipe(null);
      } catch (error) {
        console.error('Error deleting recipe:', error.response || error);
        alert('Error deleting recipe. Please try again.');
      }
    }
  };

  const addIngredientField = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, '']
    });
  };

  const updateIngredient = (index, value) => {
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients[index] = value;
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index);
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'} ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <h1 className="header-title">
            <span className="gradient-text">Recipe</span> Dashboard
          </h1>
        </div>
        
        <div className="header-right">
          <button className="icon-button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div className="user-profile">
            <span className="user-avatar">R</span>
            <span className="user-name">Ragavi</span>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-main">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <button className="nav-item active">
              <span className="nav-icon">📖</span>
              <span className="nav-text">All Recipes</span>
            </button>
            <button className="nav-item" onClick={() => setCategoryFilter('Veg')}>
              <span className="nav-icon">🥗</span>
              <span className="nav-text">Vegetarian</span>
            </button>
            <button className="nav-item" onClick={() => setCategoryFilter('Non-Veg')}>
              <span className="nav-icon">🍗</span>
              <span className="nav-text">Non-Veg</span>
            </button>
            <button className="nav-item" onClick={() => setCategoryFilter('All')}>
              <span className="nav-icon">🌟</span>
              <span className="nav-text">Show All</span>
            </button>
            <div className="nav-divider"></div>
            <button className="nav-item add-recipe-btn" onClick={() => setShowAddModal(true)}>
              <span className="nav-icon">➕</span>
              <span className="nav-text">Add Recipe</span>
            </button>
          </nav>

          {/* Sidebar Stats */}
          <div className="sidebar-stats">
            <div className="stat-card">
              <div className="stat-number">{Array.isArray(recipes) ? recipes.length : 0}</div>
              <div className="stat-label">Total Recipes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Array.isArray(recipes) ? recipes.filter(r => r.category === 'Veg').length : 0}</div>
              <div className="stat-label">Vegetarian</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Array.isArray(recipes) ? recipes.filter(r => r.category === 'Non-Veg').length : 0}</div>
              <div className="stat-label">Non-Veg</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {/* Search Bar */}
          <div className="content-header">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-chips">
              <button 
                className={`filter-chip ${categoryFilter === 'All' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('All')}
              >
                All
              </button>
              <button 
                className={`filter-chip ${categoryFilter === 'Veg' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('Veg')}
              >
                🥗 Veg
              </button>
              <button 
                className={`filter-chip ${categoryFilter === 'Non-Veg' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('Non-Veg')}
              >
                🍗 Non-Veg
              </button>
            </div>
          </div>

          {/* Recipes Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner-large"></div>
              <p>Loading delicious recipes...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍳</div>
              <h3>No recipes found</h3>
              <p>Try adjusting your filters or add a new recipe!</p>
              <button className="cta-button" onClick={() => setShowAddModal(true)}>
                Add Recipe
              </button>
            </div>
          ) : (
            <div className="recipes-grid">
              {filteredRecipes.map((recipe) => (
                <div 
                  key={recipe._id} 
                  className="recipe-card"
                >
                  <div className="recipe-image-container">
                    <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" onClick={() => setSelectedRecipe(recipe)} />
                    <div className="recipe-category-badge">
                      {recipe.category === 'Veg' ? '🥗' : '🍗'} {recipe.category}
                    </div>
                    <button 
                      className="recipe-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecipe(recipe._id, recipe.title);
                      }}
                      title="Delete recipe"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="recipe-info" onClick={() => setSelectedRecipe(recipe)}>
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <div className="recipe-meta">
                      <span className="recipe-time">
                        ⏱️ {recipe.cookingTime} min
                      </span>
                      <span className="recipe-ingredients">
                        📝 {recipe.ingredients.length} ingredients
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>



      {/* Add Recipe Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Recipe</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddRecipe} className="add-recipe-form">
              <div className="form-group">
                <label>Recipe Title</label>
                <input
                  type="text"
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  placeholder="e.g., Delicious Chocolate Cake"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={newRecipe.imageUrl}
                  onChange={(e) => setNewRecipe({ ...newRecipe, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={newRecipe.category}
                  onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Veg">🥗 Vegetarian</option>
                  <option value="Non-Veg">🍗 Non-Vegetarian</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cooking Time (minutes)</label>
                <input
                  type="number"
                  value={newRecipe.cookingTime}
                  onChange={(e) => setNewRecipe({ ...newRecipe, cookingTime: e.target.value })}
                  placeholder="30"
                  required
                  min="1"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                {newRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-input-group">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      required
                      className="form-input"
                    />
                    {newRecipe.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addIngredientField} className="add-ingredient-btn">
                  + Add Ingredient
                </button>
              </div>

              <div className="form-group">
                <label>Instructions</label>
                <textarea
                  value={newRecipe.instructions}
                  onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                  placeholder="Step-by-step cooking instructions..."
                  required
                  rows="5"
                  className="form-textarea"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content recipe-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedRecipe(null)}>✕</button>
            <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="recipe-detail-image" />
            <div className="recipe-detail-content">
              <div className="recipe-detail-header">
                <h2>{selectedRecipe.title}</h2>
                <span className="category-badge">
                  {selectedRecipe.category === 'Veg' ? '🥗' : '🍗'} {selectedRecipe.category}
                </span>
              </div>
              <div className="recipe-detail-meta">
                <span>⏱️ {selectedRecipe.cookingTime} minutes</span>
                <span>📝 {selectedRecipe.ingredients.length} ingredients</span>
              </div>
              <div className="recipe-section">
                <h3>Ingredients</h3>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div className="recipe-section">
                <h3>Instructions</h3>
                <p className="instructions-text">{selectedRecipe.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
