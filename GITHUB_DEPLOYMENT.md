# 🚀 GitHub Deployment Guide

Complete guide to deploy your portfolio website to GitHub and then to production platforms.

---

## 📋 Prerequisites

- Git installed on your computer
- GitHub account created
- Code editor (VS Code recommended)
- Terminal/Command Prompt access

---

## 🎯 Deployment Strategy

```
Local Code → GitHub Repository → Production Platforms
                                 ├─ Frontend: Vercel
                                 └─ Backend: Render
```

---

## 📦 Step 1: Initialize Git Repository

### 1.1 Check if Git is Installed

```bash
git --version
```

If not installed, download from: https://git-scm.com/downloads

### 1.2 Navigate to Project Directory

```bash
cd portfolio-website
```

### 1.3 Initialize Git Repository

```bash
# Initialize git repository
git init

# Check status
git status
```

---

## 📝 Step 2: Configure Git

### 2.1 Set Your Git Identity

```bash
# Set your name
git config --global user.name "Prakash Chaudhary"

# Set your email
git config --global user.email "prakashchaudhary92290@gmail.com"

# Verify configuration
git config --list
```

---

## 🔒 Step 3: Verify .gitignore Files

Your project already has `.gitignore` files. Let's verify they're correct:

### Backend .gitignore (portfolio-website/backend/.gitignore)
```
node_modules/
.env
.DS_Store
*.log
dist/
build/
coverage/
.vscode/
```

### Frontend .gitignore (portfolio-website/frontend/.gitignore)
```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
coverage/
.vscode/
```

### Root .gitignore (portfolio-website/.gitignore)
```
node_modules/
.env
.DS_Store
*.log
.vscode/
```

---

## 📤 Step 4: Create GitHub Repository

### 4.1 Create Repository on GitHub

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in details:
   - **Repository name**: `portfolio-website`
   - **Description**: `Modern full-stack portfolio website with React, Node.js, Express, and MongoDB`
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### 4.2 Copy Repository URL

After creating, you'll see a URL like:
```
https://github.com/prakashkchaudhary/portfolio-website.git
```

---

## 🔗 Step 5: Connect Local Repository to GitHub

```bash
# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit: Full-stack portfolio with optimizations"

# Add remote repository (replace with your URL)
git remote add origin https://github.com/prakashkchaudhary/portfolio-website.git

# Verify remote
git remote -v

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

### If you get authentication error:

#### Option 1: Use Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Portfolio Deployment"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use token as password:
   ```bash
   Username: prakashkchaudhary
   Password: [paste your token here]
   ```

#### Option 2: Use GitHub CLI

```bash
# Install GitHub CLI
# Windows: winget install --id GitHub.cli
# Mac: brew install gh

# Authenticate
gh auth login

