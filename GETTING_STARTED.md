# Getting Started - Candidate Instructions

Welcome to the Authentication & Role-Based Dashboard interview project!

## What You'll Build

You'll complete a partially-implemented authentication system by adding JWT token generation, verification, and role-based access control. **60% is already done** - you'll implement the critical 40% in **90 minutes**.

## Setup (Choose One Method)

### Option 1: Docker (Recommended)

```bash
cd /Users/nadimtuhin/projects/interview/set-5-auth-dashboard
docker-compose up
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3003

### Option 2: Local Development

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run seed    # Creates test users
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**Verify Setup Works:**
1. Open http://localhost:3000
2. Should see a login page with gradient header
3. Should see test credentials displayed

## Test Credentials

```
Admin Account
Email: admin@test.com
Password: password

Regular User Account
Email: user@test.com
Password: password
```

## Your Tasks (90 minutes)

### Task 1: Backend JWT Authentication (45 min)

**Files to edit:**
- `backend/src/routes/auth.js`
- `backend/src/middleware/auth.js`

**What to do:**
1. Implement login endpoint - validate credentials and return JWT
2. Add JWT generation to signup endpoint
3. Implement token verification middleware

**How to find TODOs:**
```bash
grep -r "TODO: TASK 1" backend/src/
```

**Test it works:**
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password"}'
# Should return a token
```

### Task 2: Frontend Token Storage (30 min)

**Files to edit:**
- `frontend/src/services/api.js`
- `frontend/src/components/LoginForm.jsx`
- `frontend/src/components/SignupForm.jsx`
- `frontend/src/components/ProtectedRoute.jsx`

**What to do:**
1. Add axios interceptor to attach token to requests
2. Store token in localStorage after login/signup
3. Implement protected route logic
4. Verify logout clears token

**How to find TODOs:**
```bash
grep -r "TODO: TASK 2" frontend/src/
```

**Test it works:**
- Login at http://localhost:3000/login
- Open DevTools → Application → Local Storage
- Should see 'token' stored
- Open DevTools → Network → Any API call → Headers
- Should see `Authorization: Bearer ...`

### Task 3: Role-Based Dashboard (15 min)

**Files to edit:**
- `backend/src/routes/dashboard.js`
- `frontend/src/pages/DashboardPage.jsx`

**What to do:**
1. Implement user dashboard endpoint
2. Implement admin dashboard endpoint with user list
3. Fetch and display role-based data in frontend

**How to find TODOs:**
```bash
grep -r "TODO: TASK 3" backend/src/ frontend/src/
```

**Test it works:**
- Login as admin → Should see all users
- Login as user → Should see personal info only

## Helpful Resources

### All TODO Comments

Every file with TODOs has **detailed comments with hints**. Look for:
```javascript
// TODO: TASK X - Clear description
//
// Steps to implement:
// 1. First step with hint
// 2. Second step with hint
// ...
//
// Hint: Specific code example
```

### Finding TODOs

```bash
# All TODOs
grep -r "TODO" backend/src frontend/src

# Task 1 only
grep -r "TODO: TASK 1" backend/src

# Task 2 only
grep -r "TODO: TASK 2" frontend/src

# Task 3 only
grep -r "TODO: TASK 3" backend/src frontend/src
```

### Key Files Reference

**Backend:**
- `src/app.js` - Main server (complete, no TODOs)
- `src/models/User.js` - User model with helpers (complete)
- `src/utils/password.js` - bcrypt helpers (complete)
- `src/routes/auth.js` - **HAS TODOs**
- `src/middleware/auth.js` - **HAS TODOs**
- `src/routes/dashboard.js` - **HAS TODOs**

**Frontend:**
- `src/App.jsx` - Routing (complete, no TODOs)
- `src/services/api.js` - **HAS TODOs**
- `src/components/LoginForm.jsx` - **HAS TODOs**
- `src/components/SignupForm.jsx` - **HAS TODOs**
- `src/components/ProtectedRoute.jsx` - **HAS TODOs**
- `src/pages/DashboardPage.jsx` - **HAS TODOs**

## Testing Your Implementation

### 1. Backend Tests (Terminal)

