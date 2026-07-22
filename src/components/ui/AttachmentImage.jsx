'use client';

import { useState } from 'react';

export default function AttachmentImage({ src, alt, onRemove, w = '5rem', h = '6rem' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail with corner remove button */}
      <div className="relative inline-block w-fit">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative block text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          aria-label={`View larger version of ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            style={{ width: w, height: h }}
            className="rounded-lg object-cover shadow-md cursor-zoom-in transition group-hover:opacity-90"
          />
        </button>

        {/* Corner cross / remove button */}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${alt}`}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:scale-105 focus:outline-none"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 6L18 18M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>

      {/* Full-Screen Overlay Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 focus:outline-none"
            aria-label="Close image viewer"
          >
            &times;
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0">
              <img
                src={src}
                alt={alt}
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}