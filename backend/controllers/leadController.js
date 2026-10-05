import { validationResult } from 'express-validator';
import Lead from '../models/Lead.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @route   POST /api/leads
 * @desc    Create a new lead (public lead capture form)
 * @access  Public
 */
export const createLead = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
  }

  const { name, email, PhoneNo, budget, message } = req.body;

  const lead = await Lead.create({ name, email, PhoneNo, budget, message });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your submission has been received.',
    data: lead,
  });
});

/**
 * @route   GET /api/leads
 * @desc    Get paginated, searchable, filterable list of leads
 * @access  Private (admin only)
 * @query   page, limit, search, status
 */
export const getLeads = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.search && req.query.search.trim()) {
    const escaped = req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }

  const [leads, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Lead.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: leads,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

/**
 * @route   PATCH /api/leads/:id
 * @desc    Update a lead's status
 * @access  Private (admin only)
 */
export const updateLead = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
  }

  const { id } = req.params;
  const { status } = req.body;

  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Lead updated successfully',
    data: lead,
  });
});
