'use client';

import { useState } from 'react';

interface AttachmentImageProps {
  src: string;
  alt: string;
}

export default function AttachmentImage({ src, alt }: AttachmentImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative block text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        aria-label={`View larger version of ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          width={130}
          height={105}
          className="h-[7rem] min-h-[6rem] w-[6rem] min-w-[5rem] rounded-lg object-contain shadow-md cursor-zoom-in transition group-hover:opacity-90"
        />
      </button>

      {/* Full-Screen Overlay Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 focus:outline-none"
            aria-label="Close image viewer"
          >
            &times;
          </button>

          {/* Large Image Container */}
          <div 
            className="relative max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image itself
          >
            <div className="absolute inset-0">
              <img
                src={src}
                alt={alt}
                fetchPriority="high" // ✅ Replaces Next.js priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="h-full w-full object-contain" // ✅ Replaces Next.js fill layout
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
