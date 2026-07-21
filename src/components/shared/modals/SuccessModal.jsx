export default function SuccessModal({
  open,
  onDone,
  title = 'Successfully!',
  description = 'Your password has been updated successfully.',
  buttonText = 'Done',
}) {
  if (!open) return null;

  const paragraphs = Array.isArray(description)
    ? description
    : String(description).split('\n');

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className=" flex flex-col items-center min-w-[25em] w-fit rounded-[3em] bg-white  pt-[3em] pb-[1.5em] px-[3.5em] text-center shadow-xl space-y-3 ">
        <div className=" flex h-[6em] w-[6em] items-center justify-center">
          <div
            className="flex h-[6em] w-[6em] items-center justify-center bg-brand"
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

        <h2 className="heading font-bold leading-none text-brand w-fit">
          {title}
        </h2>

        <div className=" text-black/50 space-y-2 w-[50ch]">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mx-auto mt-8 w-full max-w-[50ch]">
          <button
            type="button"
            onClick={onDone}
            className="flex button w-full items-center justify-center rounded-[0.5em] bg-brand-gradient brand-button font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}