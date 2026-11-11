import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { apiRequest } from '../../api.js';

export default function ProfileCard() {
  const { user, setUser } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError(''); setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!/^\+?[0-9\s()-]{7,20}$/.test(data.phone)) { setError('Enter a valid phone number.'); setLoading(false); return; }
    try {
      const result = await apiRequest('/api/auth/user', { method: 'PUT', body: JSON.stringify(data) });
      const updated = { ...user, ...result.user }; sessionStorage.setItem('user', JSON.stringify(updated)); sessionStorage.setItem('name', updated.name); setUser(updated); setEditing(false);
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };
  return <main className="page-shell narrow-page"><div className="section-heading"><p className="eyebrow">Your details</p><h1>My profile</h1><p>Keep your contact information up to date.</p></div><section className="profile-card"><div className="profile-top"><div className="profile-avatar" aria-hidden="true">{user?.name?.slice(0, 1).toUpperCase()}</div><div><span className="eyebrow">{user?.role || 'Patient'}</span><h2>{user?.name}</h2></div><button className="button button-outline button-small" type="button" onClick={() => { setEditing(!editing); setError(''); }}>{editing ? 'Cancel' : 'Edit'}</button></div>{editing ? <form className="surface-form profile-form" onSubmit={submit}><label htmlFor="profile-name">Name</label><input id="profile-name" name="name" defaultValue={user?.name} minLength="2" required /><label htmlFor="profile-email">Email</label><input id="profile-email" type="email" value={user?.email || ''} disabled /><label htmlFor="profile-phone">Phone</label><input id="profile-phone" name="phone" type="tel" defaultValue={user?.phone || ''} required aria-describedby={error ? 'profile-error' : undefined} />{error && <p className="form-error" id="profile-error" role="alert">{error}</p>}<button className="button button-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'} <span aria-hidden="true">↗</span></button></form> : <dl className="profile-details"><div><dt>Email</dt><dd>{user?.email || 'Not provided'}</dd></div><div><dt>Phone</dt><dd>{user?.phone || 'Not provided'}</dd></div></dl>}</section></main>;
}