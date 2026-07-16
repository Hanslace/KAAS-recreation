
import { Icon } from '@iconify/react';



export default function ConfirmationModal({
  open,
  icon,
  title,
  description,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-[25em] rounded-3xl bg-white  pt-10 pb-5 px-10 text-center shadow-xl space-y-3 ">
        <div className="mx-auto flex h-[6em] w-[6em] items-center justify-center">
          <div
            className="flex h-[6em] w-[6em] items-center justify-center bg-brand text-white"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 9%, 75% 8%, 83% 20%, 96% 25%, 92% 39%, 100% 50%, 92% 61%, 96% 75%, 83% 80%, 75% 92%, 61% 91%, 50% 100%, 39% 91%, 25% 92%, 17% 80%, 4% 75%, 8% 61%, 0% 50%, 8% 39%, 4% 25%, 17% 20%, 25% 8%, 39% 9%)',
            }}
          >
            <Icon icon={icon} className="h-[3rem] w-[3rem]" />
          </div>
        </div>

        <h2 className="heading font-bold leading-none text-brand">
          {title}
        </h2>

        <p className="mx-auto  text-black/80">
          {description}
        </p>

        <div className="mx-auto mt-8 grid w-full max-w-[20.5rem] grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-[4em] w-full items-center justify-center rounded-sm bg-white brand-button font-bold text-black shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex h-[4em] w-full items-center justify-center rounded-sm bg-brand-gradient brand-button font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}