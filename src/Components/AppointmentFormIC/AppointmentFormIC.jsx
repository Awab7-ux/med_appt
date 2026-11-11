import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';

export default function AppointmentFormIC() {
  const { saveAppointments, appointments } = useContext(AppContext);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const details = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!/^\+?[0-9\s()-]{7,20}$/.test(details.phone)) { setError('Enter a valid phone number.'); return; }
    saveAppointments([...appointments, { ...details, type: 'Instant consultation', date: new Date().toISOString().slice(0, 10), time: 'Request received', id: `consult-${Date.now()}` }]);
    setSubmitted(true);
  };

  return <main className="page-shell narrow-page"><div className="section-heading"><p className="eyebrow">Here when you need us</p><h1>Request an instant consultation</h1><p>Share your contact details and our care team will help you find the next step.</p></div>{submitted ? <div className="success-panel" role="status"><span className="success-check">✓</span><h2>Your request is with us.</h2><p>A member of the care team will be in touch soon.</p></div> : <form className="surface-form" onSubmit={submit}><label htmlFor="ic-name">Name</label><input id="ic-name" name="name" autoComplete="name" required /><label htmlFor="ic-phone">Phone Number</label><input id="ic-phone" name="phone" type="tel" autoComplete="tel" required aria-describedby={error ? 'ic-error' : undefined} />{error && <p className="form-error" id="ic-error" role="alert">{error}</p>}<button className="button button-primary" type="submit">Request a call <span aria-hidden="true">↗</span></button></form>}</main>;
}