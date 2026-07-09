'use client';

import { Icon } from '@iconify/react';

type ConfirmationModalProps = {
  open: boolean;
  icon: string;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function ConfirmationModal({
  open,
  icon,
  title,
  description,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!open) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-[25rem]  flex flex-col items-center justify-center rounded-[2.5rem] bg-white px-6 py-12 text-center shadow-xl sm:px-10">
        <div className="mx-auto flex h-[6.5rem] w-[6.5rem] items-center justify-center">
          <div
            className="flex h-[6rem] w-[6rem] items-center justify-center bg-brand text-white"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 9%, 75% 8%, 83% 20%, 96% 25%, 92% 39%, 100% 50%, 92% 61%, 96% 75%, 83% 80%, 75% 92%, 61% 91%, 50% 100%, 39% 91%, 25% 92%, 17% 80%, 4% 75%, 8% 61%, 0% 50%, 8% 39%, 4% 25%, 17% 20%, 25% 8%, 39% 9%)',
            }}
          >
            <Icon icon={icon} className="h-[3rem] w-[3rem]" />
          </div>
        </div>

        <h2 className="mt-5 text-[1.8rem] font-bold leading-none text-brand">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-[18rem] text-[1rem] leading-[1.35] text-black/50">
          {description}
        </p>

        <div className="mx-auto mt-8 grid w-full max-w-[20.5rem] grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-[3.25rem] items-center justify-center rounded-lg border border-black bg-white text-[0.95rem] font-bold text-black transition duration-300 hover:bg-black hover:text-white active:scale-95"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex h-[3.25rem] items-center justify-center rounded-lg bg-brand-gradient text-[0.95rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}