# 🚀 Quick Deployment Steps

Simple step-by-step guide to deploy your portfolio to GitHub and production.

---

## 🎯 Quick Overview

```
Your Computer → GitHub → Vercel (Frontend) + Render (Backend)
```

**Time Required**: 30-45 minutes

---

## ✅ Step 1: Push to GitHub (10 minutes)

### Option A: Use Automated Script (Easiest)

**Windows:**
```bash
cd portfolio-website
deploy-to-github.bat
```

**Mac/Linux:**
```bash
cd portfolio-website
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

### Option B: Manual Commands

```bash
# 1. Navigate to project
cd portfolio-website

# 2. Initialize Git
git init

# 3. Configure Git
git config user.name "Prakash Chaudhary"
git config user.email "prakashchaudhary92290@gmail.com"

# 4. Add all files
git add .

# 5. Create commit
git commit -m "Initial commit: Full-stack portfolio with optimizations"

# 6. Create GitHub repository
# Go to: https://github.com/new
# Name: portfolio-website
# Click: Create repository

# 7. Add remote (replace with your URL)
git remote add origin https://github.com/prakashkchaudhary/portfolio-website.git

# 8. Push to GitHub
git branch -M main
git push -u origin main
```

**If authentication fails:**
- Use Personal Access Token instead of password
- Generate at: https://github.com/settings/tokens
- Select scope: `repo` (full control)

---

## ✅ Step 2: Deploy Frontend to Vercel (10 minutes)

### 2.1 Sign Up & Import

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Click **"Add New..."** → **"Project"**
4. Select **"portfolio-website"** repository
5. Click **"Import"**

### 2.2 Configure

**Framework**: Vite

**Root Directory**: Click **"Edit"** → Select **`frontend`**

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2.3 Environment Variables

Click **"Environment Variables"** → **"Add"**

```
Name: VITE_API_URL
Value: https://your-backend-url.onrender.com/api
```

(Leave as placeholder for now, update after backend deployment)

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your URL: `https://portfolio-website-xyz.vercel.app`

---

## ✅ Step 3: Set Up MongoDB Atlas (10 minutes)

### 3.1 Create Account & Cluster

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** → Sign up
3. Choose **"Free Shared"** tier
4. Provider: **AWS**
5. Region: **Closest to you** (e.g., Singapore)
6. Click **"Create Cluster"** (wait 3-5 minutes)

### 3.2 Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `portfolioAdmin`
4. Password: Click **"Autogenerate"** → **Copy password!**
5. Privileges: **Read and write to any database**
6. Click **"Add User"**

### 3.3 Configure Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Click **"Confirm"**

### 3.4 Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy connection string:
   ```
   mongodb+srv://portfolioAdmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name at the end:
   ```
   mongodb+srv://portfolioAdmin:yourpassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

**Save this connection string!** You'll need it for backend deployment.

---

## ✅ Step 4: Deploy Backend to Render (10 minutes)

### 4.1 Sign Up & Create Service

1. Go to **https://render.com**
2. Click **"Get Started"** → **"Sign up with GitHub"**
3. Click **"New +"** → **"Web Service"**
4. Select **"portfolio-website"** repository
5. Click **"Connect"**

### 4.2 Configure Service

**Name**: `portfolio-backend`

**Region**: **Closest to you** (e.g., Singapore, Oregon)

**Branch**: `main`

**Root Directory**: `backend`

**Runtime**: `Node`

**Build Command**: `npm install`

**Start Command**: `npm start`

**Instance Type**: **Free**

### 4.3 Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these (one by one):

```
NODE_ENV = production
PORT = 10000
MONGODB_URI = [paste your MongoDB connection string from Step 3]
JWT_SECRET = your_super_secret_random_string_change_this
FRONTEND_URL = [paste your Vercel URL from Step 2]
```

**Example:**
```
NODE_ENV = production
PORT = 10000
MONGODB_URI = mongodb+srv://portfolioAdmin:mypassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET = my-super-secret-jwt-key-12345
FRONTEND_URL = https://portfolio-website-xyz.vercel.app
```

