import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ContentModal({
  heading,
  content,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const paragraphs = Array.isArray(content)
    ? content
    : String(content ?? '')
        .split(/\n\s*\n/)
        .filter(Boolean);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="content-modal-heading"
      className="modal fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 py-10 px-5 md:px-20 "
      onMouseDown={onClose}
    >
      <div
        className="
          relative flex h-full w-full max-w-[86rem] max-h-[60rem]
          flex-col overflow-hidden rounded-[1.25rem] bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative shrink-0 px-10 pb-2 pt-7 sm:px-20">
          <h2
            id="content-modal-heading"
            className="
              heading
              text-center font-semibold leading-tight
              text-brand "
          >
            {heading}
          </h2>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="
              absolute  flex h-[2em] w-[2em] items-center
              justify-center rounded-full bg-black text-white
              transition-transform duration-200
              hover:scale-105 active:scale-95
              right-[1.8em] top-[1.8em]
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-[1.5em] w-[1.5em]"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="
            custom-scrollbar overflow-y-auto px-7 pb-8
             font-light leading-[1.85] text-black/45
          
          "
        >
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 20)}`}
              className="mb-8 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}