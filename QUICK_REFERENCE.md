# 🍽️ MERN Food Recipe App - Quick Reference Guide

## 🚀 Quick Start Commands

### Start Backend
```bash
cd recipe-app/backend
npm install
npm run dev
# Runs on: http://localhost:5000
```

### Start Frontend
```bash
cd recipe-app/frontend
npm install
npm run dev
# Runs on: http://localhost:3000
```

---

## 📁 Project Structure Overview

```
recipe-app/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/              # Business logic
│   ├── middleware/               # Auth, admin, error handling
│   ├── models/                   # User, Recipe schemas
│   ├── routes/                   # API endpoints
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/                # Page components
│   │   ├── context/AuthContext   # Auth state management
│   │   ├── services/             # API calls
│   │   ├── App.jsx               # Main app
│   │   └── index.css             # Tailwind styles
│   ├── index.html                # HTML template
│   └── package.json
│
├── SETUP_GUIDE.md                # Step-by-step setup
└── README.md                     # Full documentation
```

---

## 🔑 Key Features

### Frontend Features ✨
- **Authentication**: Register, login, logout with JWT
- **Recipe Browsing**: Home, Veg, Non-Veg categories
- **Search**: Search by recipe name and ingredients
- **Favorites**: Add/remove recipes as favorites
- **Create Recipes**: Add new recipes with ingredients
- **Recipe Details**: View full recipe with instructions
- **Responsive Design**: Mobile, tablet, desktop views
- **Admin Panel**: Manage all recipes and users

### Backend Features ⚙️
- **REST API**: Full RESTful endpoints
- **Authentication**: JWT-based auth with bcrypt
- **Database**: MongoDB with Mongoose
- **Role-based**: User and Admin roles
- **Search/Filter**: Query recipes by category and keywords
- **Error Handling**: Comprehensive error middleware
- **CORS**: Cross-origin requests enabled

---

## 🔐 User Roles

### User Role
- ✅ Browse recipes
- ✅ Search recipes
- ✅ Add/remove favorites
- ✅ Create own recipes
- ✅ Edit own recipes
- ✅ Delete own recipes

### Admin Role
- ✅ All user permissions
- ✅ View all recipes
- ✅ Edit any recipe
- ✅ Delete any recipe
- ✅ View all users
- ✅ Manage user roles
- ✅ View dashboard stats

---

## 🔌 API Endpoints Summary

### Auth Endpoints
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | /auth/register | ❌ | Create new account |
| POST | /auth/login | ❌ | Login to account |
| GET | /auth/me | ✅ | Get current user |

### Recipe Endpoints
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /recipes | ❌ | Get all recipes |
| GET | /recipes/:id | ❌ | Get recipe details |
| POST | /recipes | ✅ | Create recipe |
| PUT | /recipes/:id | ✅ | Update recipe |
| DELETE | /recipes/:id | ✅ | Delete recipe |

### Favorites Endpoints
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| PUT | /recipes/:id/favorite | ✅ | Add to favorites |
| DELETE | /recipes/:id/favorite | ✅ | Remove from favorites |
| GET | /recipes/user/favorites | ✅ | Get user's favorites |

### Admin Endpoints
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /admin/stats | ✅ Admin | Dashboard stats |
| GET | /admin/recipes | ✅ Admin | View all recipes |
| GET | /admin/users | ✅ Admin | View all users |
| PUT | /admin/recipes/:id | ✅ Admin | Edit any recipe |
| DELETE | /admin/recipes/:id | ✅ Admin | Delete any recipe |

---

## 📝 Frontend Pages

### Public Pages (No Login Required)
- **`/`** - Home with all recipes
- **`/veg`** - Vegetarian recipes
- **`/non-veg`** - Non-vegetarian recipes
- **`/recipe/:id`** - Recipe details
- **`/login`** - User login
- **`/register`** - New user registration

### Protected Pages (Requires Login)
- **`/favorites`** - User's favorite recipes
- **`/add-recipe`** - Add new recipe

### Admin Pages (Requires Admin Role)
- **`/admin/dashboard`** - Dashboard with stats
- **`/admin/manage-recipes`** - Manage all recipes
- **`/admin/edit-recipe/:id`** - Edit recipe

---

## 🎨 Frontend Components

| Component | Purpose |
|-----------|---------|
| Navbar | Navigation & search |
| RecipeCard | Recipe display card |
| SearchBar | Search functionality |
| ProtectedRoute | Route protection HOC |
| Loader | Loading spinner |

---

## 📚 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication (30-day expiry)
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS enabled
- ✅ Environment variables for secrets
- ✅ Protected routes
- ✅ Error handling

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

---

## 🧪 Test Account

After registering:
1. Create a test account
2. Test recipe creation
3. Test search functionality
4. Test favorites
5. (Optional) Set role to admin

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3+ columns)

---

## ⚡ Performance Tips

- Images load lazy
- API calls are cached
- Tokens stored in localStorage
- Responsive images

---

## 🐛 Common Errors & Solutions

| Error | Solution |
|-------|----------|
| Port already in use | Change PORT in .env |
| MongoDB connection failed | Start mongod or check URI |
| CORS error | Ensure backend CORS is enabled |
| Token invalid | Clear localStorage & login again |
| 404 Not found | Check API endpoint URL |
| 500 Server error | Check backend logs |

---

## 📞 File Locations

- **Backend config**: `backend/config/db.js`
- **Backend routes**: `backend/routes/`
- **Frontend pages**: `frontend/src/pages/`
- **Frontend components**: `frontend/src/components/`
- **Environment variables**: `.env` (both folders)
- **Styles**: `frontend/src/index.css`

---

## 🚀 Deployment Checklist

- [ ] Update production URLs
- [ ] Change JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Configure MongoDB Atlas
- [ ] Enable HTTPS
- [ ] Setup CI/CD
- [ ] Configure custom domain
- [ ] Setup monitoring
- [ ] Setup backups

---

## 📖 Documentation Files

1. **SETUP_GUIDE.md** - Step-by-step setup
2. **README.md** - Full project documentation
3. **backend/README.md** - Backend documentation
4. **frontend/README.md** - Frontend documentation
5. **QUICK_REFERENCE.md** - This file

---

## 🎯 Next Steps

1. Follow SETUP_GUIDE.md
2. Start backend and frontend
3. Test all features
4. Customize styling
5. Deploy to production

---

## 💬 Notes

- Keep both servers running during development
- Use different tabs/windows for each server
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass to view database

---

**Last Updated**: March 4, 2026  
**Version**: 1.0.0  
**Status**: ✅ Complete & Production Ready
