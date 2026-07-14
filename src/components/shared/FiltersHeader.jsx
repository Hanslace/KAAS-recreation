
import SearchBar from '../ui/SearchBar';

export default function FiltersHeader({
  options,
  activeTabId,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search here',
}) {
  return (
    <div className="flex flex-col items-center gap-4 lg:gap-10 lg:flex-row lg:items-center lg:justify-between w-full bg-white rounded-md">
      {/* Filter tabs */}
      <div className="flex w-full overflow-x-auto custom-scrollbar items-center gap-2 pb-1">
        {options.map((option) => {
          const isActive = activeTabId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onTabChange(option.id)}
              className={`shrink-0 px-4 lg:px-[0.75rem] lg:py-[0.5rem] py-2 text-[0.7rem] xl:text-[0.8rem] font-semibold rounded-lg transition-all duration-150 tracking-tight ${
                isActive
                  ? 'bg-brand-gradient text-white shadow-sm'
                  : 'bg-brand/20 text-brand hover:bg-brand/40'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Separate search bar component */}
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
    </div>
  );
}