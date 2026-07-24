import { Icon } from "@iconify/react";

export default function OptionGroup({
  options = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`options-group grid grid-cols-3 w-fit gap-x-4 gap-y-4 ${className}`}>
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange?.(option)}
            className="flex items-center gap-2 focus:outline-none"
            role="radio"
            aria-checked={isSelected}
          >
            <span
              className={`flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full border transition-colors ${
                isSelected ? "bg-brand border-brand" : "border-brand/50 bg-white"
              }`}
            >
              {isSelected && (
                <Icon icon="lucide:check" className="h-[1em] w-[1em] text-white" />
              )}
            </span>
            <span className="text-black/70">{option}</span>
          </button>
        );
      })}
    </div>
  );
}