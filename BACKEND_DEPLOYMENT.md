# Backend Deployment Guide

## ✅ Prerequisites
Your backend is ready to deploy! It includes:
- MongoDB Atlas connection (already configured)
- Environment variables setup
- All routes working without authentication issues

---

## 🚀 Option 1: Deploy to Render (Recommended - FREE)

### Step 1: Prepare Your Code
1. Make sure your backend code is in a Git repository
2. Push to GitHub if not already done

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account

### Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `recipe-app-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your branch name)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node server.js`
   - **Instance Type**: `Free`

### Step 4: Add Environment Variables
In Render dashboard, add these environment variables:
```
PORT=5000
MONGO_URI=mongodb+srv://user:ragavipon@cluster0.xxtxr1m.mongodb.net/recipe_app
JWT_SECRET=your_secret_key_here
NODE_ENV=production
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait 2-5 minutes for deployment
- Your backend will be live at: `https://recipe-app-backend.onrender.com`

### Step 6: Update Frontend
In `frontend/src/pages/Dashboard.jsx`, change:
```javascript
const API_URL = 'https://recipe-app-backend.onrender.com/api';
```

---

## 🚀 Option 2: Deploy to Railway (Alternative - FREE)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway auto-detects Node.js

### Step 3: Configure
1. Go to "Variables" tab
2. Add environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://user:ragavipon@cluster0.xxtxr1m.mongodb.net/recipe_app
   JWT_SECRET=your_secret_key_here
   NODE_ENV=production
   ```

3. Go to "Settings" tab
4. Set **Root Directory**: `backend`
5. Set **Start Command**: `npm start`

### Step 4: Get URL
- Railway generates a URL like: `https://recipe-app-backend-production.up.railway.app`
- Update frontend API_URL with this URL

---

## 🚀 Option 3: Deploy to Vercel (Backend + Frontend)

### For Backend:
1. Create `vercel.json` in backend folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
cd backend
vercel
```

4. Follow prompts and deploy
5. You'll get a URL like: `https://recipe-app-backend.vercel.app`

---

## 🔧 Important Configuration Changes for Production

### 1. Update CORS in backend/server.js
Replace:
```javascript
app.use(cors());
```

With:
```javascript
app.use(cors({
  origin: ['http://localhost:3001', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

### 2. Update MongoDB Connection
Your MongoDB Atlas is already configured! Just ensure the connection string is in environment variables.

### 3. Environment Variables Needed
```
PORT=5000
MONGO_URI=mongodb+srv://user:ragavipon@cluster0.xxtxr1m.mongodb.net/recipe_app
JWT_SECRET=recipe_secret_2024
NODE_ENV=production
```

---

## 📱 Testing Your Deployed Backend

Once deployed, test these endpoints:

1. **Get all recipes**:
   ```
   GET https://your-backend-url.com/api/recipes
   ```

2. **Add recipe**:
   ```
   POST https://your-backend-url.com/api/recipes
   ```

3. **Delete recipe**:
   ```
   DELETE https://your-backend-url.com/api/recipes/:id
   ```

---

## ✅ Checklist Before Deployment

- [ ] MongoDB Atlas is accessible (not localhost)
- [ ] Environment variables are set
- [ ] CORS is configured for your frontend domain
- [ ] All routes work locally with `npm run dev`
- [ ] No hardcoded localhost URLs in code
- [ ] Git repository is updated with latest code

---

## 🎯 Quick Start (Recommended: Render)

```bash
# 1. Push code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to render.com
# 3. New Web Service → Connect GitHub → Select repo
# 4. Root Directory: backend
# 5. Build: npm install
# 6. Start: npm start
# 7. Add environment variables
# 8. Deploy!
```

Your backend will be live in 3-5 minutes! 🚀

---

## 🔄 Updating After Deployment

For Render/Railway:
- Just push to GitHub
- Auto-deploys on every push

For Vercel:
```bash
cd backend
vercel --prod
```

---

## 💡 Pro Tips

1. **Free Tier Limitations**:
   - Render: Spins down after 15 min inactivity (first request takes 30s)
   - Railway: 500 hours/month free
   - Vercel: Serverless (always fast)

2. **Keep Backend Active**:
   - Use UptimeRobot.com to ping your backend every 5 minutes
   - Prevents sleep on free tier

3. **Monitor Logs**:
   - Check deployment logs in platform dashboard
   - Debug any issues quickly

---

## 🎉 Success!

Once deployed:
1. Your backend URL: `https://recipe-app-backend.onrender.com`
2. Update frontend API_URL
3. Test all features
4. Share your app! 🚀
