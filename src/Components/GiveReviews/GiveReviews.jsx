import { useState } from 'react';

function Popup({ trigger, open, onClose, children }) {
  return (
    <>
      {trigger}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
        >
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: 'min(420px, 92vw)' }}>
            <button type="button" aria-label="Close" onClick={onClose} style={{ float: 'right' }}>×</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

function GiveReviews({ reportId, onDone }) {
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!data.name.trim() || !data.review.trim() || !data.rating) {
      setError('Please fill in all fields.');
      return;
    }
    const review = { name: data.name.trim(), review: data.review.trim(), rating: data.rating };
    localStorage.setItem(`review_${reportId}`, JSON.stringify(review));
    onDone(review);
  };

  return (
    <form onSubmit={submit}>
      <h3>Give Your Review</h3>
      <label>Name<input name="name" required /></label>
      <label>Review<textarea name="review" required /></label>
      <label>Rating
        <select name="rating" defaultValue="" required>
          <option value="" disabled>Select rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default function GiveReviewsPopup({ reportId = 'default' }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`review_${reportId}`));
    } catch {
      return null;
    }
  });

  if (saved) {
    return (
      <div>
        <button type="button" disabled>Review Given</button>
        <p>{saved.name}: {saved.review} ({saved.rating}/5)</p>
      </div>
    );
  }

  return (
    <Popup
      open={open}
      onClose={() => setOpen(false)}
      trigger={<button type="button" onClick={() => setOpen(true)}>Give Review</button>}
    >
      <GiveReviews
        reportId={reportId}
        onDone={(review) => {
          setSaved(review);
          setOpen(false);
        }}
      />
    </Popup>
  );
}
