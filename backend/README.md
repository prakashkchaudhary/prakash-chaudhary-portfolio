# Portfolio Backend API

RESTful API for the personal portfolio website built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your configuration

# Start development server
npm run dev

# Start production server
npm start
```

## 📡 API Endpoints

### Authentication

#### Register Admin (Disable in production!)
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Login Admin
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "email": "admin@example.com"
  }
}
```

### Projects

#### Get All Projects (Public)
```http
GET /api/projects
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "project_id",
      "title": "Project Title",
      "description": "Project description",
      "techStack": ["React", "Node.js"],
      "githubLink": "https://github.com/...",
      "liveLink": "https://project.com",
      "imageUrl": "https://image.url",
      "category": "web",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Project (Protected)
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Project Title",
  "description": "Project description",
  "techStack": ["React", "Node.js", "MongoDB"],
  "githubLink": "https://github.com/username/repo",
  "liveLink": "https://project.com",
  "imageUrl": "https://image.url",
  "category": "web"
}
```

#### Update Project (Protected)
```http
PUT /api/projects/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Project (Protected)
```http
DELETE /api/projects/:id
Authorization: Bearer {token}
```

### Contact

#### Send Contact Message (Public)
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

#### Get All Contact Messages (Protected)
```http
GET /api/contact
Authorization: Bearer {token}
```

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

Get the token by logging in through `/api/auth/login`.

## 🗄️ Database Models

### Admin
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  title: String (required),
  description: String (required),
  techStack: [String] (required),
  githubLink: String,
  liveLink: String,
  imageUrl: String (required),
  category: String (required, enum: ['web', 'mobile', 'desktop', 'other']),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  createdAt: Date
}
```

## ⚙️ Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS protection
- Error handling middleware

## 📝 Notes

- Remember to disable the `/api/auth/register` route in production
- Use strong JWT secrets (32+ characters)
- Keep your `.env` file secure and never commit it
- Regularly update dependencies for security patches
