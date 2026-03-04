# 🍽️ Food Recipe MERN App - Frontend

A beautiful, modern React frontend for a Food Recipe application built with Vite, Tailwind CSS, and Axios.

## 📋 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **User Authentication**: Register and login with JWT tokens
- **Recipe Browsing**: Browse vegetarian and non-vegetarian recipes
- **Search Functionality**: Search recipes by name and ingredients
- **Favorites**: Add/remove recipes from your favorites
- **Recipe Details**: View detailed recipes with ingredients and instructions
- **Add Recipes**: Logged-in users can add their own recipes
- **Admin Panel**: Full admin dashboard for managing recipes and users
- **Modern UI**: Beautiful UI built with Tailwind CSS
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - CSS framework
- **JavaScript ES6+** - Modern JavaScript

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🔧 Installation

1. **Navigate to frontend directory**
   ```bash
   cd recipe-app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Edit .env file
   VITE_API_URL=http://localhost:5000/api
   ```

## 🏃 Running the Application

**Development mode** (with hot reload)
```bash
npm run dev
```

The application will open at `http://localhost:3000`

**Build for production**
```bash
npm run build
```

**Preview production build**
```bash
npm run preview
```

## 📚 Project Structure

```
frontend/
├── public/                  # Static files
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── RecipeCard.jsx  # Recipe card component
│   │   ├── SearchBar.jsx   # Search functionality
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── Loader.jsx      # Loading spinner
│   ├── pages/
│   │   ├── Home.jsx        # Home page
│   │   ├── Veg.jsx         # Vegetarian recipes
│   │   ├── NonVeg.jsx      # Non-vegetarian recipes
│   │   ├── Favorites.jsx   # Favorite recipes
│   │   ├── AddRecipe.jsx   # Add new recipe
│   │   ├── RecipeDetails.jsx # Recipe details
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Register page
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageRecipes.jsx
│   │       └── EditRecipe.jsx
│   ├── context/
│   │   └── AuthContext.jsx # Authentication context
│   ├── services/
│   │   ├── api.js          # Axios instance
│   │   ├── authService.js  # Auth API calls
│   │   └── recipeService.js # Recipe API calls
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env                    # Environment variables
```

## 🎨 Pages & Features

### Public Pages

1. **Home** (`/`)
   - Display all recipes
   - Search functionality
   - Filter by category

2. **Vegetarian** (`/veg`)
   - Show only vegetarian recipes
   - Filter by cooking time

3. **Non-Vegetarian** (`/non-veg`)
   - Show only non-vegetarian recipes
   - Filter options

4. **Recipe Details** (`/recipe/:id`)
   - Full recipe information
   - Ingredients list
   - Step-by-step instructions
   - Add to favorites option

5. **Login** (`/login`)
   - User authentication
   - Error messages

6. **Register** (`/register`)
   - New user registration
   - Form validation

### Protected Pages (Requires Login)

7. **Favorites** (`/favorites`)
   - View all favorite recipes
   - Remove from favorites

8. **Add Recipe** (`/add-recipe`)
   - Create new recipe form
   - Upload to database

### Admin Pages (Requires Admin Role)

9. **Admin Dashboard** (`/admin/dashboard`)
   - View statistics
   - Quick links to management pages

10. **Manage Recipes** (`/admin/manage-recipes`)
    - View all recipes in table format
    - Edit any recipe
    - Delete any recipe

11. **Edit Recipe** (`/admin/edit-recipe/:id`)
    - Modify recipe details
    - Update ingredients and instructions

## 🔐 Authentication

- JWT tokens stored in localStorage
- Automatic token attachment to requests
- Token refresh on page reload
- Logout clears token and redirects

### User Roles

- **User**: Can create recipes, add favorites
- **Admin**: Full access to all features and management

## 🎯 User Flow

```
Landing Page
    ↓
Login/Register (if not authenticated)
    ↓
Browse Recipes
    ↓
View Details
    ↓
Add to Favorites
    ↓
Create Own Recipe
    ↓
Admin Panel (if admin)
```

## 🛠️ Component Usage

### Protected Route
```jsx
<Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>
```

### Using Auth Context
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  // Use auth context
}
```

### API Calls
```jsx
import recipeService from './services/recipeService';

// Get recipes
const { recipes } = await recipeService.getAllRecipes();

// Create recipe
await recipeService.createRecipe(recipeData);

// Search
await recipeService.searchRecipes(query);
```

## 🎨 UI Features

- **Responsive Grid Layout**: Adapts to screen size
- **Smooth Hover Effects**: Interactive elements
- **Loading States**: Show loading spinners
- **Error Messages**: Clear error feedback
- **Success Messages**: Confirmation of actions
- **Modal Confirmations**: Delete confirmations

## 🌈 Tailwind CSS Customization

Custom colors defined in `tailwind.config.js`:

```javascript
colors: {
  primary: "#FF6B35",      // Orange
  secondary: "#004E89",    // Dark Blue
  accent: "#F7B801",       // Yellow
}
```

## 🔄 State Management

- **React Context API** for authentication
- **useState** for component state
- **localStorage** for persistent data

## 🌐 API Integration

The frontend communicates with the backend via:

- **Base URL**: `http://localhost:5000/api`
- **Headers**: Includes JWT token in Authorization header
- **Error Handling**: Automatic redirect on 401 (unauthorized)

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 3+ column grid

## 🧪 Testing

Test the application with:

1. **Register a new account**
2. **Login with credentials**
3. **Browse recipes**
4. **Add recipes to favorites**
5. **Search for recipes**
6. **Create a new recipe** (if admin)
7. **Edit/Delete recipes** (if admin)

## 🛠️ Troubleshooting

### "API_URL is undefined"
- Ensure `.env` file has `VITE_API_URL`
- Restart dev server after changing `.env`

### "Cannot find module"
- Run `npm install` to install all dependencies
- Check import paths are correct

### Backend Connection Error
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Check CORS is enabled in backend

### Login Issues
- Verify user exists in database
- Check password is correct
- Clear localStorage and try again

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### Environment Variables for Production
```
VITE_API_URL=https://your-backend-api.com/api
```

## 📦 Dependencies

- **react**: ^18.2.0 - UI library
- **react-dom**: ^18.2.0 - DOM rendering
- **react-router-dom**: ^6.12.0 - Routing
- **axios**: ^1.4.0 - HTTP client
- **tailwindcss**: ^3.3.0 - CSS framework

## 📝 Code Quality

- Clean, readable code with comments
- Proper error handling
- Responsive design
- Accessibility considerations

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
