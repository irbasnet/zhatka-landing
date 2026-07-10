import { Link } from 'react-router-dom';

export default function FeedbackHeader() {
  return (
    <div className="feedback-header">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span> Back
      </Link>
      <div className="brand">
        <span className="brand-wordmark">ZHATKA</span>
        <span className="brand-avatar">Z</span>
      </div>
    </div>
  );
}
