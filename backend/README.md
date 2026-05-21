# Portfolio Backend API

RESTful API for the personal portfolio website built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Update .env with your configuration (see .env.example)

# Start development server
npm run dev

# Start production server
npm start
```

## 📡 API Documentation

For detailed API endpoint documentation, request/response examples, and authentication details, please refer to the API documentation in your development environment or contact the repository owner.

## 🗄️ Database Models

See `models/` directory for complete schema definitions.

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

- See `SECURITY.md` for security best practices
- Keep your `.env` file secure and never commit it
- Regularly update dependencies for security patches
- Admin registration is disabled in production for security
