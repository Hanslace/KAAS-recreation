
import SearchBar from '../ui/SearchBar';

interface FilterOption {
  id: string;
  label: string;
}

interface FiltersHeaderProps {
  /** Array of filter options containing a unique id string and display label string */
  options: FilterOption[];

  /** Current active selection ID matching an option id string token */
  activeTabId: string;

  /** State callback handler triggered when a tab is clicked */
  onTabChange: (id: string) => void;

  /** Current textual value inside the search input element */
  searchValue: string;

  /** State callback handler triggered when user changes input text entry */
  onSearchChange: (value: string) => void;

  /** Custom optional placeholder override configuration for the text field */
  searchPlaceholder?: string;
}

export default function FiltersHeader({
  options,
  activeTabId,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search here',
}: FiltersHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 lg:gap-10 lg:flex-row lg:items-center lg:justify-between w-full bg-white rounded-md">
      {/* Filter tabs */}
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 pb-1">
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