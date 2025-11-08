const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare plain text password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if passwords match
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Validate password strength
 * @param {string} password
 * @returns {Object} { valid: boolean, message: string }
 */
function validatePassword(password) {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }

  // For production, you might want stronger requirements:
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one number
  // - At least one special character

  return { valid: true, message: 'Password is valid' };
}

module.exports = {
  hashPassword,
  comparePassword,
  validatePassword
};
