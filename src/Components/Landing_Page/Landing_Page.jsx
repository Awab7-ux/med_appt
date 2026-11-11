import { Link } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch.jsx';

export default function Landing_Page() {
  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy"><span className="hero-kicker"><span className="live-dot" /> A little closer to better health</span><h1>Good care<br />should reach <em>everyone.</em></h1><p>Find compassionate doctors, book an appointment, and take the next step toward feeling better, wherever you call home.</p><div className="hero-actions"><Link className="button button-primary" to="/appointments">Find a doctor <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/instant-consultation">Need care right now? <span aria-hidden="true">→</span></Link></div><div className="hero-note"><div className="avatar-stack" aria-hidden="true"><i>MS</i><i>JO</i><i>LC</i></div><span>Care made more accessible<br /><strong>for every community</strong></span></div></div>
        <div className="hero-art" aria-label="Illustration of connected community healthcare"><div className="art-sun" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-cross">+</div><div className="art-person person-one"><span className="person-head" /><span className="person-body" /></div><div className="art-person person-two"><span className="person-head" /><span className="person-body" /></div><div className="art-person person-three"><span className="person-head" /><span className="person-body" /></div><div className="art-clinic"><span className="clinic-cross">+</span><span className="clinic-windows" /></div><div className="art-caption"><span>01</span><span>Care that meets you where you are</span></div></div>
      </section>
      <section className="search-section page-shell"><FindDoctorSearch compact /></section>
      <section className="care-band"><div className="page-shell care-content"><div><p className="eyebrow">Your care, your way</p><h2>Small steps can make<br />a healthier tomorrow.</h2></div><div className="care-links"><Link to="/appointments"><span className="care-icon">01</span><span><strong>Find a specialist</strong><small>Explore trusted doctors near you</small></span><b aria-hidden="true">↗</b></Link><Link to="/instant-consultation"><span className="care-icon">02</span><span><strong>Request a consultation</strong><small>We’ll help connect you to care</small></span><b aria-hidden="true">↗</b></Link><Link to="/review"><span className="care-icon">03</span><span><strong>Share your experience</strong><small>Help others find the right care</small></span><b aria-hidden="true">↗</b></Link></div></div></section>
    </main>
  );
}