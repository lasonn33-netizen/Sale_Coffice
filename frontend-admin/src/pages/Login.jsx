import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await login(username, password);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ||
          (error.message === 'ADMIN_REQUIRED'
            ? 'គណនីនេះមិនមែនជា Admin ទេ'
            : 'មិនអាចចូលប្រព័ន្ធបាន')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow" style={{ width: '400px', maxWidth: 'calc(100% - 2rem)' }}>
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-4">☕ Admin Login</h1>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="admin-username">
                ឈ្មោះអ្នកប្រើ ឬអ៊ីមែល
              </label>
              <input
                id="admin-username"
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="admin-password">
                ពាក្យសម្ងាត់
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'កំពុងចូល...' : 'ចូលប្រព័ន្ធ'}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            មិនទាន់មានគណនី Admin? <Link to="/register">ចុះឈ្មោះ</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
