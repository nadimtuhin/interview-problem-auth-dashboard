import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        loadDashboardData(userData.role);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setError('Failed to load user data');
        setLoading(false);
      }
    } else {
      setError('User not found');
      setLoading(false);
    }
  }, []);

  const loadDashboardData = async (role) => {
    try {
      setLoading(true);

      // TODO: TASK 3 - Load Role-Based Dashboard Data
      //
      // Based on the user's role, fetch different data:
      // - Admin: Call dashboardAPI.getAdminDashboard()
      // - User: Call dashboardAPI.getUserDashboard()
      //
      // Implementation:
      // if (role === 'admin') {
      //   const data = await dashboardAPI.getAdminDashboard();
      //   setDashboardData(data);
      // } else {
      //   const data = await dashboardAPI.getUserDashboard();
      //   setDashboardData(data);
      // }

      // TEMPORARY: Set some mock data for UI testing
      setDashboardData({
        message: 'Dashboard data will load once backend endpoints are implemented',
        role: role
      });

    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.response?.data?.error || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </h1>
        <p className="dashboard-subtitle">
          Welcome back, {user?.name}!
        </p>
      </div>

      {/* TODO: TASK 3 - Render Role-Based Content */}

      {/* Admin Dashboard */}
      {user?.role === 'admin' && (
        <div>
          <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
            TODO: Implement admin dashboard - Show all users and system statistics
          </div>

          <div className="dashboard-grid">
            {/* Stats Cards */}
            <div className="dashboard-card">
              <h3>Total Users</h3>
              <div className="stat-value">{dashboardData?.stats?.total || '-'}</div>
              <div className="stat-label">Registered Users</div>
            </div>

            <div className="dashboard-card">
              <h3>Admins</h3>
              <div className="stat-value">{dashboardData?.stats?.admins || '-'}</div>
              <div className="stat-label">Admin Users</div>
            </div>

            <div className="dashboard-card">
              <h3>Regular Users</h3>
              <div className="stat-value">{dashboardData?.stats?.users || '-'}</div>
              <div className="stat-label">Standard Users</div>
            </div>
          </div>

          {/* User List */}
          {dashboardData?.users && dashboardData.users.length > 0 && (
            <div className="card" style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>All Users</h3>
              <ul className="user-list">
                {dashboardData.users.map((userItem) => (
                  <li key={userItem.id} className="user-list-item">
                    <div className="user-info">
                      <span className="user-name">{userItem.name}</span>
                      <span className="user-email">{userItem.email}</span>
                    </div>
                    <span className={`user-role role-${userItem.role}`}>
                      {userItem.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* User Dashboard */}
      {user?.role === 'user' && (
        <div>
          <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
            TODO: Implement user dashboard - Show personal information and stats
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Profile Information</h3>
              <div style={{ marginTop: '1rem' }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> <span className={`user-role role-${user.role}`}>{user.role}</span></p>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Account Status</h3>
              <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--success-color)' }}>
                Active
              </div>
              <div className="stat-label">Your account is in good standing</div>
            </div>

            <div className="dashboard-card">
              <h3>Quick Stats</h3>
              <div style={{ marginTop: '1rem' }}>
                <p>Account created: {dashboardData?.stats?.accountAge || 'Recently'}</p>
                <p>Last login: Today</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
