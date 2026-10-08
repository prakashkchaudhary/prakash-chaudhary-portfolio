import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import session from 'express-session';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import {
  detectSuspiciousActivity,
  sanitizeInput,
  preventParameterPollution,
  securityHeaders,
  apiRateLimiter
} from './middleware/securityMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(securityHeaders); // Custom security headers
app.use(mongoSanitize()); // Prevent MongoDB injection
app.use(detectSuspiciousActivity); // Detect bots and suspicious traffic
app.use(sanitizeInput); // Sanitize user input
app.use(preventParameterPollution); // Prevent parameter pollution

// Session Management
app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict'
  },
  name: 'sessionId' // Don't use default 'connect.sid'
}));

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// Compression middleware - compress all responses
app.use(compression());

// Apply enhanced API rate limiting to all API routes
app.use('/api/', apiRateLimiter);

// CORS configuration - strict origin whitelist
const allowedOrigins = [
  'https://prakash-chaudhary-portfolio.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

// Only add localhost origins in development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:5173');
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.) only in development
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

// Body parser middleware with secure size limits
app.use(express.json({ limit: '5mb' })); // Reduced from 10mb
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Health check routes - minimal information disclosure
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running',
    status: 'healthy',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  // Basic health check without revealing sensitive system information
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Routes with specific size limits for better security
app.use('/api/contact', express.json({ limit: '1mb' }), contactRoutes);
app.use('/api/projects', express.json({ limit: '2mb' }), projectRoutes);
app.use('/api/auth', express.json({ limit: '100kb' }), authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