# Push code
git push -u origin main
```

---

## 🌐 Step 6: Deploy Frontend to Vercel

### 6.1 Sign Up for Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 6.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find and select `portfolio-website`
4. Click **"Import"**

### 6.3 Configure Project

**Framework Preset**: Vite

**Root Directory**: Click **"Edit"** → Select `frontend`

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables**: Click **"Add"**
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```
(You'll update this after deploying backend)

### 6.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://portfolio-website-xyz.vercel.app`

---

## 🖥️ Step 7: Deploy Backend to Render

### 7.1 Sign Up for Render

1. Go to https://render.com
2. Click **"Get Started"**
3. Choose **"Sign up with GitHub"**
4. Authorize Render to access your GitHub

### 7.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `portfolio-website`
3. Click **"Connect"**

### 7.3 Configure Service

**Name**: `portfolio-backend` (or any name you prefer)

**Region**: Choose closest to you (e.g., Singapore, Oregon)

**Branch**: `main`

**Root Directory**: `backend`

**Runtime**: `Node`

**Build Command**: `npm install`

**Start Command**: `npm start`

**Instance Type**: Free (or paid for better performance)

### 7.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
NODE_ENV = production
PORT = 10000
MONGODB_URI = your_mongodb_atlas_connection_string
JWT_SECRET = your_super_secret_jwt_key_change_this_to_something_random
FRONTEND_URL = https://your-frontend-url.vercel.app
```

**Important**: Get MongoDB URI from MongoDB Atlas (see Step 8)

### 7.5 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://portfolio-backend.onrender.com`

---

## 🗄️ Step 8: Set Up MongoDB Atlas

### 8.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email or Google

### 8.2 Create Cluster

1. Choose **"Free Shared"** tier
2. Select cloud provider: **AWS**
3. Select region: Closest to your backend (e.g., Singapore)
4. Cluster name: `portfolio-cluster`
5. Click **"Create Cluster"** (takes 3-5 minutes)

### 8.3 Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `portfolioAdmin`
5. Password: Click **"Autogenerate Secure Password"** (copy it!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### 8.4 Configure Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render/Vercel)
4. Click **"Confirm"**

### 8.5 Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://portfolioAdmin:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://portfolioAdmin:yourpassword@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 🔄 Step 9: Update Environment Variables

### 9.1 Update Backend on Render

1. Go to Render Dashboard
2. Select your backend service
3. Go to **"Environment"** tab
4. Update `MONGODB_URI` with your Atlas connection string
5. Update `FRONTEND_URL` with your Vercel URL
6. Click **"Save Changes"**
7. Service will automatically redeploy

### 9.2 Update Frontend on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Update `VITE_API_URL` with your Render backend URL
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"..."** on latest deployment → **"Redeploy"**

---

## 🧪 Step 10: Test Deployment

### 10.1 Test Backend

```bash
# Test health endpoint
curl https://your-backend-url.onrender.com/api/health

# Expected response:
# {"status":"ok","timestamp":"..."}

# Test projects endpoint
curl https://your-backend-url.onrender.com/api/projects
```

### 10.2 Test Frontend

1. Open your Vercel URL in browser
2. Check all pages load correctly
3. Test dark mode toggle
4. Try contact form
5. Test admin login
6. Verify projects display

### 10.3 Create First Admin

```bash
# Using curl (replace URL with your backend URL)
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"prakash@admin.com","password":"admin123"}'

# Or use Postman/Insomnia
```

**Important**: After creating admin, disable the register route in production!

---

## 🔐 Step 11: Secure Your Deployment

### 11.1 Disable Registration Route

Edit `backend/routes/authRoutes.js`:

```javascript
// Comment out or remove this line in production:
// router.post('/register', registerAdmin)
```

Commit and push:
```bash
git add .
git commit -m "Disable admin registration in production"
git push origin main
```

### 11.2 Update CORS Settings

Edit `backend/server.js` to only allow your frontend:

```javascript
const allowedOrigins = [
  'https://your-frontend-url.vercel.app',
  'http://localhost:5173' // for local development
]
```

### 11.3 Enable HTTPS Only

Both Vercel and Render provide HTTPS by default. Verify:
- Frontend URL starts with `https://`
- Backend URL starts with `https://`

---

## 📊 Step 12: Monitor Your Deployment

### 12.1 Vercel Monitoring

1. Go to Vercel Dashboard
2. Select your project
3. Check **"Analytics"** tab for:
   - Page views
   - Performance metrics
   - Core Web Vitals

### 12.2 Render Monitoring

1. Go to Render Dashboard
2. Select your service
3. Check **"Metrics"** tab for:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### 12.3 MongoDB Atlas Monitoring

1. Go to Atlas Dashboard
2. Select your cluster
3. Check **"Metrics"** tab for:
   - Connections
   - Operations
   - Network traffic

---

## 🔄 Step 13: Update Your Code

### When you make changes:

```bash
# 1. Make your changes in code

# 2. Test locally
cd portfolio-website/frontend
npm run dev

cd portfolio-website/backend
npm run dev

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub
git push origin main

# 5. Automatic deployment
# Vercel and Render will automatically deploy your changes!
```

---

## 🌟 Step 14: Custom Domain (Optional)

### 14.1 For Frontend (Vercel)

1. Buy domain from Namecheap, GoDaddy, etc.
2. Go to Vercel → Project → Settings → Domains
3. Add your domain: `www.prakashchaudhary.com`
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

### 14.2 For Backend (Render)

1. Go to Render → Service → Settings → Custom Domain
2. Add your domain: `api.prakashchaudhary.com`
3. Follow DNS configuration instructions
4. Update `VITE_API_URL` in Vercel to use new domain

---

## 🐛 Troubleshooting

### Issue: Git push fails

**Solution**:
```bash
# Check remote
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/prakashkchaudhary/portfolio-website.git
git push -u origin main
```

### Issue: Vercel build fails

**Solution**:
1. Check build logs in Vercel dashboard
2. Verify `frontend` is set as root directory
3. Check environment variables are set
4. Ensure `package.json` has correct scripts

### Issue: Render deployment fails

**Solution**:
1. Check logs in Render dashboard
2. Verify `backend` is set as root directory
3. Check all environment variables are set
4. Ensure MongoDB connection string is correct

### Issue: Cannot connect to database

**Solution**:
1. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Check connection string has correct password
3. Verify database user has read/write permissions
4. Check network access settings in Atlas

### Issue: CORS errors

**Solution**:
1. Verify `FRONTEND_URL` in backend matches Vercel URL
2. Check CORS configuration in `server.js`
3. Ensure URLs include `https://` (not `http://`)
4. Clear browser cache and try again

---

## 📋 Deployment Checklist

### Before Deployment:
- [x] Code optimizations complete
- [ ] Local testing passed
- [ ] Environment variables prepared
- [ ] .gitignore files configured
- [ ] Git repository initialized

### GitHub:
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Repository is accessible

### MongoDB Atlas:
- [ ] Cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained

### Backend (Render):
- [ ] Service created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Health check working
- [ ] API endpoints responding

### Frontend (Vercel):
- [ ] Project imported
- [ ] Environment variables set
- [ ] Build successful
- [ ] Website loads correctly
- [ ] All pages working

### Post-Deployment:
- [ ] Admin account created
- [ ] Registration route disabled
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up
- [ ] SSL certificates active

---

## 🎉 Success!

Your portfolio is now live on the internet! 🌐

**URLs**:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-service.onrender.com`
- GitHub: `https://github.com/prakashkchaudhary/portfolio-website`

---

## 📞 Support

### Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Git Documentation](https://git-scm.com/doc)

### Contact:
- Email: prakashchaudhary92290@gmail.com
- GitHub: https://github.com/prakashkchaudhary

---

**Last Updated**: April 27, 2026
