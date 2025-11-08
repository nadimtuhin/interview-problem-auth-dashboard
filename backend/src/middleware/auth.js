const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
async function authenticateToken(req, res, next) {
  try {
    // TODO: TASK 1 - Implement JWT Token Verification
    //
    // Steps to implement:
    // 1. Extract token from Authorization header (format: "Bearer TOKEN")
    //    Hint: const authHeader = req.headers['authorization'];
    //    Hint: const token = authHeader && authHeader.split(' ')[1];
    //
    // 2. If no token, return 401 with message "Access token required"
    //
    // 3. Verify token using jwt.verify(token, process.env.JWT_SECRET)
    //    Hint: const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //
    // 4. Find user by ID from decoded token
    //    Hint: const user = User.findById(decoded.userId);
    //
    // 5. If user not found, return 401 with message "User not found"
    //
    // 6. Attach sanitized user to req.user
    //    Hint: req.user = User.sanitize(user);
    //
    // 7. Call next() to continue to route handler

    // REMOVE THIS when implementing:
    return res.status(401).json({ error: 'Authentication not implemented yet' });

  } catch (error) {
    console.error('Auth middleware error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }

    return res.status(500).json({ error: 'Authentication failed' });
  }
}

/**
 * Authorization middleware - Check if user has required role
 * @param {string[]} roles - Array of allowed roles
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    // TODO: TASK 3 - Implement Role-Based Authorization (Optional Enhancement)
    //
    // This middleware should check if req.user.role is in the allowed roles array
    // If not, return 403 with message "Insufficient permissions"
    //
    // Steps:
    // 1. Check if req.user exists (should be set by authenticateToken middleware)
    // 2. Check if req.user.role is in the roles array
    // 3. If not authorized, return 403
    // 4. If authorized, call next()

    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
