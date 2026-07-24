'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Input from '@/components/ui/Input';

export default function PaymentModal({
  open,
  onClose,
  onSubmit,
  originalFare = '$625',
}) {
  const [option, setOption] = useState('original');
  const [updatedFare, setUpdatedFare] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setOption('original');
      setUpdatedFare('');
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const isUpdate = option === 'update';
  const canSubmit = !isUpdate || updatedFare.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit?.({
        option,
        fare: isUpdate ? updatedFare.trim() : originalFare,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="relative w-full max-w-[26.5rem] rounded-[3em] bg-white px-7 pb-7 pt-12 shadow-2xl">
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
          id="payment-modal-title"
          className="text-center heading font-bold leading-none text-brand"
        >
          Mark as Paid
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <button
            type="button"
            onClick={() => setOption('original')}
            className="flex w-full items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                  option === 'original' ? 'border-brand bg-brand' : 'border-brand/50 bg-white'
                }`}
              >
                {option === 'original' && (
                  <Icon icon="lucide:check" className="h-3.5 w-3.5 text-white" />
                )}
              </span>

              <span className="font-bold text-black">Original Fare</span>
            </span>

            <span className="text-2xl font-black tracking-tight text-black">
              {originalFare}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOption('update')}
            className="flex items-center gap-2"
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                option === 'update' ? 'border-brand bg-brand' : 'border-brand/50 bg-white'
              }`}
            >
              {option === 'update' && (
                <Icon icon="lucide:check" className="h-3.5 w-3.5 text-white" />
              )}
            </span>

            <span className="font-bold text-black">Update Fare</span>
          </button>

          {isUpdate && (
            <Input
              label="Updated Fare"
              placeholder="Enter Updated Fare"
              type="number"
              inputMode="decimal"
              value={updatedFare}
              onChange={(event) => setUpdatedFare(event.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="flex button w-full items-center justify-center rounded-sm bg-brand-gradient brand-button font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
