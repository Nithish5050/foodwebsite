# 🚀 MERN Food Recipe App - Complete Setup Guide

A step-by-step guide to get the complete MERN Food Recipe Application up and running.

## ⏱️ Estimated Time: 30 minutes

---

## 📋 Prerequisites Checklist

Before you start, ensure you have:

- [ ] Node.js v14 or higher installed
- [ ] npm or yarn installed
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Git installed
- [ ] A code editor (VS Code recommended)
- [ ] Internet connection

### Verify Installation
```bash
node --version    # Should show v14+
npm --version     # Should show v6+
mongo --version   # Optional for local MongoDB
```

---

## 🛠️ Part 1: Backend Setup (15 minutes)

### Step 1.1: Navigate to Backend
```bash
cd recipe-app/backend
```

### Step 1.2: Install Dependencies
```bash
npm install
```
*This may take 2-3 minutes*

### Step 1.3: Setup Environment Variables

Create/Edit the `.env` file:

**For Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/recipe_app
JWT_SECRET=your_super_secret_key_change_this_12345
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe_app
JWT_SECRET=your_super_secret_key_change_this_12345
PORT=5000
NODE_ENV=development
```

> 🔒 **Security Tip**: Change `JWT_SECRET` to a random strong string!

### Step 1.4: Start MongoDB (if using local)

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
mongod --config /usr/local/etc/mongod.conf
```

Or use MongoDB Compass GUI to start MongoDB.

### Step 1.5: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

✅ **Success**: You should see:
```
Server running on port 5000
MongoDB connected: localhost
```

Backend is now running at: **http://localhost:5000**

---

## 🎨 Part 2: Frontend Setup (10 minutes)

### Step 2.1: Open New Terminal/Tab

Keep the backend running and open a new terminal.

### Step 2.2: Navigate to Frontend
```bash
cd recipe-app/frontend
```

### Step 2.3: Install Dependencies
```bash
npm install
```
*This may take 2-3 minutes*

### Step 2.4: Verify Environment Variables

Check `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 2.5: Start Frontend Development Server

```bash
npm run dev
```

✅ **Success**: You should see:
```
Local: http://localhost:3000/
Press q to quit
```

The app should automatically open in your browser at **http://localhost:3000**

---

## ✅ Verification Checklist

### Backend Verification
1. Open **http://localhost:5000**
2. You should see: `"Welcome to Food Recipe MERN App Backend"`
3. Open **http://localhost:5000/api/health**
4. You should see: `{"success": true, "message": "Backend server is running"}`

### Frontend Verification
1. Frontend should open automatically
2. You should see the navbar with "🍽️ RecipeApp"
3. Home page displays "🍳 Delicious Recipes"
4. Search bar is visible in navbar

If you see errors, check the terminal for error messages.

---

## 🔐 First Time Use

### Step 1: Create Admin Account (Optional)

1. Register a new account through the UI
2. Login to MongoDB/MongoDB Compass
3. Navigate to `recipe_app` database
4. Find the user in `users` collection
5. Change `role` from `"user"` to `"admin"`
6. Logout and login again to access Admin panel

### Step 2: Create First Recipe

1. Login to the app
2. Click "➕ Add Recipe" in navbar
3. Fill in the form:
   - **Title**: Biryani
   - **Image URL**: https://images.unsplash.com/photo-1584953194ee-bee19f2f769?w=400
   - **Ingredients** (one per line):
     ```
     Rice
     Meat
     Yogurt
     Spices
     Ghee
     ```
   - **Instructions**: Detailed cooking process
   - **Cooking Time**: 45
   - **Category**: Non-Veg
4. Click "Create Recipe"

### Step 3: Test Features

- [ ] Search for the recipe
- [ ] Filter by category
- [ ] Add to favorites
- [ ] View recipe details
- [ ] Register as admin (if set up)
- [ ] Access admin dashboard
- [ ] Edit/Delete recipes

---

## 🐛 Troubleshooting Guide

### Issue: "Port 5000 is already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Change port in .env
PORT=5001
```

### Issue: "MongoDB connection failed"

**Solution 1 (Local MongoDB)**:
```bash
# Start MongoDB service
mongod

# Or use GUI: MongoDB Compass
```

