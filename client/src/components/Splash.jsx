import { useEffect, useState } from 'react';

export default function Splash() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const autoDismiss = setTimeout(dismiss, 1500);
    return () => clearTimeout(autoDismiss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    setPhase((current) => {
      if (current !== 'visible') return current;
      setTimeout(() => setPhase('removed'), 500);
      return 'hidden';
    });
  }

  if (phase === 'removed') return null;

  return (
    <div
      id="splash"
      data-screen-label="Zhatka splash"
      className={phase === 'hidden' ? 'hidden' : ''}
      onClick={dismiss}
    >
      <div className="mark">
        <img className="bolt" src="/assets/zhatka-bolt-white.svg" alt="" />
        <span className="wordmark">ZHATKA</span>
      </div>
      <p className="tagline">DEEPLY FLAVOURFUL · WILDLY HIMALAYAN</p>
    </div>
  );
}
