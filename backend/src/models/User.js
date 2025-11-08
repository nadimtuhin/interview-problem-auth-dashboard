const db = require('../config/database');

class User {
  /**
   * Find user by email
   * @param {string} email
   * @returns {Object|null} User object or null
   */
  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  /**
   * Find user by ID
   * @param {number} id
   * @returns {Object|null} User object or null
   */
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  /**
   * Create new user
   * @param {Object} userData - { email, password_hash, name, role }
   * @returns {Object} Created user
   */
  static create({ email, password_hash, name, role = 'user' }) {
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(email, password_hash, name, role);
    return this.findById(result.lastInsertRowid);
  }

  /**
   * Get all users (admin only)
   * @returns {Array} List of all users
   */
  static findAll() {
    const stmt = db.prepare('SELECT id, email, name, role, created_at FROM users');
    return stmt.all();
  }

  /**
   * Get user count by role
   * @returns {Object} Count statistics
   */
  static getStats() {
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM users');
    const adminStmt = db.prepare("SELECT COUNT(*) as admins FROM users WHERE role = 'admin'");
    const userStmt = db.prepare("SELECT COUNT(*) as users FROM users WHERE role = 'user'");

    return {
      total: totalStmt.get().total,
      admins: adminStmt.get().admins,
      users: userStmt.get().users
    };
  }

  /**
   * Remove password_hash from user object (for safe return to client)
   * @param {Object} user
   * @returns {Object} User without password_hash
   */
  static sanitize(user) {
    if (!user) return null;
    const { password_hash, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}

module.exports = User;
