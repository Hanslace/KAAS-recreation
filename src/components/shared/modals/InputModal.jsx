'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';

export default function ReasonModal({
  open,
  onClose,
  onSubmit,
  title = 'Reason',
  label = 'Reason',
  placeholder = 'Write your reason',
  buttonText = 'Submit',
  inputProps = {},
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) setValue('');
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/80 pt-10 pb-5 px-10"
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
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="reason-modal-title" className="text-center heading font-bold leading-none text-brand">
          {title}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value);   // hand the raw value to the parent
          }}
          className="mt-10"
        >
          <Input
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...inputProps}
          />

          <div className="mx-auto mt-7 w-full max-w-[20.25rem]">
            <button
              type="submit"
              className="flex button w-full items-center justify-center rounded-sm bg-brand-gradient brand-button font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}