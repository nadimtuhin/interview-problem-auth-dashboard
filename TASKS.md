# Task Checklist

## Task 1: JWT Authentication Backend (45 minutes)

### A. Login Endpoint (`backend/src/routes/auth.js`)

- [ ] Extract email and password from request body
- [ ] Validate that both fields are provided
- [ ] Find user by email using `User.findByEmail(email)`
- [ ] Return 401 "Invalid credentials" if user not found
- [ ] Compare password with hash using `await comparePassword(password, user.password_hash)`
- [ ] Return 401 "Invalid credentials" if password doesn't match
- [ ] Create JWT payload with userId, email, and role
- [ ] Sign JWT token using `jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })`
- [ ] Return response with token and sanitized user data
- [ ] Test with Postman/curl or frontend

### B. Signup Endpoint (`backend/src/routes/auth.js`)

- [ ] Find the TODO comment after user creation
- [ ] Create JWT payload with new user's data
- [ ] Sign JWT token
- [ ] Update response to include token
- [ ] Test signup with frontend form

### C. Auth Middleware (`backend/src/middleware/auth.js`)

- [ ] Extract Authorization header from request
- [ ] Split header to get token (format: "Bearer TOKEN")
- [ ] Return 401 if no token provided
- [ ] Verify token using `jwt.verify(token, process.env.JWT_SECRET)`
- [ ] Catch and handle JsonWebTokenError
- [ ] Catch and handle TokenExpiredError
- [ ] Find user by ID from decoded token
- [ ] Return 401 if user not found
- [ ] Attach sanitized user to `req.user`
- [ ] Call `next()` to continue
- [ ] Test by accessing `/api/auth/me` with token

## Task 2: Frontend Token Handling (30 minutes)

### A. Store Token on Login (`frontend/src/components/LoginForm.jsx`)

- [ ] Find the TODO comment in handleSubmit
- [ ] Store token in localStorage: `localStorage.setItem('token', response.token)`
- [ ] Store user data in localStorage: `localStorage.setItem('user', JSON.stringify(response.user))`
- [ ] Redirect to dashboard using `navigate('/dashboard')`
- [ ] Test login flow

### B. Store Token on Signup (`frontend/src/components/SignupForm.jsx`)

- [ ] Find the TODO comment in handleSubmit
- [ ] Store token in localStorage
- [ ] Store user data in localStorage
- [ ] Redirect to dashboard
- [ ] Test signup flow

### C. Axios Request Interceptor (`frontend/src/services/api.js`)

- [ ] Find the TODO comment before authAPI
- [ ] Add request interceptor using `api.interceptors.request.use()`
- [ ] Get token from localStorage
- [ ] If token exists, add to headers: `config.headers.Authorization = 'Bearer ${token}'`
- [ ] Return modified config
- [ ] Test by checking Network tab in DevTools

### D. Protected Route Component (`frontend/src/components/ProtectedRoute.jsx`)

- [ ] Find the TODO comment
- [ ] Get token from localStorage
- [ ] If no token, return `<Navigate to="/login" replace />`
- [ ] If token exists, return children
- [ ] Test by accessing /dashboard without login
- [ ] Test by accessing /dashboard with login

### E. Verify Logout (Already Implemented)

- [ ] Click logout button
- [ ] Verify localStorage is cleared
- [ ] Verify redirect to login

## Task 3: Role-Based Dashboard (15 minutes)

### A. User Dashboard Endpoint (`backend/src/routes/dashboard.js`)

- [ ] Find TODO in GET `/user` route
- [ ] Return user profile from `req.user`
- [ ] Add any additional stats (account age, etc.)
- [ ] Return appropriate response object
- [ ] Test with regular user account

### B. Admin Dashboard Endpoint (`backend/src/routes/dashboard.js`)

- [ ] Find TODO in GET `/admin` route
- [ ] Get all users using `User.findAll()`
- [ ] Get statistics using `User.getStats()`
- [ ] Return users and stats in response
- [ ] Test with admin account
- [ ] Test with user account (should get 403)

### C. Frontend Dashboard Data Loading (`frontend/src/pages/DashboardPage.jsx`)

- [ ] Find TODO in loadDashboardData function
- [ ] Check user role
- [ ] If admin, call `dashboardAPI.getAdminDashboard()`
- [ ] If user, call `dashboardAPI.getUserDashboard()`
- [ ] Store response in dashboardData state
- [ ] Remove temporary mock data
- [ ] Test admin view
- [ ] Test user view

## Testing Checklist

### Authentication Flow
- [ ] Can signup new user
- [ ] Receives token on signup
- [ ] Can login with correct credentials
- [ ] Receives token on login
- [ ] Cannot login with wrong password
- [ ] Cannot login with non-existent email
- [ ] Token is stored in localStorage

### Protected Routes
- [ ] Cannot access /dashboard without login
- [ ] Redirects to /login when not authenticated
- [ ] Can access /dashboard when logged in
- [ ] Token is included in API requests (check Network tab)

### Role-Based Access
- [ ] Admin sees all users on dashboard
- [ ] Admin sees system statistics
- [ ] Regular user sees personal info
- [ ] Regular user cannot access `/api/dashboard/admin`
- [ ] Admin can access all endpoints

### Error Handling
- [ ] Invalid credentials show error message
- [ ] Expired token redirects to login
- [ ] Invalid token returns 401
- [ ] Missing fields show validation errors

### Logout
- [ ] Logout clears token from localStorage
- [ ] Logout clears user data from localStorage
- [ ] Logout redirects to login
- [ ] Cannot access protected routes after logout

## Time Management

- **0-15 min:** Task 1A (Login endpoint)
- **15-30 min:** Task 1B & 1C (Signup and Auth middleware)
- **30-45 min:** Task 1 testing and debugging
- **45-60 min:** Task 2A-D (Frontend token handling)
- **60-75 min:** Task 2 testing and debugging
- **75-85 min:** Task 3A-B (Backend dashboard endpoints)
- **85-90 min:** Task 3C (Frontend dashboard rendering)
- **90+ min:** Final testing and polish

## Tips

1. **Work sequentially:** Complete backend auth before frontend
2. **Test frequently:** Use Postman or browser after each subtask
3. **Check TODOs:** All files have helpful TODO comments with hints
4. **Use DevTools:** Network tab shows tokens in headers
5. **Check console:** Backend logs show errors
6. **Read hints:** Each TODO has implementation hints
7. **Use test credentials:** admin@test.com and user@test.com already exist

## Need Help?

1. Check PROBLEM.md for hints section
2. Check SOLUTION.md for reference implementation (only if stuck!)
3. Use console.log() to debug
4. Check Network tab for API responses
5. Verify .env file exists with JWT_SECRET