```bash
# Test login
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password"}'

# Copy the token from response, then test protected route
curl http://localhost:3003/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Test admin endpoint (with admin token)
curl http://localhost:3003/api/dashboard/admin \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Test that regular user can't access admin (should get 403)
curl http://localhost:3003/api/dashboard/admin \
  -H "Authorization: Bearer USER_TOKEN"
```

### 2. Frontend Tests (Browser)

**Login Flow:**
1. Go to http://localhost:3000
2. Should redirect to /login (protected route working)
3. Login with admin@test.com / password
4. Should redirect to /dashboard
5. Should see admin view with all users

**Token Storage:**
1. Open DevTools (F12)
2. Go to Application tab → Local Storage
3. Should see 'token' and 'user'

**Token in Requests:**
1. Open DevTools → Network tab
2. Login and navigate to dashboard
3. Click on any API request
4. Check Headers
5. Should see `Authorization: Bearer ...`

**Role-Based Access:**
1. Login as admin → See all users
2. Logout → Click logout button
3. Login as user@test.com → See personal info only

**Protected Routes:**
1. Logout completely
2. Try to access http://localhost:3000/dashboard directly
3. Should redirect to /login

## What's Already Implemented

You don't need to implement these (they're complete):

### Backend
✅ Express server setup
✅ Database connection (SQLite)
✅ User model with all CRUD methods
✅ Password hashing (bcrypt)
✅ Error handling middleware
✅ Database seeding
✅ Route structure
✅ CORS configuration

### Frontend
✅ React + React Router setup
✅ All page components (UI complete)
✅ Form components with styling
✅ Navbar with logout button
✅ Professional CSS
✅ Axios setup
✅ Form validation

## Documentation

- **README.md** - Detailed setup and API documentation
- **PROBLEM.md** - Complete problem description
- **TASKS.md** - Step-by-step checklist

## Tips for Success

1. **Read TODO comments carefully** - They have implementation hints
2. **Test as you go** - Don't wait until the end
3. **Start with backend** - Get auth working first
4. **Check the console** - Backend logs show errors
5. **Use DevTools** - Network tab and Application tab are your friends
6. **Follow the order** - Task 1 → Task 2 → Task 3
7. **Don't skip steps** - Each task builds on the previous

## Time Management

Suggested breakdown:
- **0-15 min:** Read code, understand what's implemented
- **15-30 min:** Implement login endpoint
- **30-45 min:** Implement auth middleware
- **45-60 min:** Implement signup JWT
- **60-75 min:** Frontend token handling
- **75-85 min:** Dashboard endpoints
- **85-90 min:** Final testing

## Common Issues

### "Login returns 501 Not Implemented"
→ You need to implement the login endpoint in `backend/src/routes/auth.js`

### "Token not sent with API requests"
→ You need to add the axios interceptor in `frontend/src/services/api.js`

### "Redirected to login after logging in"
→ You need to store the token in localStorage in the login/signup forms

### "Can't access dashboard"
→ Check that ProtectedRoute is checking for token correctly

### Port already in use
```bash
lsof -ti:3003 | xargs kill -9  # Kill backend
lsof -ti:3000 | xargs kill -9  # Kill frontend
```

## Need Help?

1. **Check TODO comments** - They have detailed hints
2. **Check console logs** - Backend shows what's happening
3. **Check Network tab** - See request/response
4. **Read error messages** - They usually point to the issue
5. **Test incrementally** - Don't write everything at once

## Success Criteria

By the end, you should have:
- ✅ Working login endpoint that returns JWT
- ✅ Working signup endpoint that returns JWT
- ✅ Auth middleware that verifies tokens
- ✅ Token stored in localStorage
- ✅ Token sent with every API request
- ✅ Protected routes working
- ✅ Dashboard showing role-based content
- ✅ Admin can see all users
- ✅ Regular users see limited data
- ✅ Logout clears token

## Ready?

1. Make sure the app is running (docker-compose up or npm start)
2. Open http://localhost:3000 to verify frontend loads
3. Read through PROBLEM.md for full context
4. Start with Task 1 in `backend/src/routes/auth.js`
5. Look for `// TODO: TASK 1` comments

Good luck! 🚀
