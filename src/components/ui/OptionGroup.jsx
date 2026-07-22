import { Icon } from "@iconify/react";

export default function OptionGroup({
  options = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
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
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                isSelected ? "bg-brand border-brand" : "border-brand/50 bg-white"
              }`}
            >
              {isSelected && (
                <Icon icon="lucide:check" className="h-3.5 w-3.5 text-white" />
              )}
            </span>
            <span className="text-black/70">{option}</span>
          </button>
        );
      })}
    </div>
  );
}