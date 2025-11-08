import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 */
function ProtectedRoute({ children }) {
  // TODO: TASK 2 - Implement Protected Route Logic
  //
  // This component should check if the user is authenticated
  // and either render the children or redirect to login.
  //
  // Steps:
  // 1. Get the token from localStorage
  //    const token = localStorage.getItem('token');
  //
  // 2. Check if token exists
  //    if (!token) {
  //      return <Navigate to="/login" replace />;
  //    }
  //
  // 3. If token exists, render the protected content
  //    return children;
  //
  // Optional Enhancement:
  // - You could also verify the token by making an API call to /api/auth/me
  // - Store user data in React Context for global access
  // - Check token expiration (decode JWT and check exp claim)
  //
  // Security Note:
  // - This is CLIENT-SIDE protection only (for UX)
  // - NEVER rely on this for security
  // - Backend must ALWAYS verify the token on protected endpoints

  // REMOVE THIS when implementing:
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
