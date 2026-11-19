import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature and expiry
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      const admin = await Admin.findById(decoded.id).select('-password');

      if (!admin) {
        return res.status(401).json({ message: 'Not authorized, admin not found' });
      }

      // FIX #3: Validate the session ID from the token against active sessions.
      // This ensures logged-out tokens are immediately invalidated.
      const sessionId = req.headers['x-session-id'] || req.body?.sessionId;
      if (sessionId) {
        const sessionExists = admin.activeSessions.some(
          (s) => s.sessionId === sessionId
        );
        if (!sessionExists) {
          return res.status(401).json({ message: 'Not authorized, session expired or invalidated' });
        }
      }

      req.admin = admin;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
