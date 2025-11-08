const express = require('express');
const User = require('../models/User');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/dashboard/user
 * Get user dashboard data (accessible by all authenticated users)
 */
router.get('/user', authenticateToken, async (req, res) => {
  try {
    // TODO: TASK 3 - Implement User Dashboard Data
    //
    // This endpoint should return personalized data for the logged-in user
    //
    // Data to return:
    // - User profile information (from req.user)
    // - User statistics (account age, last login, etc.)
    // - Any user-specific data
    //
    // Example response:
    // {
    //   "user": req.user,
    //   "stats": {
    //     "accountAge": "X days",
    //     "role": req.user.role
    //   },
    //   "message": "Welcome to your dashboard!"
    // }

    // REMOVE THIS when implementing:
    res.json({
      message: 'User dashboard endpoint not fully implemented',
      user: req.user
    });

  } catch (error) {
    console.error('User dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

/**
 * GET /api/dashboard/admin
 * Get admin dashboard data (admin only)
 */
router.get('/admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    // TODO: TASK 3 - Implement Admin Dashboard Data
    //
    // This endpoint should return admin-specific data
    //
    // Steps:
    // 1. Get all users using User.findAll()
    // 2. Get user statistics using User.getStats()
    // 3. Return comprehensive admin data
    //
    // Example response:
    // {
    //   "users": [...all users...],
    //   "stats": {
    //     "total": 10,
    //     "admins": 2,
    //     "users": 8
    //   },
    //   "message": "Admin dashboard data"
    // }
    //
    // Security Note: This route is protected by authorizeRoles('admin')
    // Only users with role='admin' can access this endpoint

    // REMOVE THIS when implementing:
    res.json({
      message: 'Admin dashboard endpoint not fully implemented',
      admin: req.user
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to load admin dashboard' });
  }
});

module.exports = router;
