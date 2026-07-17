'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function MonthYearPicker({
  value,
  onChange,
  minYear = 2020,
  maxYear = 2035,
  label = 'Provision period',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const pickerRef = useRef(null);
  const selectedYearRef = useRef(null);

  const years = useMemo(
    () =>
      Array.from(
        { length: maxYear - minYear + 1 },
        (_, index) => maxYear - index
      ),
    [minYear, maxYear]
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowYears(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setShowYears(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (showYears && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [showYears]);

  const handleToggle = () => {
    setIsOpen((previous) => !previous);
    setShowYears(false);
  };

  const handleMonthSelect = (monthIndex) => {
    const updatedValue = value
      .month(monthIndex)
      .startOf('month');

    onChange(updatedValue);
    setIsOpen(false);
    setShowYears(false);
  };

  const handleYearSelect = (year) => {
    const updatedValue = value
      .year(year)
      .startOf('month');

    onChange(updatedValue);
    setShowYears(false);
  };

  return (
    <div
      ref={pickerRef}
      className="relative inline-flex"
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`
          flex items-center gap-2 rounded-lg border px-3 py-2
          text-[0.75rem] font-semibold transition-all
          ${
            isOpen
              ? 'border-brand bg-brand/10 text-brand shadow-sm'
              : 'border-black/10 bg-white text-black hover:border-brand/50 hover:bg-brand/5'
          }
        `}
      >
        <span>{value.format('MMMM YYYY')}</span>

        <Icon
          icon="solar:calendar-linear"
          className="h-[1.1em] w-[1.1em] text-brand"
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Select month and year"
          className="
            month-picker-popover
            absolute right-0 top-[calc(100%+0.5rem)] z-50
            w-[290px] overflow-hidden rounded-2xl
            border border-brand/20 bg-white
            shadow-[0_16px_45px_rgba(0,0,0,0.14)]
          "
        >
          <div className="border-b border-black/5 bg-brand/10 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/40">
              {label}
            </p>

            <p className="mt-0.5 text-sm font-bold text-black">
              {value.format('MMMM YYYY')}
            </p>
          </div>

          <div className="flex min-h-[52px] items-center px-4 py-2">
            <button
              type="button"
              onClick={() =>
                setShowYears((previous) => !previous)
              }
              className={`
                flex items-center gap-1.5 rounded-lg px-2 py-1.5
                text-sm font-bold transition-colors
                ${
                  showYears
                    ? 'bg-brand/10 text-brand'
                    : 'text-gray-900 hover:bg-brand/10 hover:text-brand'
                }
              `}
            >
              <span>{value.year()}</span>

              <Icon
                icon="solar:alt-arrow-down-linear"
                className={`
                  h-4 w-4 text-brand transition-transform
                  ${showYears ? 'rotate-180' : ''}
                `}
              />
            </button>
          </div>

          {showYears ? (
            <div
              className="
                grid max-h-[190px] grid-cols-3 gap-2
                overflow-y-auto overflow-x-hidden px-3 pb-4
                [scrollbar-color:#C4A46E_transparent]
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-brand
              "
            >
              {years.map((year) => {
                const isSelected = year === value.year();

                return (
                  <button
                    key={year}
                    ref={isSelected ? selectedYearRef : null}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={`
                      min-h-9 rounded-[10px] border
                      text-[0.8rem] font-semibold transition-all
                      ${
                        isSelected
                          ? 'border-brand bg-brand text-white shadow-[0_5px_14px_rgba(196,164,110,0.35)]'
                          : 'border-transparent text-gray-700 hover:border-brand/20 hover:bg-brand/10 hover:text-brand'
                      }
                    `}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          ) : (
            <div
              className="
                grid max-h-[190px] grid-cols-3 gap-2
                overflow-y-auto overflow-x-hidden px-3 pb-4
                [scrollbar-color:#C4A46E_transparent]
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-brand
              "
            >
              {MONTHS.map((month, monthIndex) => {
                const isSelected =
                  monthIndex === value.month();

                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() =>
                      handleMonthSelect(monthIndex)
                    }
                    className={`
                      min-h-9 rounded-[10px] border
                      text-[0.8rem] font-semibold transition-all
                      ${
                        isSelected
                          ? 'border-brand bg-brand text-white shadow-[0_5px_14px_rgba(196,164,110,0.35)]'
                          : 'border-transparent text-gray-700 hover:border-brand/20 hover:bg-brand/10 hover:text-brand'
                      }
                    `}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}