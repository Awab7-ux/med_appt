import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';
import AppointmentForm from '../AppointmentForm/AppointmentForm.jsx';

export default function DoctorCard({ doctor }) {
  const { appointments, saveAppointments } = useContext(AppContext);
  const [booking, setBooking] = useState(false);
  const appointment = appointments.find((item) => item.doctorId === doctor.id);
const cancel = () => {
  const updated = appointments.filter((item) => item.doctorId !== doctor.id);
  localStorage.setItem('appointments', JSON.stringify(updated));
  saveAppointments(updated);
};
  const addAppointment = (details) => {
    saveAppointments([...appointments.filter((item) => item.doctorId !== doctor.id), { ...details, doctorId: doctor.id, doctorName: doctor.name, speciality: doctor.speciality, id: `${doctor.id}-${Date.now()}` }]);
    setBooking(false);
  };

  return (
    <article className="doctor-card">
      <div className={`doctor-avatar ${doctor.color}`} aria-hidden="true">{doctor.initials}<span className="verified-mark">✓</span></div>
      <div className="doctor-main"><div className="doctor-title"><div><h2>{doctor.name}</h2><p>{doctor.credentials}</p></div><span className="doctor-rating"><span aria-hidden="true">★</span> {doctor.rating}</span></div><span className="speciality-pill">{doctor.speciality}</span><div className="doctor-meta"><span><b aria-hidden="true">⌖</b>{doctor.location}</span><span><b aria-hidden="true">◷</b>{doctor.experience} experience</span></div><div className="availability"><span className="live-dot" /> Next available <strong>{doctor.availability}</strong></div>
        {booking && <AppointmentForm doctor={doctor} onSubmit={addAppointment} onCancel={() => setBooking(false)} />}
        {!booking && <div className="doctor-actions">{appointment ? <><span className="booked-label">Appointment booked</span><button className="button button-outline cancel-button" type="button" onClick={cancel}>Cancel Appointment</button></> : <button className="button button-primary" type="button" onClick={() => setBooking(true)}>Book Appointment <span aria-hidden="true">↗</span></button>}</div>}
      </div>
    </article>
  );
}
