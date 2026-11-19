import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/authMiddleware.js';
import { contactRateLimiter } from '../middleware/securityMiddleware.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a contact message
// @access  Public
router.post('/', contactRateLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
  body('email').isEmail().withMessage('Valid email is required').isLength({ max: 254 }).withMessage('Email too long'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }).withMessage('Subject too long'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }).withMessage('Message too long (max 2000 characters)')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    await Contact.create({ name, email, subject, message });

    // FIX #2: Never return the database document — no data leakage
    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    // FIX #10: Never expose error.message to the client
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (Admin only)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    // FIX #10: Never expose error.message to the client
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages.'
    });
  }
});

export default router;
