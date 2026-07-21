import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';

export default function Dropdown({
  filters,
  activeFilter,
  onFilterChange,
  onCustomSelect,            // called instead of onFilterChange for the custom option
  customOptionId,            // id of the option that triggers onCustomSelect
  labelText = "Sort By:",
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLabel = filters.find((f) => f.id === activeFilter)?.label || 'All';

  return (
    <div ref={dropdownRef} className={twMerge("flex items-center gap-3 relative z-30 select-none dropdown", className)}>
      <span className="label font-medium text-gray-700 whitespace-nowrap">
        {labelText}
      </span>

      <div className="relative ">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-[3em] w-full items-center justify-between gap-3 rounded-sm bg-white px-2 text-black shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-50/50 transition-all focus:outline-none focus:ring-1 focus:ring-brand font-medium "
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className='truncate'>{activeLabel}</span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            className={twMerge("w-[1.5em] h-[1.5em] text-black transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>

        {isOpen && (
          <ul
            className="absolute right-0 top-[calc(100%+0.5rem)] w-[25ch]  rounded-sm bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col gap-1 focus:outline-none"
            role="listbox"
          >
            {filters.map((filter) => {
              const isSelected = filter.id === activeFilter;

              return (
                <li
                  key={filter.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (customOptionId && filter.id === customOptionId) {
                      onCustomSelect?.();     // open modal, don't select
                    } else {
                      onFilterChange(filter.id);
                    }
                    setIsOpen(false);
                  }}
                  className={twMerge(
                    "flex items-center justify-between px-2 py-2 rounded-sm font-medium transition-all cursor-pointer",
                    isSelected
                      ? "bg-brand-gradient text-white shadow-sm"
                      : "text-black hover:bg-gray-50"
                  )}
                >
                  <span>{filter.label}</span>
                  {isSelected && (
                    <Icon icon="lucide:check" className="w-4 h-4 text-white shrink-0" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}