import rateLimit from 'express-rate-limit';
import Admin from '../models/Admin.js';

// Enhanced rate limiting with different tiers
const createRateLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  skipSuccessfulRequests: true,
  message: { success: false, message },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = Math.ceil(windowMs / 60000); // minutes
    res.status(429).json({
      success: false,
      message,
      retryAfter: `${retryAfter} minutes`
    });
  }
});

// IP-based rate limiting for login attempts (Enhanced)
export const loginRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts per IP
  'Too many login attempts from this IP. Please try again after 15 minutes.'
);

// Strict rate limiter for password reset (Enhanced)
export const passwordResetLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  3, // 3 attempts per hour
  'Too many password reset attempts. Please try again after 1 hour.'
);

// MFA verification rate limiter (Enhanced)
export const mfaVerificationLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  10, // 10 attempts
  'Too many MFA verification attempts. Please try again later.'
);

// Email verification rate limiter (Enhanced)
export const emailVerificationLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  5, // 5 attempts per hour
  'Too many verification email requests. Please try again after 1 hour.'
);

// General API rate limiter
export const apiRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests per IP
  'Too many API requests. Please try again later.'
);

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

// Enhanced security headers with additional protections
export const securityHeaders = (req, res, next) => {
  // Content Security Policy (Enhanced)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "connect-src 'self' https://prakash-chaudhary-portfolio.vercel.app https://prakash-chaudhary-portfolio-1.onrender.com; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "upgrade-insecure-requests; " +
    "block-all-mixed-content;"
  );
  
  // Enhanced security headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), midi=(), sync-xhr=(), fullscreen=(self)');
  
  // Certificate Transparency
  res.setHeader('Expect-CT', 'enforce, max-age=86400, report-uri="/api/ct-report"');
  
  // HSTS (HTTP Strict Transport Security) for production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  
  // Cross-Origin policies (Enhanced)
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  
  // Additional security headers
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  
  // Remove server information
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  
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
