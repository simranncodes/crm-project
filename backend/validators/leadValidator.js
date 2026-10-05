import { body, query } from 'express-validator';

/**
 * Validation rules for POST /api/leads (public lead submission)
 */
export const createLeadValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({ gmail_remove_dots: false }),
  body('PhoneNo')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{10,15}$/)
    .withMessage('Phone number must be 10 to 15 digits'),
  body('budget')
    .notEmpty()
    .withMessage('Budget range is required')
    .isIn(['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'])
    .withMessage('Please select a valid budget range'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

/**
 * Validation rules for GET /api/leads (query params: page, limit, search, status)
 */
export const getLeadsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['New', 'Contacted', 'Closed']).withMessage('Invalid status filter'),
  query('search').optional().trim().isLength({ max: 100 }).withMessage('Search term too long'),
];

/**
 * Validation rules for PATCH /api/leads/:id (status update)
 */
export const updateLeadValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['New', 'Contacted', 'Closed'])
    .withMessage('Status must be one of: New, Contacted, Closed'),
];
