import { createContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Landing_Page from './Components/Landing_Page/Landing_Page.jsx';
import Sign_Up from './Components/Sign_Up/Sign_Up.jsx';
import Login from './Components/Login/Login.jsx';
import Notification from './Components/Notification/Notification.jsx';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch.jsx';
import ProfileCard from './Components/ProfileCard/ProfileCard.jsx';
import AppointmentFormIC from './Components/AppointmentFormIC/AppointmentFormIC.jsx';
import GiveReviews from './Components/GiveReviews/GiveReviews.jsx';
import DoctorCard from './Components/DoctorCard/DoctorCard.jsx';
import { doctors } from './data/doctors.js';

export const AppContext = createContext(null);
const readAppointments = () => {
  try { return JSON.parse(localStorage.getItem('appointments') || '[]'); }
  catch { return []; }
};

function DoctorsPage() {
  const query = new URLSearchParams(window.location.search).get('speciality') || '';
  const matches = doctors.filter((doctor) => doctor.speciality.toLowerCase().includes(query.toLowerCase()));
  const DoctorCard = requireDoctorCard();
  return (
    <main className="page-shell page-content">
      <div className="section-heading"><p className="eyebrow">Care, closer to home</p><h1>{query ? `${query} doctors` : 'Find your doctor'}</h1><p>Meet trusted local professionals ready to help you feel your best.</p></div>
      <div className="doctor-grid">{matches.length ? matches.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />) : <p className="empty-state">No doctors found for that speciality. Try a different search.</p>}</div>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('user') || 'null'); }
    catch { return null; }
  });
  const [appointments, setAppointments] = useState(readAppointments);

  const saveAppointments = (nextAppointments) => {
    setAppointments(nextAppointments);
    localStorage.setItem('appointments', JSON.stringify(nextAppointments));
  };

  return (
    <AppContext.Provider value={{ user, setUser, appointments, saveAppointments }}>
      <BrowserRouter>
        <div className="app-frame">
          <Navbar />
          <Notification />
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/appointments" element={<FindDoctorSearch />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Sign_Up />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/profile" element={user ? <ProfileCard /> : <Navigate to="/login" replace />} />
            <Route path="/instant-consultation" element={<AppointmentFormIC />} />
            <Route path="/review" element={<GiveReviews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <footer className="site-footer"><span>StayHealthy</span><span>Care within reach, for every community.</span><span>© {new Date().getFullYear()} StayHealthy</span></footer>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;