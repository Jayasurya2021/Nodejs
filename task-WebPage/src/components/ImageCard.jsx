import React from 'react';

/**
 * ImageCard – a reusable premium card component.
 * Uses Tailwind‑based glass‑morphism utilities and integrates with
 * the scroll‑reveal animation via the "reveal-item" class.
 *
 * Props:
 *   image: string – URL of the image to display (required)
 *   title: string – Card title (optional)
 *   description: string – Short description (optional)
 *   className: string – Additional Tailwind classes to extend styling (optional)
 */
export default function ImageCard({
  image,
  title = '',
  description = '',
  className = ''
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-bgCard backdrop-blur-xl border border-border shadow-glass transition-transform hover:scale-[1.02] reveal-item ${className}`}
    >
      <img
        src={image}
        alt={title || 'Image'}
        className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-90"
      />
      {(title || description) && (
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-bgCard/70 to-transparent">
          {title && <h3 className="text-lg font-semibold text-white drop-shadow-sm">{title}</h3>}
          {description && (
            <p className="mt-1 text-sm text-white/80 line-clamp-2 drop-shadow-sm">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
