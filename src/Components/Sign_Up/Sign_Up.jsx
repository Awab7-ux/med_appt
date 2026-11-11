import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { apiRequest } from '../../api.js';

export default function Sign_Up() {
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault(); setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!/^\+?[0-9\s()-]{7,20}$/.test(data.phone)) { setError('Enter a valid phone number.'); return; }
    setLoading(true);
    try {
      const result = await apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(data) });
      const profile = { name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim(), role: data.role };
      sessionStorage.setItem('token', result.authtoken); sessionStorage.setItem('name', profile.name); sessionStorage.setItem('user', JSON.stringify(profile)); setUser(profile); navigate('/');
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };
  return <main className="auth-layout"><div className="auth-aside"><span className="eyebrow">A healthier future, together</span><h1>Care is a right.<br /><em>Not a distance.</em></h1><p>Join a growing community making good healthcare easier to reach.</p><span className="auth-aside-mark">+</span></div><section className="auth-main"><div className="auth-heading"><p className="eyebrow">Create your account</p><h2>Welcome to StayHealthy</h2><p>Let’s get a few details to get started.</p></div><form className="surface-form auth-form" onSubmit={submit}><label htmlFor="signup-role">Role</label><select id="signup-role" name="role" required defaultValue="Patient"><option>Patient</option><option>Doctor</option></select><label htmlFor="signup-name">Name</label><input id="signup-name" name="name" autoComplete="name" minLength="2" required /><label htmlFor="signup-email">Email</label><input id="signup-email" name="email" type="email" autoComplete="email" required /><label htmlFor="signup-phone">Phone</label><input id="signup-phone" name="phone" type="tel" autoComplete="tel" required /><label htmlFor="signup-password">Password</label><input id="signup-password" name="password" type="password" autoComplete="new-password" minLength="8" required aria-describedby={error ? 'signup-error' : 'signup-password-help'} /><small id="signup-password-help" className="field-help">Use at least 8 characters.</small>{error && <p className="form-error" id="signup-error" role="alert">{error}</p>}<button className="button button-primary form-submit" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'} <span aria-hidden="true">↗</span></button></form><p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p></section></main>;
}