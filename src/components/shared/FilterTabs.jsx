export default function FilterTabs({ options, activeTabId, onTabChange }) {
  return (
    <div className="filters flex w-full overflow-x-auto custom-scrollbar items-center gap-2 py-1">
      {options.map((option) => {
        const isActive = activeTabId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onTabChange(option.id)}
            className={`shrink-0 tabs rounded-sm transition-all duration-150 tracking-tight ${
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
  );
}
