const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword, comparePassword, validatePassword } = require('../utils/password');

const router = express.Router();

/**
 * POST /api/auth/signup
 * Create new user account
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.message });
    }

    // Check if user already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password (PRE-IMPLEMENTED)
    const password_hash = await hashPassword(password);

    // Create user
    const newUser = User.create({
      email,
      password_hash,
      name,
      role: 'user' // Default role
    });

    // TODO: TASK 1 - Generate JWT Token for Signup
    //
    // After creating the user, you need to generate a JWT token
    // so the user is automatically logged in after signup.
    //
    // Steps:
    // 1. Create JWT payload with user information:
    //    const payload = { userId: newUser.id, email: newUser.email, role: newUser.role };
    //
    // 2. Sign the token using jwt.sign():
    //    const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    //    });
    //
    // 3. Return response with token and user data:
    //    res.status(201).json({
    //      message: 'User created successfully',
    //      token,
    //      user: User.sanitize(newUser)
    //    });
    //
    // Security Note: Never include password_hash in the response!
    // The User.sanitize() method removes it for you.

    // REMOVE THIS when implementing JWT:
    res.status(201).json({
      message: 'User created successfully (TODO: Add JWT token)',
      user: User.sanitize(newUser)
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: TASK 1 - Implement Login with JWT
    //
    // This is the main authentication endpoint. You need to:
    //
    // Step 1: Validate input
    //   - Check if email and password are provided
    //   - Return 400 if missing
    //
    // Step 2: Find user by email
    //   - Use: const user = User.findByEmail(email);
    //   - Return 401 with message "Invalid credentials" if not found
    //   - SECURITY: Never reveal if email exists or not (always say "Invalid credentials")
    //
    // Step 3: Verify password
    //   - Use: const isValidPassword = await comparePassword(password, user.password_hash);
    //   - Return 401 with message "Invalid credentials" if password doesn't match
    //
    // Step 4: Generate JWT token
    //   - Create payload: { userId: user.id, email: user.email, role: user.role }
    //   - Sign token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
    //
    // Step 5: Return success response
    //   - Return 200 with: { token, user: User.sanitize(user) }
    //
    // Example response:
    // {
    //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    //   "user": {
    //     "id": 1,
    //     "email": "admin@test.com",
    //     "name": "Admin User",
    //     "role": "admin"
    //   }
    // }

    // REMOVE THIS when implementing:
    return res.status(501).json({ error: 'Login endpoint not implemented yet' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * GET /api/auth/me
 * Get current user profile (requires authentication)
 */
router.get('/me', async (req, res) => {
  try {
    // This endpoint will work once authenticateToken middleware is implemented
    // It demonstrates how to use the authenticated user from req.user
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

module.exports = router;
