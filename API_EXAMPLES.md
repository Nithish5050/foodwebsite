# 🔌 API Examples & Usage Guide

Complete examples of all API endpoints with request and response samples.

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### 1. Register New User

**Request:**
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

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 2. Login User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 3. Get Current User (Protected)

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "favorites": ["64a1b2c3d4e5f6g7h8i9j0k2"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📚 Recipe Endpoints

### 4. Get All Recipes

**Request (Simple):**
```bash
curl -X GET http://localhost:5000/api/recipes
```

**Request (With Search):**
```bash
curl -X GET "http://localhost:5000/api/recipes?search=pizza"
```

**Request (With Category Filter):**
```bash
curl -X GET "http://localhost:5000/api/recipes?category=Veg"
```

**Request (Search + Category):**
```bash
curl -X GET "http://localhost:5000/api/recipes?search=pasta&category=Veg"
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "recipes": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Margherita Pizza",
      "imageUrl": "https://example.com/pizza.jpg",
      "ingredients": ["Flour", "Tomato", "Mozzarella", "Basil"],
      "instructions": "Step by step instructions...",
      "cookingTime": 20,
      "category": "Veg",
      "createdBy": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 5. Get Single Recipe

**Request:**
```bash
curl -X GET http://localhost:5000/api/recipes/64a1b2c3d4e5f6g7h8i9j0k2
```

**Response:**
```json
{
  "success": true,
  "recipe": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Margherita Pizza",
    "imageUrl": "https://example.com/pizza.jpg",
    "ingredients": ["Flour", "Tomato", "Mozzarella", "Basil"],
    "instructions": "1. Make dough\n2. Add sauce\n3. Add cheese\n4. Bake",
    "cookingTime": 20,
    "category": "Veg",
    "createdBy": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. Create New Recipe (Protected)

**Request:**
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Biryani",
    "imageUrl": "https://example.com/biryani.jpg",
    "ingredients": [
      "Basmati Rice",
      "Goat Meat",
      "Yogurt",
      "Ghee",
      "Spices"
    ],
    "instructions": "1. Marinate meat\n2. Cook rice\n3. Layer together\n4. Cook on high heat",
    "cookingTime": 45,
    "category": "Non-Veg"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "recipe": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Biryani",
    "imageUrl": "https://example.com/biryani.jpg",
    "ingredients": ["Basmati Rice", "Goat Meat", "Yogurt"],
    "instructions": "1. Marinate meat...",
    "cookingTime": 45,
    "category": "Non-Veg",
    "createdBy": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 7. Update Recipe (Protected)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/recipes/64a1b2c3d4e5f6g7h8i9j0k3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Hyderabadi Biryani",
    "cookingTime": 50
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "recipe": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Hyderabadi Biryani",
    "cookingTime": 50,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 8. Delete Recipe (Protected)

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/recipes/64a1b2c3d4e5f6g7h8i9j0k3 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

---

## ❤️ Favorites Endpoints

### 9. Add Recipe to Favorites (Protected)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/recipes/64a1b2c3d4e5f6g7h8i9j0k2/favorite \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe added to favorites",
  "favorites": [
    "64a1b2c3d4e5f6g7h8i9j0k2",
    "64a1b2c3d4e5f6g7h8i9j0k4"
  ]
}
```

---

### 10. Remove Recipe from Favorites (Protected)

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/recipes/64a1b2c3d4e5f6g7h8i9j0k2/favorite \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe removed from favorites",
  "favorites": ["64a1b2c3d4e5f6g7h8i9j0k4"]
}
```

---

### 11. Get User's Favorites (Protected)

**Request:**
```bash
curl -X GET http://localhost:5000/api/recipes/user/favorites \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "favorites": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Margherita Pizza",
      "category": "Veg",
      "cookingTime": 20
    },
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k4",
      "title": "Butter Chicken",
      "category": "Non-Veg",
      "cookingTime": 35
    }
  ]
}
```

---

## 👨‍💼 Admin Endpoints (Protected + Admin Role Required)

### 12. Get Dashboard Statistics

**Request:**
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalRecipes": 25,
    "totalUsers": 10,
    "veggieRecipes": 15,
    "nonVeggieRecipes": 10
  }
}
```

---

### 13. Get All Recipes (Admin View)

**Request:**
```bash
curl -X GET http://localhost:5000/api/admin/recipes \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "count": 25,
  "recipes": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Margherita Pizza",
      "category": "Veg",
      "createdBy": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "name": "John Doe"
      }
    }
  ]
}
```

---

### 14. Get All Users (Admin Only)

**Request:**
```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "users": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
}
```

---

### 15. Admin Update Recipe

**Request:**
```bash
curl -X PUT http://localhost:5000/api/admin/recipes/64a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "title": "Updated Pizza Name",
    "cookingTime": 25
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe updated successfully by admin",
  "recipe": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Updated Pizza Name",
    "cookingTime": 25
  }
}
```

---

### 16. Admin Delete Recipe

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/admin/recipes/64a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully by admin"
}
```

---

### 17. Change User Role (Admin Only)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/admin/users/64a1b2c3d4e5f6g7h8i9j0k1/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "role": "admin"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "user": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "role": "admin"
  }
}
```

---

## 🧪 Testing with JavaScript (Axios)

### Example: Register User
```javascript
import axios from 'axios';

const registerUser = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        passwordConfirm: 'password123'
      }
    );
    console.log('User registered:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response.data);
  }
};
```

### Example: Get Recipes
```javascript
const getRecipes = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/recipes?category=Veg'
    );
    console.log('Veg recipes:', response.data.recipes);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
  }
};
```

### Example: Create Recipe (Protected)
```javascript
const createRecipe = async (token, recipeData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/recipes',
      recipeData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('Recipe created:', response.data);
  } catch (error) {
    console.error('Failed to create recipe:', error.response.data);
  }
};
```

---

## 🔄 Query Parameters

### Search Parameter
```
GET /api/recipes?search=pizza
GET /api/recipes?search=tomato
GET /api/recipes?search="cooking time"
```

### Category Filter
```
GET /api/recipes?category=Veg
GET /api/recipes?category=Non-Veg
```

### Combined
```
GET /api/recipes?search=biryani&category=Non-Veg
GET /api/recipes?search=salad&category=Veg
```

---

## 🛡️ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "All fields are required"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "No token provided. Please login first."
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 💡 Pro Tips

1. **Store Token**: Save token in localStorage after login
2. **Add Header**: Add token to all protected requests
3. **Handle Errors**: Always handle error responses
4. **Validate Input**: Validate data before sending
5. **Test Locally**: Test APIs locally before deployment

---

**Last Updated**: March 4, 2026
