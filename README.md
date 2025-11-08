# Authentication & Role-Based Dashboard

A full-stack web application demonstrating JWT authentication, secure password handling, and role-based access control.

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router v6
- Axios
- Vite

## Features

- User authentication (signup/login)
- JWT-based authorization
- Password hashing with bcrypt
- Role-based access control (admin/user)
- Protected routes
- Responsive UI

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Start both frontend and backend
docker-compose up

# Or with hot reload for development
docker-compose -f docker-compose.dev.yml up
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3003

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
npm run seed    # Seed database with test users
npm start       # Production mode
# or
npm run dev     # Development mode with nodemon
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Test Credentials

The database is pre-seeded with test accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@test.com | password | admin |
| user@test.com | password | user |
| john@test.com | password | user |

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user profile (requires token)

### Dashboard
- `GET /api/dashboard/user` - User dashboard data (requires token)
- `GET /api/dashboard/admin` - Admin dashboard data (requires token + admin role)

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & error handling
│   │   ├── models/          # Database models
│   │   ├── config/          # Database configuration
│   │   ├── utils/           # Helper functions
│   │   ├── seeds/           # Database seeding
│   │   └── app.js           # Express app
│   ├── data/                # SQLite database (auto-created)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   └── package.json
│
└── docker-compose.yml
```

## Environment Variables

Backend `.env` file:
```
PORT=3003
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

## Security Features

1. **Password Security:**
   - Passwords hashed with bcrypt (10 salt rounds)
   - Minimum password length validation
   - Never store plain text passwords

2. **JWT Security:**
   - Secret key from environment variables
   - Token expiration (24 hours)
   - Token verification on protected routes

3. **Role-Based Access:**
   - Middleware to check user roles
   - Admin-only endpoints
   - User sanitization (removes password_hash)

4. **Best Practices:**
   - CORS enabled
   - Input validation
   - Error handling middleware
   - Generic error messages for auth failures

## Development Notes

### Database

SQLite database is automatically created on first run. The schema includes:

```sql
users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Re-seeding Database

```bash
cd backend
npm run seed
```

This will clear existing users and create fresh test accounts.

## Common Issues

**Port already in use:**
```bash
# Kill process on port 3003
lsof -ti:3003 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Database locked:**
- Stop the backend server
- Delete `backend/data/database.db`
- Restart and database will be recreated

**CORS errors:**
- Ensure backend is running on port 3003
- Frontend proxy is configured in `vite.config.js`

## License

MIT
