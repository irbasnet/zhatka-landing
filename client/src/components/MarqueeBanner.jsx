import { useLayoutEffect, useRef } from 'react';

const MESSAGE = 'HIMALAYAN ARTISAN SAUCE   ◆   पोल्छ मज्जाले — IT BURNS, DELICIOUSLY!   ◆   BORN IN THE HIMALAYAS, RAISED IN SYDNEY';

export default function MarqueeBanner() {
  const bannerRef = useRef(null);

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    function syncBannerSpace() {
      document.documentElement.style.setProperty('--banner-h', banner.offsetHeight + 'px');
    }
    syncBannerSpace();
    window.addEventListener('resize', syncBannerSpace);
    return () => {
      window.removeEventListener('resize', syncBannerSpace);
      document.documentElement.style.setProperty('--banner-h', '0px');
    };
  }, []);

  return (
    <div className="marquee-banner" ref={bannerRef}>
      <div className="marquee-track">
        <span className="marquee-item">{MESSAGE}</span>
        <span className="marquee-item" aria-hidden="true">{MESSAGE}</span>
      </div>
    </div>
  );
}
