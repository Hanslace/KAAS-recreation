
import SearchBar from '../ui/SearchBar';
import FilterTabs from './FilterTabs';

export default function FiltersHeader({
  options,
  activeTabId,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search here',
}) {
  return (
    <div className="flex  flex-col  gap-4 min-[40rem]:flex-row min-[40rem]:items-center min-[40rem]:justify-between  w-full bg-white rounded-md">
      <FilterTabs
        options={options}
        activeTabId={activeTabId}
        onTabChange={onTabChange}
      />

      {/* Separate search bar component */}
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
    </div>
  );
}
