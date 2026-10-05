/**
 * Wraps an async route handler and forwards any rejected promise
 * to Express's error-handling middleware via next(err).
 * This avoids repetitive try/catch blocks in every controller.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
