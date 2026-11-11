import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', full_name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate('/login');
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
            <span className="eyebrow">{t('joinCoffice')}</span>
            <h1 className="h2 mb-1">{t('createAccount')}</h1>
            <p className="text-muted mb-0">{t('underMinute')}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><label className="form-label" htmlFor="full_name">{t('fullName')}</label><input id="full_name" name="full_name" className="form-control" value={form.full_name} onChange={updateField} /></div>
            <div className="mb-3"><label className="form-label" htmlFor="username">{t('username')}</label><input id="username" name="username" className="form-control" value={form.username} onChange={updateField} required /></div>
            <div className="mb-3"><label className="form-label" htmlFor="email">{t('email')}</label><input id="email" name="email" type="email" className="form-control" value={form.email} onChange={updateField} required /></div>
            <div className="mb-4"><label className="form-label" htmlFor="password">{t('password')}</label><input id="password" name="password" type="password" minLength="6" className="form-control" value={form.password} onChange={updateField} required /></div>
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>{loading ? t('creating') : t('register')}</button>
          </form>
          <p className="text-center mt-3 mb-0 text-muted">{t('haveAccount')} <Link to="/login">{t('login')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
