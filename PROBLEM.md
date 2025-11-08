# Interview Problem: JWT Authentication & Role-Based Dashboard

## Overview

You've been given a partially implemented authentication system. Your task is to complete the JWT authentication flow and implement role-based access control.

**Time Limit:** 1.5 hours
**Format:** 30min problem analysis + 90min coding + 30min discussion

## What's Already Implemented (60%)

### Backend
- Express server setup with CORS
- SQLite database with users table
- User model with helper methods
- Password hashing utilities (bcrypt)
- Basic route structure
- Error handling middleware
- Database seeding with test users

### Frontend
- React app with routing
- Login/Signup forms (UI complete)
- Dashboard page skeleton
- Navbar component
- Professional styling
- Axios setup

## Your Tasks (40%)

### Task 1: Implement JWT Authentication (45 minutes)

**Backend Files:**
- `backend/src/routes/auth.js`
- `backend/src/middleware/auth.js`

**Requirements:**

1. **Complete Login Endpoint** (`POST /api/auth/login`)
   - Validate email and password
   - Verify credentials using `comparePassword()`
   - Generate JWT token with payload: `{ userId, email, role }`
   - Return token and sanitized user data
   - Handle errors appropriately

2. **Complete Signup Endpoint** (`POST /api/auth/signup`)
   - User creation already works
   - Add JWT token generation after user is created
   - Return token and sanitized user data

3. **Implement Auth Middleware** (`authenticateToken`)
   - Extract token from Authorization header (`Bearer TOKEN`)
   - Verify token using `jwt.verify()`
   - Find user by ID from decoded token
   - Attach user to `req.user`
   - Handle invalid/expired tokens

**Expected JWT Payload:**
```javascript
{
  userId: 1,
  email: "user@test.com",
  role: "user"
}
```

### Task 2: Frontend Token Handling (30 minutes)

**Frontend Files:**
- `frontend/src/services/api.js`
- `frontend/src/components/ProtectedRoute.jsx`
- `frontend/src/components/LoginForm.jsx`
- `frontend/src/components/SignupForm.jsx`

**Requirements:**

1. **Store Token on Login/Signup**
   - Save JWT to localStorage as 'token'
   - Save user data to localStorage as 'user' (JSON)
   - Redirect to dashboard after successful auth

2. **Add Axios Interceptor**
   - Add request interceptor in `api.js`
   - Attach token to Authorization header: `Bearer TOKEN`
   - Handle 401 responses globally (optional)

3. **Implement Protected Route**
   - Check if token exists in localStorage
   - Redirect to /login if no token
   - Render children if authenticated

4. **Logout Functionality**
   - Already implemented in Navbar
   - Verify it clears token and user data

### Task 3: Role-Based Dashboard (15 minutes)

**Backend File:**
- `backend/src/routes/dashboard.js`

**Frontend File:**
- `frontend/src/pages/DashboardPage.jsx`

**Requirements:**

1. **User Dashboard Endpoint** (`GET /api/dashboard/user`)
   - Return user profile and stats
   - Accessible by all authenticated users

2. **Admin Dashboard Endpoint** (`GET /api/dashboard/admin`)
   - Return all users using `User.findAll()`
   - Return stats using `User.getStats()`
   - Use `authorizeRoles('admin')` middleware
   - Only accessible by admin users

3. **Frontend Dashboard Rendering**
   - Fetch appropriate data based on user role
   - Display admin stats and user list for admins
   - Display personal info for regular users

## Testing Your Implementation

1. **Start the application:**
   ```bash
   docker-compose up
   ```

2. **Test Login:**
   - Go to http://localhost:3000/login
   - Login with `admin@test.com / password`
   - Should redirect to dashboard
   - Check localStorage for token

3. **Test Protected Routes:**
   - Logout
   - Try accessing /dashboard directly
   - Should redirect to /login

4. **Test Role-Based Access:**
   - Login as admin → should see all users
   - Login as user → should see personal info only
   - Try accessing `/api/dashboard/admin` as regular user (should get 403)

5. **Test Token in Headers:**
   - Open browser DevTools → Network tab
   - Make any API call to dashboard
   - Check request headers for `Authorization: Bearer ...`

## Success Criteria

- [ ] Can login and receive JWT token
- [ ] Token is stored in localStorage
- [ ] Token is sent with API requests
- [ ] Protected routes redirect to login when not authenticated
- [ ] Admin can see all users
- [ ] Regular users see limited data
- [ ] Logout works correctly
- [ ] Invalid tokens are handled gracefully

## Hints

### JWT Token Generation
```javascript
const jwt = require('jsonwebtoken');

const payload = { userId: user.id, email: user.email, role: user.role };
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: '24h'
});
```

### JWT Token Verification
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// decoded = { userId: 1, email: "...", role: "...", iat: ..., exp: ... }
```

### Extracting Token from Header
```javascript
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" -> "TOKEN"
```

### Axios Interceptor
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Common Pitfalls

1. **Token Format:** Always use `Bearer TOKEN` format in Authorization header
2. **Case Sensitivity:** Header is `Authorization`, not `authorization` (though Express normalizes it)
3. **Token Expiration:** Don't forget to set `expiresIn` option
4. **Error Messages:** Never reveal if email exists (always say "Invalid credentials")
5. **Password in Response:** Always use `User.sanitize()` before sending user data
6. **localStorage:** Remember to JSON.stringify/parse when storing objects

## Bonus Challenges (If Time Permits)

1. Implement token refresh mechanism
2. Add password strength requirements
3. Implement "Remember Me" functionality
4. Add email verification
5. Implement rate limiting on auth endpoints
6. Add request logging

## Resources

- JWT: https://jwt.io
- bcrypt: https://www.npmjs.com/package/bcryptjs
- React Router: https://reactrouter.com
- Axios: https://axios-http.com
