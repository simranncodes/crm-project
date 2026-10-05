import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import asyncHandler from './asyncHandler.js';

/**
 * Protects routes by verifying the JWT stored in the httpOnly cookie.
 * Attaches the authenticated admin to req.admin on success.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized. Admin no longer exists.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Not authorized. Invalid token.' });
  }
});
