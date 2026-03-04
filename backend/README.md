# 🍽️ Food Recipe MERN App - Backend

A robust backend API for a Food Recipe application built with Node.js, Express, and MongoDB.

## 📋 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Recipe Management**: Full CRUD operations for recipes
- **Favorites System**: Users can add/remove recipes from favorites
- **Search & Filter**: Search by recipe name/ingredients and filter by category
- **Admin Panel**: Admin users can manage all recipes and users
- **Role-Based Access**: User and Admin role support
- **Input Validation**: Comprehensive validation for all endpoints
- **Error Handling**: Global error handling middleware

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

## 🔧 Installation

1. **Navigate to backend directory**
   ```bash
   cd recipe-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Edit .env file
   MONGO_URI=mongodb://localhost:27017/recipe_app
   JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

## 🏃 Running the Server

**Development mode** (with auto-reload using nodemon)
```bash
npm run dev
```

**Production mode**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
GET    /api/auth/me               - Get current user (protected)
```

### Recipe Routes (`/api/recipes`)

```
GET    /api/recipes               - Get all recipes (with search & category filter)
GET    /api/recipes/:id           - Get single recipe
POST   /api/recipes               - Create new recipe (protected)
PUT    /api/recipes/:id           - Update recipe (protected)
DELETE /api/recipes/:id           - Delete recipe (protected)
PUT    /api/recipes/:id/favorite  - Add to favorites (protected)
DELETE /api/recipes/:id/favorite  - Remove from favorites (protected)
GET    /api/recipes/user/favorites - Get user's favorites (protected)
```

### Admin Routes (`/api/admin`)

```
GET    /api/admin/stats           - Get dashboard statistics (admin only)
GET    /api/admin/recipes         - Get all recipes (admin only)
GET    /api/admin/users           - Get all users (admin only)
PUT    /api/admin/recipes/:id     - Update any recipe (admin only)
DELETE /api/admin/recipes/:id     - Delete any recipe (admin only)
PUT    /api/admin/users/:userId/role - Change user role (admin only)
```

## 🔐 Authentication

All protected routes require an Authorization header with JWT token:

```
Authorization: Bearer <token>
```

## 📊 MongoDB Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  favorites: [Recipe._id],
  createdAt: Date,
  updatedAt: Date
}
```

### Recipe Schema
```javascript
{
  title: String (required),
  imageUrl: String (required),
  ingredients: [String] (required),
  instructions: String (required),
  cookingTime: Number (required),
  category: String (enum: ['Veg', 'Non-Veg'], required),
  createdBy: User._id (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Recipe
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Pasta Carbonara",
    "imageUrl": "https://example.com/image.jpg",
    "ingredients": ["Pasta", "Eggs", "Bacon", "Cheese"],
    "instructions": "Step-by-step instructions...",
    "cookingTime": 20,
    "category": "Non-Veg"
  }'
```

### Get Recipes with Search
```bash
curl "http://localhost:5000/api/recipes?search=pizza&category=Veg"
```

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Input validation on all endpoints
- ✅ CORS configured
- ✅ Environment variables for sensitive data
- ✅ Error messages don't expose sensitive information

## 📝 Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🧪 Testing

You can test the API using:
- **Postman** - Import API endpoints
- **cURL** - Command line HTTP client
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

## 📦 Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Auth logic
│   ├── recipeController.js   # Recipe logic
│   └── adminController.js    # Admin logic
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── adminMiddleware.js    # Admin check
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js              # User schema
│   └── Recipe.js            # Recipe schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── recipeRoutes.js      # Recipe endpoints
│   └── adminRoutes.js       # Admin endpoints
├── server.js                # Main server file
├── package.json
└── .env                     # Environment variables
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- For MongoDB Atlas, ensure IP is whitelisted

### Port Already in Use
- Change PORT in `.env`
- Or kill process using the port

### JWT Token Invalid
- Ensure token is correctly formatted in Authorization header
- Check token expiration (currently set to 30 days)
- Verify `JWT_SECRET` matches on both encode/decode

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
