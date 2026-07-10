import { Link } from 'react-router-dom';
import { LINKS } from '../config/links';
import ChatIcon from './icons/ChatIcon';
import BagIcon from './icons/BagIcon';
import SkilletIcon from './icons/SkilletIcon';

export default function LinkButtons() {
  return (
    <div className="links">
      <Link className="link-card" to="/feedback">
        <ChatIcon />
        <span className="label">Leave Feedback</span>
      </Link>

      <a className="link-card" href={LINKS.shop} target="_blank" rel="noopener noreferrer">
        <BagIcon />
        <span className="label">Shop More Recipes</span>
      </a>

      <a className="link-card" href={LINKS.recipes}>
        <SkilletIcon />
        <span className="label">Cook with Zhatka</span>
      </a>
    </div>
  );
}
