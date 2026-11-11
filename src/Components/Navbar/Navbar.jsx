import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';

export default function Navbar() {
  const { user, setUser } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);
  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    closeMenu();
    navigate('/');
  };

  return (
    <header className="site-header">
      <nav className="navbar page-shell" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={closeMenu}><span className="brand-mark" aria-hidden="true">+</span><span>StayHealthy<small>CARE WITHIN REACH</small></span></Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        <div className={`nav-content${menuOpen ? ' is-open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/appointments" onClick={closeMenu}>Appointments</NavLink>
            {user && <NavLink to="/profile" onClick={closeMenu}>My profile</NavLink>}
          </div>
          <div className="nav-account">
            {user ? <><span className="nav-greeting">Hello, {user.name}</span><button className="button button-outline button-small" type="button" onClick={logout}>Logout</button></> : <><Link className="nav-signup" to="/signup" onClick={closeMenu}>Sign Up</Link><Link className="button button-primary button-small" to="/login" onClick={closeMenu}>Login <span aria-hidden="true">↗</span></Link></>}
          </div>
        </div>
      </nav>
    </header>
  );
}