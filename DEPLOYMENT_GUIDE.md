# Complete Deployment Guide - Frontend & Backend Separately

## 🎯 Overview
- **Backend**: Deploy to Render (free)
- **Frontend**: Deploy to Vercel (free)

---

# 📦 PART 1: Deploy Backend to Render

## Step 1: Prepare Your Backend Code

### 1.1 Update CORS Settings
Open `backend/server.js` and find the CORS section, update it:

```javascript
// Replace this line:
app.use(cors());

// With this (we'll update the frontend URL after deployment):
app.use(cors({
  origin: '*', // We'll restrict this later
  credentials: true
}));
```

### 1.2 Verify Environment Variables
Make sure `backend/.env` has:
```
PORT=5000
MONGO_URI=mongodb+srv://user:ragavipon@cluster0.xxtxr1m.mongodb.net/recipe_app
JWT_SECRET=recipe_secret_2024
NODE_ENV=production
```

### 1.3 Push to GitHub
```bash
# Navigate to your project
cd C:\Users\Nithish\Downloads\Food_Recipe_MERN_ZIP\Food_Recipe_MERN\recipe-app

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub (go to github.com)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/recipe-app.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with GitHub account
4. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Find your `recipe-app` repository
4. Click **"Connect"**

### 2.3 Configure Backend Service
Fill in these settings:

**Name**: `recipe-app-backend`

**Region**: Choose closest to you (e.g., Singapore, Oregon)

**Branch**: `main`

**Root Directory**: `backend`

**Runtime**: `Node`

**Build Command**: `npm install`

**Start Command**: `npm start`

**Instance Type**: Select **"Free"**

### 2.4 Add Environment Variables
Scroll down to **"Environment Variables"** section

Click **"Add Environment Variable"** and add these one by one:

```
Key: PORT
Value: 5000

Key: MONGO_URI
Value: mongodb+srv://user:ragavipon@cluster0.xxtxr1m.mongodb.net/recipe_app

Key: JWT_SECRET
Value: recipe_secret_2024

Key: NODE_ENV
Value: production
```

### 2.5 Deploy
1. Click **"Create Web Service"** button
2. Wait 2-5 minutes for deployment
3. You'll see build logs - wait for "Build successful"
4. Once deployed, you'll get a URL like: **`https://recipe-app-backend.onrender.com`**

### 2.6 Test Backend
Copy your backend URL and test in browser:
```
https://recipe-app-backend.onrender.com/api/recipes
```
You should see JSON with your recipes!

**⚠️ Important**: Save your backend URL! You'll need it for frontend deployment.

---

# 🎨 PART 2: Deploy Frontend to Vercel

## Step 3: Prepare Frontend Code

### 3.1 Update API URL
Open `frontend/src/pages/Dashboard.jsx`

Find this line (around line 4):
```javascript
const API_URL = 'http://localhost:5000/api';
```

Replace with your Render backend URL:
```javascript
const API_URL = 'https://recipe-app-backend.onrender.com/api';
```

### 3.2 Create Production Build Configuration
Create a new file `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3.3 Commit Changes
```bash
# In your project directory
git add .
git commit -m "Update frontend for production"
git push origin main
```

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Select **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### 4.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your `recipe-app` repository
3. Click **"Import"**

### 4.3 Configure Project Settings

**Framework Preset**: Vite (Vercel should auto-detect)

**Root Directory**: Click **"Edit"** and set to `frontend`

**Build Command**: `npm run build`

**Output Directory**: `dist`

**Install Command**: `npm install`

### 4.4 Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. Vercel will show build progress
4. Once done, you'll get a URL like: **`https://recipe-app-xyz.vercel.app`**

### 4.5 Test Your App
1. Open the Vercel URL
2. You should see your login page
3. Login with: Username: `Ragavi`, Password: `ragavipon`
4. Check if recipes load from your backend!

---

## Step 5: Update CORS Settings

### 5.1 Get Your Frontend URL
Copy your Vercel URL (e.g., `https://recipe-app-xyz.vercel.app`)

### 5.2 Update Backend CORS
Go back to your code and edit `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3001', // For local development
    'https://recipe-app-xyz.vercel.app' // Your Vercel URL
  ],
  credentials: true
}));
```

### 5.3 Redeploy Backend
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Render will automatically redeploy your backend!

---

## 🎉 Step 6: Final Checks

### Test Everything:
1. ✅ Open your Vercel frontend URL
2. ✅ Login works
3. ✅ Recipes load from backend
4. ✅ Can add new recipes
5. ✅ Can delete recipes
6. ✅ Search and filters work

---

## 📝 Your Deployment URLs

**Backend (Render)**: `https://recipe-app-backend.onrender.com`
**Frontend (Vercel)**: `https://recipe-app-xyz.vercel.app`

---

## 🔄 How to Update After Changes

### Update Frontend:
```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
# Vercel auto-deploys!
```

### Update Backend:
```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
# Render auto-deploys!
```

---

## 🐛 Troubleshooting

### Backend shows "Service Unavailable"
- Render free tier sleeps after 15 minutes
- First request takes 30-60 seconds to wake up
- This is normal for free tier

### Frontend can't connect to backend
- Check CORS settings in backend
- Verify API_URL in Dashboard.jsx is correct
- Check browser console for errors

### Recipes not loading
- Test backend directly: `https://your-backend.onrender.com/api/recipes`
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Build fails on Vercel
- Make sure `frontend` root directory is set
- Check build command is `npm run build`
- Look at build logs for specific errors

---

## 💡 Pro Tips

1. **Custom Domain** (Optional):
   - In Vercel dashboard → Domains → Add your domain
   - Follow DNS setup instructions

2. **Keep Backend Alive**:
   - Use UptimeRobot.com to ping your backend every 5 minutes
   - Prevents sleep on Render free tier

3. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Always add them in platform dashboards
   - Add `.env` to `.gitignore`

4. **MongoDB Security**:
   - Your MongoDB Atlas is already configured
   - Network Access is set to allow all IPs (needed for Render)

---

## 🎊 Success Checklist

- [x] Backend deployed to Render
- [x] Frontend deployed to Vercel
- [x] CORS configured
- [x] API URL updated
- [x] App working end-to-end
- [x] Can add/delete recipes
- [x] MongoDB connected

**You're Live! 🚀**

Share your Vercel URL with friends and enjoy your deployed MERN app!
