import mongoose from 'mongoose';
import argon2 from 'argon2';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 12, // Increased to 12 characters for enterprise security
    select: false
  },
  // MFA (Multi-Factor Authentication)
  mfaEnabled: {
    type: Boolean,
    default: false
  },
  mfaSecret: {
    type: String,
    select: false
  },
  // Email Verification
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  emailVerificationExpires: {
    type: Date,
    select: false
  },
  // Password Reset
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  // Account Security
  loginAttempts: {
    type: Number,
    default: 0
  },
  accountLocked: {
    type: Boolean,
    default: false
  },
  lockUntil: {
    type: Date
  },
  lastLogin: {
    type: Date
  },
  lastLoginIP: {
    type: String
  },
  // Security Audit Trail
  loginHistory: [{
    ip: String,
    userAgent: String,
    timestamp: Date,
    success: Boolean
  }],
  // Session Management
  activeSessions: [{
    sessionId: String,
    createdAt: Date,
    lastActivity: Date,
    ip: String,
    userAgent: String
  }]
}, {
  timestamps: true
});

// Hash password before saving using Argon2
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  // Use Argon2 for password hashing (more secure than bcrypt)
  this.password = await argon2.hash(this.password);
});

// Compare password method using Argon2
adminSchema.methods.comparePassword = async function(enteredPassword) {
  try {
    return await argon2.verify(this.password, enteredPassword);
  } catch (error) {
    return false;
  }
};

// Check if account is locked
adminSchema.methods.isLocked = function() {
  return this.accountLocked && this.lockUntil && this.lockUntil > Date.now();
};

// Increment login attempts and lock account if needed
adminSchema.methods.incLoginAttempts = async function() {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1, accountLocked: 1 }
    });
  }
  
  // Increment login attempts
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 30 minutes
  const maxAttempts = 5;
  const lockTime = 30 * 60 * 1000; // 30 minutes
  
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked()) {
    updates.$set = { 
      accountLocked: true,
      lockUntil: Date.now() + lockTime 
    };
  }
  
  return this.updateOne(updates);
};

// Reset login attempts on successful login
adminSchema.methods.resetLoginAttempts = async function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1, accountLocked: 1 }
  });
};

// Add login history entry
adminSchema.methods.addLoginHistory = async function(ip, userAgent, success) {
  const history = {
    ip,
    userAgent,
    timestamp: new Date(),
    success
  };
  
  // Keep only last 50 login attempts
  if (this.loginHistory.length >= 50) {
    this.loginHistory.shift();
  }
  
  this.loginHistory.push(history);
  await this.save();
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
