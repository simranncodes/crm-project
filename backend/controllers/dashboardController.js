import Lead from '../models/Lead.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @route   GET /api/dashboard/stats
 * @desc    Aggregate counts for dashboard statistics cards
 * @access  Private (admin only)
 */
export const getStats = asyncHandler(async (req, res) => {
  const [total, newCount, contactedCount, closedCount] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'New' }),
    Lead.countDocuments({ status: 'Contacted' }),
    Lead.countDocuments({ status: 'Closed' }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      total,
      new: newCount,
      contacted: contactedCount,
      closed: closedCount,
    },
  });
});
