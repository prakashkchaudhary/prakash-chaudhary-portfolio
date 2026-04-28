@echo off
REM Portfolio Website - GitHub Deployment Script (Windows)
REM This script helps you deploy your portfolio to GitHub

echo.
echo ========================================
echo   Portfolio Website - GitHub Deployment
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed. Please install Git first:
    echo         Download from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if already initialized
if exist .git (
    echo [WARNING] Git repository already initialized
    echo.
) else (
    echo [INFO] Initializing Git repository...
    git init
    echo [OK] Git repository initialized
    echo.
)

REM Configure Git user (if not already configured)
git config user.name >nul 2>&1
if errorlevel 1 (
    echo [INFO] Configuring Git user...
    git config user.name "Prakash Chaudhary"
    git config user.email "prakashchaudhary92290@gmail.com"
    echo [OK] Git user configured
    echo.
)

REM Show current status
echo [INFO] Current Git Status:
git status --short
echo.

REM Ask user if they want to continue
set /p continue="Do you want to add all files and commit? (y/n): "
if /i not "%continue%"=="y" goto :cancel

REM Add all files
echo [INFO] Adding all files...
git add .
echo [OK] Files added
echo.

REM Ask for commit message
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Initial commit: Full-stack portfolio with optimizations

REM Commit
echo [INFO] Creating commit...
git commit -m "%commit_msg%"
echo [OK] Commit created
echo.

REM GitHub repository setup instructions
echo ========================================
echo   GitHub Repository Setup
echo ========================================
echo.
echo Please create a repository on GitHub first:
echo   1. Go to https://github.com/new
echo   2. Repository name: portfolio-website
echo   3. Make it Public or Private
echo   4. DO NOT initialize with README
echo   5. Click 'Create repository'
echo.

set /p repo_url="Enter your GitHub repository URL: "
if "%repo_url%"=="" (
    echo [ERROR] No URL provided. Exiting...
    pause
    exit /b 1
)

REM Check if remote already exists
git remote | findstr "origin" >nul 2>&1
if not errorlevel 1 (
    echo [WARNING] Remote 'origin' already exists. Removing...
    git remote remove origin
)

REM Add remote
echo [INFO] Adding remote repository...
git remote add origin %repo_url%
echo [OK] Remote added
echo.

REM Rename branch to main
echo [INFO] Setting branch to main...
git branch -M main
echo [OK] Branch set to main
echo.

REM Push to GitHub
echo [INFO] Pushing to GitHub...
echo [WARNING] You may be asked for GitHub credentials
echo.

git push -u origin main

if errorlevel 1 goto :push_failed

echo.
echo ========================================
echo   SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Deploy Frontend to Vercel:
echo    - Go to https://vercel.com
echo    - Import your GitHub repository
echo    - Set root directory to 'frontend'
echo.
echo 2. Deploy Backend to Render:
echo    - Go to https://render.com
echo    - Create new Web Service
echo    - Set root directory to 'backend'
echo.
echo 3. Set up MongoDB Atlas:
echo    - Go to https://www.mongodb.com/cloud/atlas
echo    - Create free cluster
echo    - Get connection string
echo.
echo For detailed instructions, see: GITHUB_DEPLOYMENT.md
echo.
pause
exit /b 0

:push_failed
echo.
echo ========================================
echo   Push Failed - Common Issues
echo ========================================
echo.
echo 1. Authentication failed:
echo    - Use Personal Access Token instead of password
echo    - Generate at: https://github.com/settings/tokens
echo.
echo 2. Repository doesn't exist:
echo    - Create repository on GitHub first
echo.
echo 3. Permission denied:
echo    - Check repository URL is correct
echo    - Verify you have write access
echo.
pause
exit /b 1

:cancel
echo.
echo [INFO] Deployment cancelled
echo.
echo To deploy manually, run:
echo    git add .
echo    git commit -m "Your message"
echo    git remote add origin YOUR_GITHUB_URL
echo    git branch -M main
echo    git push -u origin main
echo.
pause
exit /b 0
