import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch {
      // AuthContext displays the API error.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card shadow-sm">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <span className="brand__mark" style={{ margin: '0 auto 16px' }}>☕</span>
            <h1 className="h2 mb-1">{t('welcomeBack')}</h1>
            <p className="text-muted mb-0">{t('loginCopy')}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="login-username">{t('username')}</label>
              <input id="login-username" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="login-password">{t('password')}</label>
              <input id="login-password" className="form-control" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            </div>
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>{loading ? t('loggingIn') : t('login')}</button>
          </form>
          <p className="text-center mt-3 mb-0 text-muted">{t('noAccount')} <Link to="/register">{t('register')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
