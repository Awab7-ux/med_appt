import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialities } from '../../data/doctors.js';

export default function FindDoctorSearch({ compact = false }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const suggestions = specialities.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const search = (value = query) => {
    navigate(`/doctors${value.trim() ? `?speciality=${encodeURIComponent(value.trim())}` : ''}`);
    setFocused(false);
  };

  return (
    <div className={`search-panel${compact ? ' search-panel-compact' : ''}`}>
      <div className="search-intro"><span className="search-icon" aria-hidden="true">⌕</span><div><h2>{compact ? 'Find care that fits.' : 'Find a doctor'}</h2><p>{compact ? 'Start with a speciality or a doctor’s name.' : 'Search by speciality to find the right care for you.'}</p></div></div>
      <form className="search-form" onSubmit={(event) => { event.preventDefault(); search(); }} role="search">
        <label className="sr-only" htmlFor={compact ? 'home-doctor-search' : 'doctor-search'}>Doctor speciality</label>
        <input id={compact ? 'home-doctor-search' : 'doctor-search'} value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 120)} placeholder="Try family medicine, pediatrics..." autoComplete="off" />
        {focused && suggestions.length > 0 && <ul className="suggestion-list" role="listbox">{suggestions.map((item) => <li key={item}><button type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => { setQuery(item); search(item); }}>{item}</button></li>)}</ul>}
        <button className="button button-primary search-submit" type="submit">Search <span aria-hidden="true">↗</span></button>
      </form>
      <div className="search-tags"><span>Popular:</span>{specialities.slice(0, 3).map((item) => <button key={item} type="button" onClick={() => { setQuery(item); search(item); }}>{item}</button>)}</div>
    </div>
  );
}