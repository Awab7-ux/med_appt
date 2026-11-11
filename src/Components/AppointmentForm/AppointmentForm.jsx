import { useState } from 'react';

export default function AppointmentForm({ doctor, onSubmit, onCancel }) {
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const details = Object.fromEntries(formData.entries());
    if (!/^\+?[0-9\s()-]{7,20}$/.test(details.phone)) { setError('Enter a valid phone number.'); return; }
    onSubmit({ name: details.name.trim(), phone: details.phone.trim(), date: details.date, time: details.time, type: 'Appointment' });
  };

  return <form className="inline-form appointment-form" onSubmit={submit}>
    <div className="form-heading"><strong>Book with {doctor.name}</strong><button type="button" className="icon-button" aria-label="Close appointment form" onClick={onCancel}>×</button></div>
    <div className="form-grid"><label>Name<input name="name" defaultValue="" autoComplete="name" required /></label><label>Phone Number<input name="phone" type="tel" autoComplete="tel" required aria-describedby={error ? 'appointment-error' : undefined} /></label><label>Date of Appointment<input name="date" type="date" min={new Date().toISOString().slice(0, 10)} required /></label><label>Time Slot<select name="time" required defaultValue=""><option value="" disabled>Select a time</option><option>9:00 AM</option><option>10:30 AM</option><option>1:15 PM</option><option>3:00 PM</option></select></label></div>
    {error && <p className="form-error" id="appointment-error" role="alert">{error}</p>}<button className="button button-primary" type="submit">Confirm appointment <span aria-hidden="true">↗</span></button>
  </form>;
}