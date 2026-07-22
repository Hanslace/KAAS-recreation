'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';



export default function FeedbackModal({
  open,
  onClose,
  onSubmit,
  title = 'Reason',
  placeholder = 'Write your reason',
  buttonText = 'Submit',
}) {
  const [reason, setReason] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setReason('');
      setRating(0);
      setHoverRating(0);
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason || !rating || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ rating, review: trimmedReason });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/80 pt-10 pb-5 "
      role="dialog"
      aria-modal="true"
      aria-labelledby="reason-modal-title"
    >
      <div className="relative w-full max-w-[28.75rem] rounded-[3em] bg-white px-7 pb-7 pt-12 shadow-2xl sm:pb-7 sm:pt-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-7 top-9 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition duration-200 hover:scale-110 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2
          id="reason-modal-title"
          className="text-center heading font-bold leading-none text-brand"
        >
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="mt-10">
          <div
            role="radiogroup"
            aria-label="Rating"
            className="mb-5 flex items-center justify-center gap-1"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={rating === star}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform duration-150 hover:scale-110"
              >
                <Icon
                  icon="solar:star-bold"
                  className={`h-[2em] w-[2em] ${
                    (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-black/15'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="relative">
            <label
              htmlFor="reason"
              className="absolute -top-[0.4rem] left-4 z-10 bg-white px-1  font-normal leading-none text-black"
            >
              Reason
            </label>

            <textarea
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={placeholder}
              required
              maxLength={1000}
              className="h-[12em] w-full resize-none rounded-lg border border-brand bg-white px-5 py-4 font-normal text-black/70 shadow-[0_12px_25px_rgba(0,0,0,0.12)] outline-none transition placeholder:text-black/25 focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div className="mx-auto mt-7 w-full max-w-[20.25rem]">
            <button
              type="submit"
              disabled={!reason.trim() || !rating || isSubmitting}
              className="flex button w-full items-center justify-center rounded-sm bg-brand-gradient brand-button font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? 'Submitting...' : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}