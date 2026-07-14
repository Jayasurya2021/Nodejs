import React from 'react';
import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating, size = 14, interactive = false, onRate }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type={interactive ? "button" : "submit"}
        onClick={(e) => {
          if (interactive) {
            e.preventDefault();
            if (onRate) onRate(star);
          }
        }}
        disabled={!interactive}
        className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
      >
        <FiStar
          size={size}
          className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-100'}
        />
      </button>
    ))}
  </div>
);

export default StarRating;
