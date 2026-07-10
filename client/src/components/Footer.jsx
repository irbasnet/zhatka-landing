import { useLayoutEffect, useRef } from 'react';
import { LINKS } from '../config/links';
import InstagramIcon from './icons/InstagramIcon';
import TikTokIcon from './icons/TikTokIcon';
import FacebookIcon from './icons/FacebookIcon';

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    function syncFooterSpace() {
      document.documentElement.style.setProperty('--footer-h', footer.offsetHeight + 'px');
    }
    syncFooterSpace();
    window.addEventListener('resize', syncFooterSpace);
    return () => window.removeEventListener('resize', syncFooterSpace);
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-inner">
        <div className="socials">
          <a className="social-btn" href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a className="social-btn" href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <TikTokIcon />
          </a>
          <a className="social-btn" href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
        </div>
        <p className="meta">
          <span id="copyright">© {new Date().getFullYear()} Zhatka</span>
          <span className="dot">·</span>
          <span id="version">v{__APP_VERSION__}</span>
        </p>
      </div>
    </footer>
  );
}
