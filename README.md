# Personal Portfolio Website

A modern, full-stack personal portfolio website built with React, Node.js, Express, and MongoDB. Features a beautiful responsive design with dark/light mode, admin dashboard for content management, and contact form functionality.

## 🚀 Features

### Frontend
- ⚡ Built with React 18 + Vite for blazing fast performance
- 🎨 Styled with Tailwind CSS for modern, responsive design
- 🌓 Dark/Light mode toggle with persistent theme
- ✨ Smooth animations using Framer Motion
- 📱 Fully responsive mobile-first design
- 🎯 Multiple sections: Home, About, Skills, Projects, Contact, Resume
- 🔐 Protected admin dashboard
- 🎨 Toast notifications for user feedback
- 🚀 Optimized loading states
- ⚡ **Performance Optimizations:**
  - Code splitting with React.lazy() for all routes
  - Image lazy loading with Intersection Observer
  - Vendor chunking for better caching
  - Minification and tree shaking
  - Optimized bundle size
  - Pre-bundled dependencies

### Backend
- 🛠️ Node.js + Express.js REST API
- 🗄️ MongoDB database with Mongoose ODM
- 🔒 JWT authentication for admin access
- 🔐 Password hashing with bcrypt
- ✅ Input validation with express-validator
- 🌐 CORS enabled for cross-origin requests
- 📧 Contact form message storage
- 📁 Full CRUD operations for projects
- ⚡ **Production-Ready Optimizations:**
  - Response compression (Gzip)
  - In-memory caching with auto-invalidation
  - Database indexing and query optimization
  - Rate limiting (100 req/15min general, 5 req/15min auth)
  - Security headers with Helmet.js
  - MongoDB injection prevention
  - Health check endpoints
  - Graceful shutdown handling

### Admin Dashboard
- 🔑 Secure login with JWT tokens
- ➕ Add, edit, and delete projects
- 📬 View contact form submissions
- 🎨 Modern, intuitive interface
- 📊 Real-time data management

## 📁 Project Structure

```
portfolio-website/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Contact.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   └── projectRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Footer.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   └── AdminLogin.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Home.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Resume.jsx
    │   │   └── Skills.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd portfolio-website/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
copy .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd portfolio-website/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
copy .env.example .env
```

4. Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Creating First Admin

After starting the backend server, create your first admin account:

### Using curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"yourpassword\"}"
```

### Using Postman:
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Important:** For security, disable the `/api/auth/register` route in production after creating your admin account.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin (disable in production)
- `POST /api/auth/login` - Admin login

### Projects (Public)
- `GET /api/projects` - Get all projects

### Projects (Protected - Admin Only)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (Admin only)

## 🎨 Customization

### Update Personal Information

1. **Home Page** (`frontend/src/pages/Home.jsx`):
   - Update your name, title, and bio
   - Add your social media links

2. **About Page** (`frontend/src/pages/About.jsx`):
   - Update your story and profile image
   - Customize features section

3. **Skills Page** (`frontend/src/pages/Skills.jsx`):
   - Add/remove skills and proficiency levels
   - Update experience section

4. **Contact Page** (`frontend/src/pages/Contact.jsx`):
   - Update contact information
   - Customize email, phone, and location

5. **Footer** (`frontend/src/components/Footer.jsx`):
   - Update social media links

### Theme Colors

Edit `frontend/tailwind.config.js` to change the primary color scheme:
```javascript
colors: {
  primary: {
    // Update these values
    600: '#0284c7',
    // ...
  }
}
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

See [OPTIMIZATION_GUIDE.md](./OPTIMIZATION_GUIDE.md) for detailed information about:
- Performance optimizations
- Security features
- Caching strategies
- Testing procedures
- Monitoring recommendations

## 📦 Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Axios
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS
- dotenv
- helmet
- express-rate-limit
- express-mongo-sanitize
- compression

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👤 Author

Prakash Chaudhary
- Email: prakashchaudhary92290@gmail.com
- GitHub: [@prakashkchaudhary](https://github.com/prakashkchaudhary)
- LinkedIn: [Prakash Chaudhary](https://www.linkedin.com/in/prakash-chaudhary-232231401)
- Location: Kathmandu, Nepal 🇳🇵

## ⭐ Show your support

Give a ⭐️ if you like this project!
