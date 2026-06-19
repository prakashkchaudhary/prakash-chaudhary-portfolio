import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  loginRateLimiter,
  passwordResetLimiter,
  mfaVerificationLimiter,
  emailVerificationLimiter,
  checkAccountLock,
  logAuthEvent
} from '../middleware/securityMiddleware.js';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendMFASetupEmail
} from '../utils/emailService.js';

const router = express.Router();

// Generate JWT Token with shorter expiry
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d' // 7 days instead of 30
  });
};

// @route   POST /api/auth/login
// @desc    Admin login with MFA support
// @access  Public
router.post('/login', loginRateLimiter, checkAccountLock, [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('mfaCode').optional().isLength({ min: 6, max: 6 }).withMessage('MFA code must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password, mfaCode } = req.body;
    const clientIP = req.clientIP || req.ip;
    const userAgent = req.clientUserAgent || req.get('user-agent');

    // Check if admin exists
    const admin = await Admin.findOne({ email }).select('+password +mfaSecret');

    if (!admin) {
      logAuthEvent('login_failed', email, false, clientIP, { reason: 'user_not_found' });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      // Increment login attempts
      await admin.incLoginAttempts();
      await admin.addLoginHistory(clientIP, userAgent, false);
      
      logAuthEvent('login_failed', email, false, clientIP, { reason: 'invalid_password' });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // If MFA is enabled, verify the code
    if (admin.mfaEnabled && admin.mfaSecret) {
      if (!mfaCode) {
        return res.status(200).json({
          success: false,
          requiresMFA: true,
          message: 'MFA code required'
        });
      }

      const verified = speakeasy.totp.verify({
        secret: admin.mfaSecret,
        encoding: 'base32',
        token: mfaCode,
        window: 2 // Allow 2 time steps before/after current time
      });

      if (!verified) {
        await admin.addLoginHistory(clientIP, userAgent, false);
        logAuthEvent('login_failed', email, false, clientIP, { reason: 'invalid_mfa' });
        
        return res.status(401).json({
          success: false,
          message: 'Invalid MFA code'
        });
      }
    }

    // Successful login - reset login attempts
    await admin.resetLoginAttempts();
    
    // Update last login
    admin.lastLogin = new Date();
    admin.lastLoginIP = clientIP;
    await admin.save();
    
    // Add successful login to history
    await admin.addLoginHistory(clientIP, userAgent, true);

    // Generate token
    const token = generateToken(admin._id);

    // Create session
    const sessionId = uuidv4();
    admin.activeSessions.push({
      sessionId,
      createdAt: new Date(),
      lastActivity: new Date(),
      ip: clientIP,
      userAgent
    });
    await admin.save();

    logAuthEvent('login_success', email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      sessionId,
      admin: {
        id: admin._id,
        email: admin.email,
        mfaEnabled: admin.mfaEnabled,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/register (DISABLED FOR SECURITY)
// @desc    Register admin - ONLY enable temporarily when you need to create an admin
// @access  Public (DISABLE THIS IN PRODUCTION)
router.post('/register', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 12 })
    .withMessage('Password must be at least 12 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
], async (req, res) => {
  // SECURITY: Disable registration in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      success: false,
      message: 'Registration is disabled. Contact system administrator.'
    });
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Create admin
    const admin = await Admin.create({
      email,
      password,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      emailVerified: false
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    // Generate token
    const token = generateToken(admin._id);

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('register_success', email, true, clientIP);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully. Please check your email to verify your account.',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        emailVerified: admin.emailVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify email address
// @access  Public
router.post('/verify-email', emailVerificationLimiter, [
  body('token').notEmpty().withMessage('Verification token is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { token } = req.body;
    
    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find admin with matching token
    const admin = await Admin.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Verify email
    admin.emailVerified = true;
    admin.emailVerificationToken = undefined;
    admin.emailVerificationExpires = undefined;
    await admin.save();

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('email_verified', admin.email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', passwordResetLimiter, [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    // Always return success to prevent email enumeration
    if (!admin) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists with that email, a password reset link has been sent.'
      });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save token to database
    admin.passwordResetToken = hashedToken;
    admin.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await admin.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
    }

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('password_reset_requested', email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 12 })
    .withMessage('Password must be at least 12 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { token, password } = req.body;
    
    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find admin with matching token
    const admin = await Admin.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires');

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    admin.password = password;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    
    // Reset login attempts if account was locked
    admin.loginAttempts = 0;
    admin.accountLocked = false;
    admin.lockUntil = undefined;
    
    await admin.save();

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('password_reset_success', admin.email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
});

// @route   POST /api/auth/mfa/setup
// @desc    Setup MFA for admin
// @access  Private
router.post('/mfa/setup', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('+mfaSecret');

    if (admin.mfaEnabled) {
      return res.status(400).json({
        success: false,
        message: 'MFA is already enabled'
      });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Portfolio Admin (${admin.email})`,
      issuer: 'Portfolio Admin',
      length: 32
    });

    // Save secret temporarily (not enabled yet)
    admin.mfaSecret = secret.base32;
    await admin.save();

    // Generate QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('mfa_setup_initiated', admin.email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'MFA setup initiated. Scan the QR code with your authenticator app.',
      secret: secret.base32,
      qrCode: qrCodeUrl,
      manualEntry: {
        issuer: 'Portfolio Admin',
        account: admin.email,
        secret: secret.base32
      }
    });
  } catch (error) {
    console.error('MFA setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during MFA setup'
    });
  }
});

// @route   POST /api/auth/mfa/verify
// @desc    Verify and enable MFA
// @access  Private
router.post('/mfa/verify', protect, mfaVerificationLimiter, [
  body('code').isLength({ min: 6, max: 6 }).withMessage('MFA code must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { code } = req.body;
    const admin = await Admin.findById(req.admin._id).select('+mfaSecret');

    if (!admin.mfaSecret) {
      return res.status(400).json({
        success: false,
        message: 'Please setup MFA first'
      });
    }

    // Verify the code
    const verified = speakeasy.totp.verify({
      secret: admin.mfaSecret,
      encoding: 'base32',
      token: code,
      window: 2
    });

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid MFA code'
      });
    }

    // Enable MFA
    admin.mfaEnabled = true;
    await admin.save();

    // Send confirmation email
    try {
      await sendMFASetupEmail(admin.email);
    } catch (emailError) {
      console.error('Failed to send MFA confirmation email:', emailError);
    }

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('mfa_enabled', admin.email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'MFA enabled successfully'
    });
  } catch (error) {
    console.error('MFA verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during MFA verification'
    });
  }
});

// @route   POST /api/auth/mfa/disable
// @desc    Disable MFA
// @access  Private
router.post('/mfa/disable', protect, [
  body('password').notEmpty().withMessage('Password is required to disable MFA')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { password } = req.body;
    const admin = await Admin.findById(req.admin._id).select('+password +mfaSecret');

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Disable MFA
    admin.mfaEnabled = false;
    admin.mfaSecret = undefined;
    await admin.save();

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('mfa_disabled', admin.email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'MFA disabled successfully'
    });
  } catch (error) {
    console.error('MFA disable error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during MFA disable'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout admin (invalidate session)
// @access  Private
router.post('/logout', protect, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (sessionId) {
      // Remove specific session
      admin.activeSessions = admin.activeSessions.filter(
        session => session.sessionId !== sessionId
      );
    } else {
      // Remove all sessions
      admin.activeSessions = [];
    }

    await admin.save();

    const clientIP = req.clientIP || req.ip;
    logAuthEvent('logout', admin.email, true, clientIP);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

// @route   GET /api/auth/security-info
// @desc    Get security information for current admin
// @access  Private
router.get('/security-info', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.status(200).json({
      success: true,
      data: {
        email: admin.email,
        mfaEnabled: admin.mfaEnabled,
        emailVerified: admin.emailVerified,
        lastLogin: admin.lastLogin,
        lastLoginIP: admin.lastLoginIP,
        activeSessions: admin.activeSessions.length,
        loginHistory: admin.loginHistory.slice(-10), // Last 10 login attempts
        accountStatus: admin.accountLocked ? 'locked' : 'active',
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    console.error('Security info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching security information'
    });
  }
});

export default router;
