
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
    <div className="flex filters flex-col  gap-4 min-[40rem]:flex-row min-[40rem]:items-center min-[40rem]:justify-between  w-full bg-white rounded-md">
      {/* Filter tabs */}
      <div className="flex w-full overflow-x-auto custom-scrollbar items-center gap-2 py-1">
        {options.map((option) => {
          const isActive = activeTabId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onTabChange(option.id)}
              className={`shrink-0 px-[0.5rem] py-[0.25rem] rounded-sm transition-all duration-150 tracking-tight ${
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
        className='mt'
      />
    </div>
  );
}