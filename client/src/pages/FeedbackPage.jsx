import { useState } from 'react';
import FeedbackHeader from '../components/FeedbackHeader';
import StarRating from '../components/StarRating';
import ProductSelect from '../components/ProductSelect';
import AnonymousToggle from '../components/AnonymousToggle';
import { submitFeedback } from '../api/client';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState('');
  const [comment, setComment] = useState('');
  const [addContact, setAddContact] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating < 1) return;

    setStatus('submitting');
    try {
      await submitFeedback({
        rating,
        product: product || null,
        comment: comment || null,
        isAnonymous: !addContact,
        name: addContact ? name || null : null,
        contact: addContact ? contact || null : null,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="container feedback-page">
        <FeedbackHeader />
        <div className="feedback-success">
          <h1>Thank you!</h1>
          <p>Your feedback helps Zhatka get better.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container feedback-page">
      <FeedbackHeader />
      <hr className="divider" />

      <form onSubmit={handleSubmit}>
        <div className="feedback-intro">
          <h1>How was your experience?</h1>
          <p>Tell ZHATKA what you think.</p>
        </div>

        <StarRating value={rating} onChange={setRating} />
        <p className="rating-caption">Tap a star to rate</p>

        <label className="field-label" htmlFor="product-select">Which product? (optional)</label>
        <ProductSelect value={product} onChange={setProduct} />

        <textarea
          className="feedback-textarea"
          placeholder="Tell us more (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <hr className="divider" />

        <AnonymousToggle
          addContact={addContact}
          onToggle={setAddContact}
          name={name}
          onNameChange={setName}
          contact={contact}
          onContactChange={setContact}
        />

        {status === 'error' && <p className="feedback-error">Something went wrong — please try again.</p>}

        <button type="submit" className="link-card submit-btn" disabled={rating < 1 || status === 'submitting'}>
          <span className="label">{status === 'submitting' ? 'Submitting…' : 'Submit Feedback'}</span>
        </button>
      </form>
    </div>
  );
}
