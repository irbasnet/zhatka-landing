import { useState } from 'react';
import FeedbackHeader from '../components/FeedbackHeader';
import StarRating from '../components/StarRating';
import ProductSelect from '../components/ProductSelect';
import AnonymousToggle from '../components/AnonymousToggle';
import Footer from '../components/Footer';
import { submitFeedback } from '../api/client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-().]{7,}$/;

function isValidContact(value) {
  const trimmed = value.trim();
  return EMAIL_RE.test(trimmed) || PHONE_RE.test(trimmed);
}

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState('');
  const [comment, setComment] = useState('');
  const [addContact, setAddContact] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [touched, setTouched] = useState(false);

  const commentRequired = rating > 0 && rating <= 3;
  const commentMissing = commentRequired && !comment.trim();
  const nameMissing = addContact && !name.trim();
  const contactMissing = addContact && !contact.trim();
  const contactInvalid = addContact && contact.trim() && !isValidContact(contact);

  const canSubmit =
    rating >= 1 && !commentMissing && !nameMissing && !contactMissing && !contactInvalid;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

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
      <>
        <div className="container feedback-page">
          <FeedbackHeader />
          <div className="feedback-success">
            <h1>Thank you!</h1>
            <p>Your feedback helps Zhatka get better.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container feedback-page">
        <FeedbackHeader />
        <hr className="divider" />

        <form onSubmit={handleSubmit} noValidate>
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
            placeholder={commentRequired ? 'Tell us what went wrong' : "What'd you love? (optional)"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {touched && commentMissing && (
            <p className="field-error">A low rating helps us most with a quick note on what happened.</p>
          )}

          <hr className="divider" />

          <AnonymousToggle
            addContact={addContact}
            onToggle={setAddContact}
            name={name}
            onNameChange={setName}
            contact={contact}
            onContactChange={setContact}
          />
          {touched && addContact && (nameMissing || contactMissing) && (
            <p className="field-error">Add your name and an email or phone number, or turn this off to stay anonymous.</p>
          )}
          {touched && contactInvalid && !nameMissing && !contactMissing && (
            <p className="field-error">That doesn't look like a valid email or phone number.</p>
          )}

          {status === 'error' && <p className="feedback-error">Something went wrong — please try again.</p>}

          <button type="submit" className="link-card submit-btn" disabled={status === 'submitting' || rating < 1 || (touched && !canSubmit)}>
            <span className="label">{status === 'submitting' ? 'Submitting…' : 'Submit Feedback'}</span>
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
