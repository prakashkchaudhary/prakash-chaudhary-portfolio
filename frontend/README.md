# Portfolio Frontend

Modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your API URL

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Footer.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   └── PrivateRoute.jsx
├── context/            # React context providers
│   └── ThemeContext.jsx
├── pages/              # Page components
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   └── AdminLogin.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Resume.jsx
│   └── Skills.jsx
├── utils/              # Utility functions
│   └── api.js
├── App.jsx             # Main app component
├── index.css           # Global styles
└── main.jsx            # App entry point
```

## 🎨 Features

- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme toggle with persistence
- **Smooth Animations** - Framer Motion animations
- **Toast Notifications** - User feedback with react-hot-toast
- **Protected Routes** - Admin dashboard with authentication
- **Modern UI** - Tailwind CSS styling
- **Fast Performance** - Vite build tool

## 🛠️ Customization

### Update Personal Information

1. **Home Page** (`src/pages/Home.jsx`)
   - Line 13: Update your name
   - Line 18: Update your title
   - Line 21: Update your bio
   - Lines 35-50: Update social links

2. **About Page** (`src/pages/About.jsx`)
   - Lines 60-75: Update your story
   - Line 90: Update profile image

3. **Skills Page** (`src/pages/Skills.jsx`)
   - Lines 13-50: Update skills and proficiency
   - Lines 120-160: Update experience

4. **Contact Page** (`src/pages/Contact.jsx`)
   - Lines 40-60: Update contact information

5. **Footer** (`src/components/Footer.jsx`)
   - Lines 8-13: Update social media links

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Update these hex values
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... etc
      }
    }
  }
}
```

### Add New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```
3. Add navigation link in `src/components/Navbar.jsx`

## 🔧 Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📦 Dependencies

### Core
- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Routing
- **vite** - Build tool

### UI & Styling
- **tailwindcss** - Utility-first CSS
- **framer-motion** - Animation library
- **react-icons** - Icon library

### Utilities
- **axios** - HTTP client
- **react-hot-toast** - Toast notifications

## 🌐 Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update with your deployed backend URL.

## 🎯 Pages Overview

### Public Pages
- **Home** (`/`) - Hero section with introduction
- **About** (`/about`) - Personal story and values
- **Skills** (`/skills`) - Technical skills and experience
- **Projects** (`/projects`) - Portfolio projects
- **Contact** (`/contact`) - Contact form
- **Resume** (`/resume`) - Education and work history

### Admin Pages
- **Login** (`/admin/login`) - Admin authentication
- **Dashboard** (`/admin/dashboard`) - Manage projects and view messages

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access dashboard to manage content

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🎨 Color Scheme

The site uses a primary blue color scheme with purple accents:
- Primary: Blue (#0284c7)
- Secondary: Purple (#9333ea)
- Background: White/Gray-900 (light/dark mode)

## ⚡ Performance Tips

- Images are lazy-loaded
- Code splitting with React Router
- Optimized animations with Framer Motion
- Tailwind CSS purges unused styles in production

## 🐛 Troubleshooting

**Issue**: API calls failing
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check browser console for errors

**Issue**: Dark mode not persisting
- Check localStorage in browser DevTools
- Clear browser cache and try again

**Issue**: Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for TypeScript errors

## 📝 Notes

- All API calls are in `src/utils/api.js`
- Theme context is in `src/context/ThemeContext.jsx`
- Protected routes use `src/components/PrivateRoute.jsx`
- Toast notifications are configured in `src/App.jsx`
