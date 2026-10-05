/**
 * Handles requests to routes that don't exist.
 * Must be registered after all valid routes but before the error handler.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;
