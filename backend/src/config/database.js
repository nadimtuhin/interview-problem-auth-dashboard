const Database = require('better-sqlite3');
const path = require('path');

// Create database directory if it doesn't exist
const dbPath = path.join(__dirname, '../../data/database.db');

// Initialize SQLite database
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.exec(createUsersTable);

console.log('Database initialized successfully');

module.exports = db;
