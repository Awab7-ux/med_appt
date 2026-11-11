import { useContext } from 'react';
import { AppContext } from '../../App.jsx';

export default function Notification() {
  const { user, appointments } = useContext(AppContext);
  const latest = appointments.at(-1);
  return <aside className="notification-strip" aria-label="Your care update"><div className="page-shell notification-content"><span className="notification-dot" /><span>{user ? <>Welcome back, <strong>{user.name}</strong></> : <><strong>Accessible care starts here.</strong> Find support in your community.</>}</span>{latest && <span className="latest-appointment"><span aria-hidden="true">◷</span> Latest: {latest.type}{latest.doctorName ? ` with ${latest.doctorName}` : ''} · {latest.date} · {latest.time}</span>}</div></aside>;
}