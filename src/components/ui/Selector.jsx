import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";

export default function Selector({
  label,
  placeholder = "Select",
  options = [],
  value,
  onChange,
  onCustomSelect,
  customOptionId,
  error,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel = options.find((o) => o.id === value)?.label;
  const hasValue = activeLabel != null;

  return (
    <div className={twMerge("input relative w-full flex flex-col gap-1.5", className)}>
      <div ref={ref} className="relative w-full">
        {/* Floating label */}
        <label
          className={`absolute -top-[0.4em] left-[1.75em] px-1 z-10 bg-gradient-to-b from-transparent via-[20%] via-white to-white font-normal leading-none transition-colors duration-200 ${
            error ? "text-red-500!" : ""
          }`}
        >
          {label}
        </label>

        {/* Trigger — styled like the Input box */}
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`flex w-full h-[4.5em] items-center justify-between rounded-[0.6em] border shadow-lg bg-white px-[1.5em] transition-colors duration-200 ${
            error
              ? "border-red-500"
              : isOpen
              ? "border-brand"
              : "border-black/10"
          }`}
        >
          <span
            className={twMerge(
              "truncate font-light",
              hasValue ? "text-black/70" : "text-black/35"
            )}
          >
            {hasValue ? activeLabel : placeholder}
          </span>

          <Icon
            icon="solar:alt-arrow-down-linear"
            className={twMerge(
              "w-[1.5em] h-[1.5em] shrink-0 text-black transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Options menu — full width, brand-gradient active item */}
        {isOpen && (
          <ul
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 rounded-[0.6em] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col gap-1 max-h-[16em] overflow-y-auto custom-scrollbar"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.id === value;
              return (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (customOptionId && option.id === customOptionId) {
                      onCustomSelect?.();
                    } else {
                      onChange?.(option.id);
                    }
                    setIsOpen(false);
                  }}
                  className={twMerge(
                    "flex items-center justify-between px-3 py-2.5 rounded-sm font-medium transition-all cursor-pointer",
                    isSelected
                      ? "bg-brand-gradient text-white shadow-sm"
                      : "text-black hover:bg-gray-50"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <Icon icon="lucide:check" className="w-4 h-4 text-white shrink-0" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <p className="text-red-500 px-4 font-medium transition-all duration-200">
          {error}
        </p>
      )}
    </div>
  );
}