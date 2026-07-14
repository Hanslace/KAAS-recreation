

export default function SuccessModal({
  open,
  onDone,
  title = 'Successfully!',
  description = 'Your password has been updated successfully.',
  buttonText = 'Done',
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-[31.25rem] rounded-[2.5rem] bg-white px-6 py-12 text-center shadow-xl sm:px-10">
        <div className="mx-auto flex h-[6.5rem] w-[6.5rem] items-center justify-center">
          <div
            className="flex h-[6rem] w-[6rem] items-center justify-center bg-brand"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 9%, 75% 8%, 83% 20%, 96% 25%, 92% 39%, 100% 50%, 92% 61%, 96% 75%, 83% 80%, 75% 92%, 61% 91%, 50% 100%, 39% 91%, 25% 92%, 17% 80%, 4% 75%, 8% 61%, 0% 50%, 8% 39%, 4% 25%, 17% 20%, 25% 8%, 39% 9%)',
            }}
          >
            <svg
              viewBox="0 0 52 52"
              className="h-[3.5rem] w-[3.5rem]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14 27L22 35L39 18"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="mt-5 text-[1.8rem] font-bold leading-none text-brand">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-[17rem] text-[1rem] leading-[1.35] text-black/50">
          {description}
        </p>

        <div className="mx-auto mt-8 w-full max-w-[20.25rem]">
        <button
            type="button"
            onClick={onDone}
            className="flex h-[3.25rem] w-full items-center justify-center rounded-xl bg-brand-gradient text-[0.95rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
        >
            {buttonText}
        </button>
        </div>
      </div>
    </div>
  );
}