import StarIcon from './icons/StarIcon';

export default function StarRating({ value, onChange }) {
  return (
    <div className="star-rating" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="star-btn"
          role="radio"
          aria-checked={value === star}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          onClick={() => onChange(star)}
        >
          <StarIcon filled={star <= value} />
        </button>
      ))}
    </div>
  );
}
