import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError('');

    if (form.password !== form.confirmPassword) {
      setValidationError('ពាក្យសម្ងាត់ទាំងពីរមិនដូចគ្នា');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = form;
      await register(userData);
      navigate('/login');
    } catch {
      // The auth context displays the API error.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="card shadow" style={{ width: '440px', maxWidth: 'calc(100% - 2rem)' }}>
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-4">☕ បង្កើតគណនី Admin</h1>

          {validationError && (
            <div className="alert alert-danger" role="alert">
              {validationError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="full_name">ឈ្មោះពេញ</label>
              <input id="full_name" name="full_name" className="form-control" value={form.full_name} onChange={updateField} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">ឈ្មោះអ្នកប្រើ</label>
              <input id="username" name="username" className="form-control" value={form.username} onChange={updateField} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">អ៊ីមែល</label>
              <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={updateField} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">ពាក្យសម្ងាត់</label>
              <input id="password" name="password" type="password" minLength="6" className="form-control" value={form.password} onChange={updateField} required />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="confirmPassword">បញ្ជាក់ពាក្យសម្ងាត់</label>
              <input id="confirmPassword" name="confirmPassword" type="password" minLength="6" className="form-control" value={form.confirmPassword} onChange={updateField} required />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'កំពុងបង្កើត...' : 'បង្កើតគណនី Admin'}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            មានគណនីហើយ? <Link to="/login">ចូលប្រព័ន្ធ</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
