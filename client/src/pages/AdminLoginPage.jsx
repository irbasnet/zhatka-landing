import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/client';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await adminLogin(password);
      navigate('/admin');
    } catch {
      setError('Incorrect password.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img className="admin-login-logo" src="/assets/zhatka-logo.svg" alt="Zhatka" />
        <h1>Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className="field-error">{error}</p>}
        <button type="submit" className="link-card submit-btn" disabled={submitting || !password}>
          <span className="label">{submitting ? 'Signing in…' : 'Sign In'}</span>
        </button>
      </form>
    </div>
  );
}
