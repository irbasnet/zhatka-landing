import { Flame } from 'lucide-react';
import FeedbackHeader from '../components/FeedbackHeader';
import Footer from '../components/Footer';

const PRODUCTS = [
  {
    key: 'tingly-timur',
    name: 'Tingly Timur',
    tagline: 'The Zing',
    heat: 2,
    heatLabel: 'Medium heat — झनन पार्ने',
    description:
      'Timur is heritage — the mountain spice our grandmothers swore by. A tingle before the burn, straight off the hills.',
    tags: ['Momo', 'Stick food', 'Grilled meat'],
    theme: 'theme-timur',
  },
  {
    key: 'dalle-drip',
    name: 'Dalle Drip',
    tagline: 'The Classic',
    heat: 3,
    heatLabel: 'Hot — कान ठाडो पार्ने',
    description:
      'Dalle chilli is legend in every Nepali kitchen — fruity, sharp, unapologetically hot. This is the heat we grew up on.',
    tags: ['Meats', 'Wings', 'Soup noodles', 'Everyday'],
    theme: 'theme-dalle',
  },
  {
    key: 'achar-attack',
    name: 'Achar Attack',
    tagline: 'The Kick',
    heat: 4,
    heatLabel: 'Extra hot — तिरिमिरी झ्याइ',
    description:
      'Built with real achar, not just the flavour of it. Bold, tangy, full masala — the jar your dai hides from guests.',
    tags: ['Dal bhat', 'Momo', 'Sekuwa', 'Anything'],
    theme: 'theme-achar',
  },
];

export default function RecipesPage() {
  return (
    <>
      <div className="container recipes-page">
        <FeedbackHeader />
        <hr className="divider" />

        <div className="recipes-intro">
          <p className="eyebrow">Get your Zhatka</p>
          <h1>Three heats. One family.</h1>
          <p className="recipes-sub">Can&apos;t decide? Scroll down — let the bottles argue for themselves.</p>
        </div>

        <div className="product-cards">
          {PRODUCTS.map((product) => (
            <div key={product.key} className={`product-card ${product.theme}`}>
              <span className="card-accent" aria-hidden="true" />
              <h2 className="card-name">{product.name}</h2>
              <p className="card-tagline">{product.tagline}</p>

              <div className="heat-rating" role="img" aria-label={`Heat level ${product.heat} out of 5`}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <Flame
                    key={level}
                    size={16}
                    strokeWidth={2}
                    fill={level <= product.heat ? 'currentColor' : 'none'}
                    className={level <= product.heat ? 'flame-on' : 'flame-off'}
                  />
                ))}
              </div>
              <p className="heat-label">{product.heatLabel}</p>

              <p className="card-desc">{product.description}</p>

              <hr className="card-divider" />

              <p className="tag-label">Best with</p>
              <div className="tag-row">
                {product.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="recipes-outro">
          <p className="eyebrow">Until the videos are ready</p>
          <h2>Shake. Drop. Repeat.</h2>
          <p className="recipes-sub">
            Refrigerate after opening. This page will get a video version soon — for now, this is the full
            instruction manual.{' '}
            <a href="https://zhatka.com.au" target="_blank" rel="noopener noreferrer">zhatka.com.au</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
