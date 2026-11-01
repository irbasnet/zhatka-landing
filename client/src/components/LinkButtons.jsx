import { Link } from 'react-router-dom';
import { MessageSquareMore, ShoppingCart, CookingPot } from 'lucide-react';
import { LINKS, FEATURES } from '../config/links';

export default function LinkButtons() {
  return (
    <div className="links">
      {FEATURES.feedback && (
        <Link className="link-card" to="/feedback">
          <MessageSquareMore className="icon" size={18} strokeWidth={2} />
          <span className="label">Leave Feedback</span>
        </Link>
      )}

      <Link className="link-card" to="/recipes">
        <CookingPot className="icon" size={18} strokeWidth={2} />
        <span className="label">Cook with Zhatka</span>
      </Link>

      <a className="link-card" href={LINKS.shop} target="_blank" rel="noopener noreferrer">
        <ShoppingCart className="icon" size={18} strokeWidth={2} />
        <span className="label">Shop More</span>
      </a>
    </div>
  );
}
