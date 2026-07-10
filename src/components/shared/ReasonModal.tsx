'use client';

import { FormEvent, useEffect, useState } from 'react';

type ReasonModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void | Promise<void>;
  title?: string;
  placeholder?: string;
  buttonText?: string;
};

export default function ReasonModal({
  open,
  onClose,
  onSubmit,
  title = 'Reason',
  placeholder = 'Write your reason',
  buttonText = 'Submit',
}: ReasonModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setReason('');
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(trimmedReason);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reason-modal-title"
    >
      <div className="relative w-full max-w-[28.75rem] rounded-[2.7rem] bg-white px-7 pb-7 pt-12 shadow-2xl sm:px-10 sm:pb-7 sm:pt-12">
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
          className="text-center text-[1.6rem] font-bold leading-none text-brand"
        >
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="relative">
            <label
              htmlFor="reason"
              className="absolute -top-[0.4rem] left-4 z-10 bg-white px-1 text-[0.7rem] font-normal leading-none text-black"
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
              className="h-[12rem] w-full resize-none rounded-lg border border-brand bg-white px-5 py-4 text-[0.9rem] font-normal text-black/70 shadow-[0_12px_25px_rgba(0,0,0,0.12)] outline-none transition placeholder:text-black/25 focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div className="mx-auto mt-7 w-full max-w-[20.25rem]">
            <button
              type="submit"
              disabled={!reason.trim() || isSubmitting}
              className="flex h-[3.25rem] w-full items-center justify-center rounded-lg bg-brand-gradient text-[0.8rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? 'Submitting...' : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}