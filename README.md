# 🍽️ Food Recipe MERN Stack Application

A complete, production-ready MERN (MongoDB, Express.js, React.js, Node.js) stack application for sharing and discovering food recipes.

## 🌟 Features

### Frontend Features
- ✅ Beautiful responsive UI with Tailwind CSS
- ✅ User authentication with JWT
- ✅ Browse and search recipes
- ✅ Filter by category (Veg/Non-Veg)
- ✅ Add recipes to favorites
- ✅ Create and manage personal recipes
- ✅ View detailed recipe information
- ✅ Admin dashboard for recipe management
- ✅ Mobile-friendly design

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (User/Admin)
- ✅ Recipe CRUD operations
- ✅ Search and filter functionality
- ✅ Favorites management
- ✅ Comprehensive error handling
- ✅ CORS enabled

## 📁 Project Structure

```
recipe-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env
│   └── README.md
│
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn
- Git

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd recipe-app
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI and JWT secret
nano .env

# Start MongoDB (if using local MongoDB)
mongod

# Start backend server in development mode
npm run dev
# Or for production: npm start
```

Backend will run on: **http://localhost:5000**

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with backend API URL
nano .env

# Start frontend development server
npm run dev
```

Frontend will open at: **http://localhost:3000**

## 🔧 Environment Configuration

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/recipe_app
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  favorites: [ObjectId],
  createdAt: Date
}
```

### Recipe Model
```javascript
{
  title: String,
  imageUrl: String,
  ingredients: [String],
  instructions: String,
  cookingTime: Number,
  category: String (Veg/Non-Veg),
  createdBy: ObjectId (User),
  createdAt: Date
}
```

## 🔐 Authentication Flow

1. **Register**: User creates account with email and password
2. **Login**: User provides credentials, receives JWT token
3. **Token Storage**: JWT stored in localStorage
4. **API Requests**: Token sent in Authorization header
5. **Token Validation**: Backend verifies token on protected routes
6. **Logout**: Token removed from localStorage

## 🛣️ API Routes

### Authentication
```
POST   /api/auth/register     - Create new account
POST   /api/auth/login        - Login to account
GET    /api/auth/me           - Get current user
```

### Recipes
```
GET    /api/recipes           - Get all recipes (searchable, filterable)
GET    /api/recipes/:id       - Get single recipe details
POST   /api/recipes           - Create new recipe
PUT    /api/recipes/:id       - Update recipe (owner/admin only)
DELETE /api/recipes/:id       - Delete recipe (owner/admin only)
```

### Favorites
```
PUT    /api/recipes/:id/favorite    - Add to favorites
DELETE /api/recipes/:id/favorite    - Remove from favorites
GET    /api/recipes/user/favorites  - Get user's favorites
```

### Admin
```
GET    /api/admin/stats             - Dashboard statistics
GET    /api/admin/recipes           - All recipes (admin view)
GET    /api/admin/users             - All users (admin view)
PUT    /api/admin/recipes/:id       - Edit any recipe
DELETE /api/admin/recipes/:id       - Delete any recipe
```

## 📱 User Interface Pages

### Public Pages
- **Home** - Browse all recipes with search
- **Veg** - Filter vegetarian recipes
- **Non-Veg** - Filter non-vegetarian recipes
- **Recipe Details** - Full recipe information
- **Login** - User authentication
- **Register** - Create new account

### Protected Pages (Requires Login)
- **My Favorites** - Personal favorite recipes
- **Add Recipe** - Create new recipe

### Admin Pages (Requires Admin Role)
- **Admin Dashboard** - Overall statistics
- **Manage Recipes** - View/Edit/Delete all recipes
- **Edit Recipe** - Modify recipe details

## 🎨 UI/UX Features

- **Responsive Design**: Mobile, tablet, and desktop views
- **Tailwind CSS**: Modern styling with utility classes
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Clear error messages
- **Form Validation**: Input validation before submission
- **Search Functionality**: Real-time recipe search
- **Smooth Animations**: Hover effects and transitions

## 🧪 Testing the App

### Test User Registration
1. Click "Register" button
2. Fill in Name, Email, Password
3. Click "Register"
4. Should redirect to home page

### Test Recipe Browsing
1. Navigate to Home page
2. Browse recipe cards
3. Use Search bar to find recipes
4. Click "View Details" for full recipe

### Test Favorites
1. Login to account
2. Click heart icon on recipe card
3. Verify recipe appears in Favorites page
4. Remove from favorites

### Test Admin Panel
1. Create an admin account (manually set role in database)
2. Login with admin account
3. Access "Admin" link in navbar
4. Manage recipes and users

## 🔍 Troubleshooting

### Backend Issues

**Port 5000 already in use**
```bash
# Change PORT in .env or kill process
lsof -ti:5000 | xargs kill -9
```

**MongoDB connection failed**
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env`
- For MongoDB Atlas, whitelist your IP

**JWT token errors**
- Clear localStorage in browser
- Ensure `JWT_SECRET` in `.env` is set
- Token expires after 30 days

### Frontend Issues

**Port 3000 already in use**
- Change port in `vite.config.js`
- Or kill process using port

**API connection error**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Check CORS is enabled in backend

**Images not loading**
- Verify image URLs are valid
- Check image URL format (http/https)

## 📦 Dependencies

### Backend
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- validator

### Frontend
- react
- react-dom
- react-router-dom
- axios
- tailwindcss

## 🚀 Deployment

### Deploy Backend (Heroku Example)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Vercel Example)
```bash
cd frontend
npm run build
vercel --prod
```

## 📝 Best Practices

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Keep JWT_SECRET secure
- ✅ Implement rate limiting in production
- ✅ Use MongoDB Atlas for production databases
- ✅ Add HTTPS/SSL certificates
- ✅ Enable CORS only for trusted domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support & Issues

- Check existing issues on GitHub
- Read the backend and frontend README.md files
- Check error messages in browser console
- Check backend server logs

## 🎯 Next Steps

After setup:
1. Create test recipes
2. Test all CRUD operations
3. Try search functionality
4. Test admin features
5. Deploy to production

## 📚 Learning Resources

- [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🎉 Congratulations!

You now have a fully functional MERN stack application! 

Happy coding! 🚀

---

**Made with ❤️ by Your Name**

**Last Updated**: March 4, 2026
