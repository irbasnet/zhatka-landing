import Splash from '../components/Splash';
import Hero from '../components/Hero';
import LinkButtons from '../components/LinkButtons';
import MarqueeBanner from '../components/MarqueeBanner';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Splash />
      <div id="page" data-screen-label="Zhatka QR landing">
        <div className="container">
          <Hero />
          <LinkButtons />
        </div>
      </div>
      <MarqueeBanner />
      <Footer />
    </>
  );
}
