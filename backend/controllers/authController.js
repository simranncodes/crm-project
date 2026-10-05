import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin and set JWT httpOnly cookie
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
  }

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  generateToken(res, admin._id);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
});

/**
 * @route   POST /api/auth/logout
 * @desc    Clear auth cookie
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get the currently authenticated admin
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
    },
  });
});
