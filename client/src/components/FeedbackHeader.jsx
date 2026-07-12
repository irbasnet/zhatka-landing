import { Link } from 'react-router-dom';

export default function FeedbackHeader() {
  return (
    <div className="feedback-header">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span> Back
      </Link>
      <img className="brand-logo" src="/assets/zhatka-logo.svg" alt="Zhatka" />
    </div>
  );
}
