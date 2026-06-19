import rateLimit from 'express-rate-limit';
import Admin from '../models/Admin.js';

// IP-based rate limiting for login attempts
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
      retryAfter: '15 minutes'
    });
  }
});

// Strict rate limiter for password reset
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: {
    success: false,
    message: 'Too many password reset attempts. Please try again after 1 hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// MFA verification rate limiter
export const mfaVerificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts
  message: {
    success: false,
    message: 'Too many MFA verification attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Email verification rate limiter
export const emailVerificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: {
    success: false,
    message: 'Too many verification email requests. Please try again after 1 hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Check if account is locked
export const checkAccountLock = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return next();
    }
    
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return next();
    }
    
    if (admin.isLocked()) {
      const lockTimeRemaining = Math.ceil((admin.lockUntil - Date.now()) / 60000); // minutes
      return res.status(423).json({
        success: false,
        message: `Account is locked due to too many failed login attempts. Try again in ${lockTimeRemaining} minutes.`,
        lockTimeRemaining: lockTimeRemaining
      });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Session management middleware
export const sessionManager = (req, res, next) => {
  // Regenerate session ID after login (prevents session fixation)
  if (req.session && req.path.includes('/login') && req.method === 'POST') {
    req.session.regenerate((err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  } else {
    next();
  }
};

// Detect suspicious activity
export const detectSuspiciousActivity = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || 'unknown';
    
    // Log suspicious patterns
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /scanner/i,
      /curl/i,
      /wget/i
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));
    
    if (isSuspicious) {
      console.warn(`🚨 SUSPICIOUS ACTIVITY DETECTED:`, {
        ip,
        userAgent,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
      });
      
      // You can implement additional blocking logic here
      // For now, we'll just log it
    }
    
    // Attach IP and userAgent to request for use in routes
    req.clientIP = ip;
    req.clientUserAgent = userAgent;
    
    next();
  } catch (error) {
    next(error);
  }
};

// Input sanitization middleware
export const sanitizeInput = (req, res, next) => {
  // Remove any potential XSS attempts from request body
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove script tags and dangerous HTML
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
      }
    });
  }
  next();
};

// Prevent parameter pollution
export const preventParameterPollution = (req, res, next) => {
  // Ensure query parameters are not arrays when they shouldn't be
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (Array.isArray(req.query[key])) {
        req.query[key] = req.query[key][0];
      }
    });
  }
  next();
};

// Enhanced security headers
export const securityHeaders = (req, res, next) => {
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://prakash-chaudhary-portfolio.vercel.app; " +
    "frame-ancestors 'none';"
  );
  
  // Additional security headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // HSTS (HTTP Strict Transport Security) for production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  next();
};

// Log all authentication events
export const logAuthEvent = (eventType, email, success, ip, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    eventType, // 'login', 'logout', 'password_reset', 'mfa_setup', etc.
    email,
    success,
    ip,
    ...details
  };
  
  // In production, you would send this to a logging service
  console.log('🔐 AUTH EVENT:', JSON.stringify(logEntry));
  
  // You can implement additional logging here (e.g., to a file or external service)
};

export default {
  loginRateLimiter,
  passwordResetLimiter,
  mfaVerificationLimiter,
  emailVerificationLimiter,
  checkAccountLock,
  sessionManager,
  detectSuspiciousActivity,
  sanitizeInput,
  preventParameterPollution,
  securityHeaders,
  logAuthEvent
};
