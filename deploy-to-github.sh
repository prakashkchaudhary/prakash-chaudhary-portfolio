#!/bin/bash

# Portfolio Website - GitHub Deployment Script
# This script helps you deploy your portfolio to GitHub

echo "🚀 Portfolio Website - GitHub Deployment"
echo "========================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Download from: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already initialized
if [ -d .git ]; then
    echo "⚠️  Git repository already initialized"
    echo ""
else
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
    echo ""
fi

# Configure Git user (if not already configured)
if [ -z "$(git config user.name)" ]; then
    echo "👤 Configuring Git user..."
    git config user.name "Prakash Chaudhary"
    git config user.email "prakashchaudhary92290@gmail.com"
    echo "✅ Git user configured"
    echo ""
fi

# Show current status
echo "📊 Current Git Status:"
git status --short
echo ""

# Ask user if they want to continue
read -p "Do you want to add all files and commit? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Add all files
    echo "📝 Adding all files..."
    git add .
    echo "✅ Files added"
    echo ""
    
    # Ask for commit message
    read -p "Enter commit message (or press Enter for default): " commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="Initial commit: Full-stack portfolio with optimizations"
    fi
    
    # Commit
    echo "💾 Creating commit..."
    git commit -m "$commit_msg"
    echo "✅ Commit created"
    echo ""
    
    # Ask for GitHub repository URL
    echo "🔗 GitHub Repository Setup"
    echo "Please create a repository on GitHub first:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: portfolio-website"
    echo "   3. Make it Public or Private"
    echo "   4. DO NOT initialize with README"
    echo "   5. Click 'Create repository'"
    echo ""
    
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ No URL provided. Exiting..."
        exit 1
    fi
    
    # Check if remote already exists
    if git remote | grep -q "origin"; then
        echo "⚠️  Remote 'origin' already exists. Removing..."
        git remote remove origin
    fi
    
    # Add remote
    echo "🔗 Adding remote repository..."
    git remote add origin "$repo_url"
    echo "✅ Remote added"
    echo ""
    
    # Rename branch to main
    echo "🌿 Setting branch to main..."
    git branch -M main
    echo "✅ Branch set to main"
    echo ""
    
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    echo "⚠️  You may be asked for GitHub credentials"
    echo ""
    
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 SUCCESS! Your code is now on GitHub!"
        echo ""
        echo "📋 Next Steps:"
        echo "   1. Deploy Frontend to Vercel:"
        echo "      → Go to https://vercel.com"
        echo "      → Import your GitHub repository"
        echo "      → Set root directory to 'frontend'"
        echo ""
        echo "   2. Deploy Backend to Render:"
        echo "      → Go to https://render.com"
        echo "      → Create new Web Service"
        echo "      → Set root directory to 'backend'"
        echo ""
        echo "   3. Set up MongoDB Atlas:"
        echo "      → Go to https://www.mongodb.com/cloud/atlas"
        echo "      → Create free cluster"
        echo "      → Get connection string"
        echo ""
        echo "📖 For detailed instructions, see: GITHUB_DEPLOYMENT.md"
        echo ""
    else
        echo ""
        echo "❌ Push failed. Common issues:"
        echo "   1. Authentication failed:"
        echo "      → Use Personal Access Token instead of password"
        echo "      → Generate at: https://github.com/settings/tokens"
        echo ""
        echo "   2. Repository doesn't exist:"
        echo "      → Create repository on GitHub first"
        echo ""
        echo "   3. Permission denied:"
        echo "      → Check repository URL is correct"
        echo "      → Verify you have write access"
        echo ""
    fi
else
    echo "❌ Deployment cancelled"
    echo ""
    echo "To deploy manually, run:"
    echo "   git add ."
    echo "   git commit -m 'Your message'"
    echo "   git remote add origin YOUR_GITHUB_URL"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
fi
