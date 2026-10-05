import { body } from 'express-validator';

/**
 * Validation rules for POST /api/auth/login
 * Server-side validation is authoritative; never trust the client.
 */
export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({ gmail_remove_dots: false }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