**Solution 2 (MongoDB Atlas)**:
- Create account at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGO_URI` in `.env`

### Issue: "Cannot GET /api/health"

**Solution:**
- [ ] Ensure backend is running (`npm run dev`)
- [ ] Check terminal for errors
- [ ] Verify API_URL in frontend `.env`

### Issue: "Network Error" in Frontend

**Solution:**
- [ ] Backend must be running on port 5000
- [ ] Check firewall settings
- [ ] Check browser console for CORS errors
- [ ] Restart both servers

### Issue: "Token Expired/Invalid"

**Solution:**
- [ ] Clear localStorage in browser
- [ ] Clear browser cookies
- [ ] Logout and login again
- [ ] Ensure JWT_SECRET is set in `.env`

### Issue: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Images not loading

**Solution:**
- Ensure image URLs are valid
- Use images starting with `http://` or `https://`
- Use public image URLs (e.g., from Unsplash, Pexels)

---

## 📊 Project Statistics

- **Backend Files**: 15+
- **Frontend Components**: 10+
- **Frontend Pages**: 12+
- **API Endpoints**: 15+
- **Lines of Code**: 3000+

---

## 🎯 Development Workflow

### Daily Development

```bash
# Terminal 1 - Backend
cd recipe-app/backend
npm run dev

# Terminal 2 - Frontend (new tab/window)
cd recipe-app/frontend
npm run dev
```

### Making Changes

1. Edit code in your editor
2. Vite (frontend) and Nodemon (backend) auto-reload
3. Test changes in browser
4. Check browser console for errors

### Testing

1. Use browser DevTools (F12)
2. Check "Network" tab for API calls
3. Check "Console" for errors
4. Use MongoDB Compass to verify data

---

## 📦 Building for Production

### Build Frontend
```bash
cd recipe-app/frontend
npm run build
# Creates 'dist' folder for deployment
```

### Build Backend
```bash
# Backend is already ready for production
# Just deploy the 'backend' folder
# Update NODE_ENV=production in .env
```

---

## 🚀 Deployment Quick Links

### Frontend Deployment Options
- **Vercel**: https://vercel.com (recommended for Next.js/Vite)
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com
- **Firebase**: https://firebase.google.com

### Backend Deployment Options
- **Heroku**: https://heroku.com
- **Railway**: https://railway.app
- **Render**: https://render.com
- **DigitalOcean**: https://digitalocean.com
- **AWS**: https://aws.amazon.com

---

## 📚 API Testing Tools

### Test APIs Easily With:
- **Postman**: https://www.postman.com/downloads/
- **Thunder Client**: VS Code Extension
- **REST Client**: VS Code Extension
- **Insomnia**: https://insomnia.rest/
- **cURL**: Command line

### Example cURL Request:
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

---

## 🎓 Learning Resources

### MERN Stack
- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Docs](https://nodejs.org/docs/)

### Specific Topics
- [JWT Authentication](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/)
- [Axios Documentation](https://axios-http.com/docs)

---

## 💡 Pro Tips

1. **Use MongoDB Compass**: Visual database explorer
   - Download: https://www.mongodb.com/products/compass
   - Connect to your MongoDB
   - Browse collections easily

2. **Use VS Code Extensions**:
   - MongoDB for VS Code
   - REST Client
   - Thunder Client
   - ES7+ React/Redux snippets

3. **Environment Variables**:
   - Never commit `.env` files
   - Use `.env.example` for documentation
   - Keep secrets safe

4. **Performance**:
   - Use React DevTools browser extension
   - Check network tab in DevTools
   - Monitor backend logs

5. **Git Best Practices**:
   - Commit frequently
   - Write meaningful messages
   - Create feature branches

---

## ✨ You're All Set!

Congratulations! Your MERN Food Recipe App is now running! 🎉

### What's Next?
1. Explore all features
2. Create test recipes
3. Test admin panel
4. Customize styling
5. Deploy to production

### Need Help?
- Check README.md files in backend and frontend folders
- Review error messages in browser console and terminal
- Check backend logs in terminal
- Visit MongoDB documentation

---

## 🎉 Happy Coding!

**The complete MERN stack Food Recipe Application is now ready to use!**

For questions or issues, consult the individual README files:
- Backend: `recipe-app/backend/README.md`
- Frontend: `recipe-app/frontend/README.md`
- Root: `recipe-app/README.md`

---

**Last Updated**: March 4, 2026  
**Version**: 1.0.0
