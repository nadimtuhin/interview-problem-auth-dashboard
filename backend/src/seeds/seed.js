const db = require('../config/database');
const { hashPassword } = require('../utils/password');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    db.prepare('DELETE FROM users').run();
    console.log('Cleared existing users');

    // Create test users
    const users = [
      {
        email: 'admin@test.com',
        password: 'password',
        name: 'Admin User',
        role: 'admin'
      },
      {
        email: 'user@test.com',
        password: 'password',
        name: 'Regular User',
        role: 'user'
      },
      {
        email: 'john@test.com',
        password: 'password',
        name: 'John Doe',
        role: 'user'
      }
    ];

    // Insert users
    const insertStmt = db.prepare(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `);

    for (const user of users) {
      const password_hash = await hashPassword(user.password);
      insertStmt.run(user.email, password_hash, user.name, user.role);
      console.log(`Created user: ${user.email} (${user.role})`);
    }

    console.log('\nDatabase seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@test.com / password');
    console.log('User:  user@test.com / password');
    console.log('User:  john@test.com / password');

  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = seedDatabase;
