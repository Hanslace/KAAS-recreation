import { Icon } from '@iconify/react';



export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className=" pagination grid sm:grid-cols-2 md:grid-cols-3  gap-3">
      <span className="text-black flex items-center justify-center sm:justify-start">
        Showing {startItem} to {endItem} of {totalItems} results
      </span>

      <div className="flex justify-center items-center gap-2">
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 font-medium text-black/50 transition hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon icon="solar:alt-arrow-left-linear" className="h-[1em] w-[1em]" />
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goTo(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-full font-medium transition ${
              page === currentPage
                ? 'border border-brand text-brand'
                : 'text-black/50 hover:text-brand'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 font-medium text-black/50 transition hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <Icon icon="solar:alt-arrow-right-linear" className="h-[1em] w-[1em]" />
        </button>
      </div>
    </div>
  );
}
