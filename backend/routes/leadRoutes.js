import express from 'express';
import { createLead, getLeads, updateLead } from '../controllers/leadController.js';
import { createLeadValidator, getLeadsValidator, updateLeadValidator } from '../validators/leadValidator.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: visitors submit leads via the landing page form
router.post('/', createLeadValidator, createLead);

// Private: admin-only lead management
router.get('/', protect, getLeadsValidator, getLeads);
router.patch('/:id', protect, updateLeadValidator, updateLead);

export default router;
