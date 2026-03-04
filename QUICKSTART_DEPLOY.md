# 🚀 Quick Start Deployment - Copy & Paste Commands

## ⚡ PRE-DEPLOYMENT CHECKLIST

Before starting, make ONE change:

### Update API URL in Frontend
📁 Open: `frontend/src/pages/Dashboard.jsx`
📝 Line 4: Change to:
```javascript
const API_URL = import.meta.env.PROD 
  ? 'YOUR_BACKEND_URL_HERE/api' 
  : 'http://localhost:5000/api';
```
(We'll replace YOUR_BACKEND_URL_HERE after deploying backend)

---

## 📦 STEP 1: PUSH TO GITHUB

### 1. Create Repository on GitHub
1. Go to https://github.com/new
2. Name: `recipe-app`
3. Click "Create repository"
4. **Don't** initialize with README

### 2. Push Your Code
```bash
cd C:\Users\Nithish\Downloads\Food_Recipe_MERN_ZIP\Food_Recipe_MERN\recipe-app

git init
git add .
git commit -m "Initial commit - Recipe App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/recipe-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username!

---

## 🎯 STEP 2: DEPLOY BACKEND TO RENDER

### Go to Render
1. Visit: https://render.com
2. Click "Get Started" → Sign in with GitHub
3. Click "New +" → "Web Service"
4. Find and connect `recipe-app` repository

### Configure Service:
Copy-paste these settings:

**Name**: `recipe-app-backend`

**Root Directory**: `backend`

**Build Command**: `npm install`

**Start Command**: `npm start`

**Instance Type**: Free

### Add Environment Variables:
Click "Advanced" → Add Environment Variables:

```
PORT = 5000
MONGO_URI = mongodb+srv://user:ragavipon@cluster0.xxtxr1m.mongodb.net/recipe_app
JWT_SECRET = recipe_secret_2024
NODE_ENV = production
```

### Deploy:
1. Click "Create Web Service"
2. ⏰ Wait 3-5 minutes
3. ✅ Copy your backend URL: `https://recipe-app-backend-xxxx.onrender.com`

### Test Backend:
Open in browser: `https://recipe-app-backend-xxxx.onrender.com/api/recipes`
Should show JSON with recipes!

---

## 🎨 STEP 3: UPDATE FRONTEND WITH BACKEND URL

### Edit Dashboard.jsx Again
📁 Open: `frontend/src/pages/Dashboard.jsx`
📝 Line 4: Update to:
```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://recipe-app-backend-xxxx.onrender.com/api' 
  : 'http://localhost:5000/api';
```

Replace `xxxx` with your actual Render URL!

### Push Changes:
```bash
git add .
git commit -m "Add production API URL"
git push origin main
```

---

## 🌐 STEP 4: DEPLOY FRONTEND TO VERCEL

### Go to Vercel
1. Visit: https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Click "Add New..." → "Project"
4. Find `recipe-app` repository → "Import"

### Configure Settings:

**Framework Preset**: Vite

**Root Directory**: Click "Edit" → type `frontend` → Save

**Build Command**: `npm run build`

**Output Directory**: `dist`

**Install Command**: `npm install`

### Deploy:
1. Click "Deploy"
2. ⏰ Wait 2-3 minutes
3. ✅ Your app is live! Copy URL: `https://recipe-app-xxxx.vercel.app`

---

## ✅ STEP 5: TEST YOUR DEPLOYED APP

### Open Your Vercel URL:
`https://recipe-app-xxxx.vercel.app`

### Test:
1. ✅ Login page loads
2. ✅ Login: Username: `Ragavi`, Password: `ragavipon`
3. ✅ Recipes load from backend
4. ✅ Can add new recipe
5. ✅ Can delete recipe

---

## 🎊 YOU'RE DONE!

Your app is now live on the internet! 🚀

**Backend**: https://recipe-app-backend-xxxx.onrender.com
**Frontend**: https://recipe-app-xxxx.vercel.app

Share it with friends!

---

## 🔄 TO UPDATE LATER:

Make changes locally, then:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both Render and Vercel will auto-deploy! ⚡

---

## 🐛 IF SOMETHING BREAKS:

### Frontend can't reach backend?
1. Check browser console (F12)
2. Verify API_URL in Dashboard.jsx matches your Render URL
3. Check Render logs: Dashboard → Logs

### Backend not responding?
- Render free tier sleeps after 15 mins
- First request takes 30-60 seconds
- Use uptimerobot.com to keep it awake

### Need help?
- Check DEPLOYMENT_GUIDE.md for detailed troubleshooting
- Check Render/Vercel build logs
- Verify all environment variables are set

---

## 📝 IMPORTANT NOTES:

⚠️ **First Load**: Backend might take 30-60 seconds (free tier wakes up)
⚠️ **MongoDB**: Already configured in Render env variables
⚠️ **CORS**: Already configured to allow all origins for demo
✅ **Auto-Deploy**: Both platforms auto-deploy on git push
✅ **HTTPS**: Both platforms provide free SSL certificates

---

**Need more details?** See: `DEPLOYMENT_GUIDE.md`