### 4.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Copy your URL: `https://portfolio-backend.onrender.com`

---

## ✅ Step 5: Update Frontend Environment (5 minutes)

### 5.1 Update Vercel Environment Variable

1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Find `VITE_API_URL`
5. Click **"Edit"**
6. Update value to: `https://your-backend-url.onrender.com/api`
7. Click **"Save"**

### 5.2 Redeploy Frontend

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## ✅ Step 6: Create Admin Account (5 minutes)

### Option A: Using Browser (Easiest)

1. Install **Postman** or use **Thunder Client** (VS Code extension)
2. Create new POST request:
   - URL: `https://your-backend-url.onrender.com/api/auth/register`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "email": "prakash@admin.com",
       "password": "admin123"
     }
     ```
3. Click **"Send"**

### Option B: Using curl

```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"prakash@admin.com","password":"admin123"}'
```

**Important**: After creating your admin account, disable the register route for security!

---

## ✅ Step 7: Test Your Website (5 minutes)

### 7.1 Test Frontend

1. Open your Vercel URL in browser
2. Check all pages load:
   - ✅ Home
   - ✅ About
   - ✅ Skills
   - ✅ Projects
   - ✅ Contact
   - ✅ Resume
3. Test dark mode toggle
4. Try contact form

### 7.2 Test Backend

```bash
# Test health endpoint
curl https://your-backend-url.onrender.com/api/health

# Expected: {"status":"ok","timestamp":"..."}
```

### 7.3 Test Admin Login

1. Go to: `https://your-vercel-url.vercel.app/admin/login`
2. Login with:
   - Email: `prakash@admin.com`
   - Password: `admin123`
3. Try adding a project
4. Verify it appears on homepage

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] MongoDB Atlas configured
- [ ] Environment variables set
- [ ] Admin account created
- [ ] Website loads correctly
- [ ] All pages working
- [ ] Contact form working
- [ ] Admin dashboard working

---

## 🐛 Common Issues & Solutions

### Issue: "Git push failed - Authentication failed"

**Solution:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio Deployment"
4. Select scope: `repo`
5. Generate and copy token
6. Use token as password when pushing

### Issue: "Vercel build failed"

**Solution:**
1. Check root directory is set to `frontend`
2. Verify environment variable `VITE_API_URL` is set
3. Check build logs for specific errors

### Issue: "Render deployment failed"

**Solution:**
1. Check root directory is set to `backend`
2. Verify all environment variables are set correctly
3. Check MongoDB connection string is correct
4. Review deployment logs

### Issue: "Cannot connect to database"

**Solution:**
1. Verify MongoDB Atlas IP whitelist: `0.0.0.0/0`
2. Check connection string has correct password
3. Ensure database user has read/write permissions
4. Verify network access is configured

### Issue: "CORS errors in browser"

**Solution:**
1. Verify `FRONTEND_URL` in Render matches Vercel URL exactly
2. Ensure both URLs use `https://` (not `http://`)
3. Check CORS configuration in `backend/server.js`
4. Redeploy backend after fixing

### Issue: "Projects not showing on frontend"

**Solution:**
1. Login to admin dashboard
2. Add at least one project
3. Refresh homepage
4. Check browser console for errors

---

## 📞 Need Help?

### Documentation:
- **Full Guide**: `GITHUB_DEPLOYMENT.md`
- **Optimization**: `OPTIMIZATION_GUIDE.md`
- **Testing**: `PERFORMANCE_TESTING.md`

### Platform Docs:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

### Contact:
- **Email**: prakashchaudhary92290@gmail.com
- **GitHub**: https://github.com/prakashkchaudhary

---

## 🎊 Congratulations!

Your portfolio is now live on the internet! 🌐

**Share your portfolio:**
- LinkedIn: Add to your profile
- Resume: Include the URL
- GitHub: Add to repository description
- Social Media: Share with friends

---

**Last Updated**: April 27, 2026
