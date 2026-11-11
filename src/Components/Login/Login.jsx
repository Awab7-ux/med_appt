import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { apiRequest } from '../../api.js';

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault(); setError(''); setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const result = await apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
      const profile = result.user || { name: result.userName, email: data.email };
      sessionStorage.setItem('token', result.authtoken); sessionStorage.setItem('name', profile.name); sessionStorage.setItem('user', JSON.stringify(profile)); setUser(profile); navigate('/');
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };
  return <main className="auth-layout"><div className="auth-aside"><span className="eyebrow">Your health journey</span><h1>Good to have<br /><em>you back.</em></h1><p>Your next step toward care is only a few clicks away.</p><span className="auth-aside-mark">+</span></div><section className="auth-main"><div className="auth-heading"><p className="eyebrow">Sign in</p><h2>Welcome back</h2><p>Enter your account details to continue.</p></div><form className="surface-form auth-form" onSubmit={submit}><label htmlFor="login-email">Email</label><input id="login-email" name="email" type="email" autoComplete="email" required /><label htmlFor="login-password">Password</label><input id="login-password" name="password" type="password" autoComplete="current-password" required aria-describedby={error ? 'login-error' : undefined} />{error && <p className="form-error" id="login-error" role="alert">{error}</p>}<button className="button button-primary form-submit" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'} <span aria-hidden="true">↗</span></button></form><p className="auth-switch">New to StayHealthy? <Link to="/signup">Create an account</Link></p></section></main>;
}