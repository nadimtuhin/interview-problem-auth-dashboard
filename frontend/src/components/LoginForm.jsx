import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call login API
      const response = await authAPI.login(formData);

      // TODO: TASK 2 - Store Token and User Data
      //
      // After successful login, you need to:
      // 1. Store the JWT token in localStorage
      //    localStorage.setItem('token', response.token);
      //
      // 2. Store user data in localStorage (for navbar and dashboard)
      //    localStorage.setItem('user', JSON.stringify(response.user));
      //
      // 3. Redirect to dashboard
      //    navigate('/dashboard');
      //
      // Note: The token will be automatically included in subsequent requests
      // once you implement the axios interceptor in api.js

      console.log('Login response:', response);

      // TEMPORARY: Store token and redirect (uncomment when backend is ready)
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
      } else {
        setError('Login successful but no token received. Please implement JWT in backend.');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="text-center" style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
        <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>
          Sign in to your account
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="button button-primary"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-muted" style={{ marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-link">
            Sign up
          </Link>
        </p>

        <div className="alert alert-info" style={{ marginTop: '1.5rem' }}>
          <strong>Test Credentials:</strong><br />
          Admin: admin@test.com / password<br />
          User: user@test.com / password
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
