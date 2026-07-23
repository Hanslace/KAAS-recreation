'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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

export function DayPicker({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? dayjs());

  const pickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const cells = useMemo(() => {
    const startOfMonth = viewDate.startOf('month');
    const startWeekday = startOfMonth.day();
    const daysInMonth = viewDate.daysInMonth();
    const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;
    const gridStart = startOfMonth.subtract(startWeekday, 'day');

    return Array.from({ length: totalCells }, (_, index) =>
      gridStart.add(index, 'day')
    );
  }, [viewDate]);

  const handleToggle = () => {
    setIsOpen((previous) => {
      const next = !previous;
      if (next) setViewDate(value ?? dayjs());
      return next;
    });
  };

  const handlePrevMonth = () => {
    setViewDate((previous) => previous.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setViewDate((previous) => previous.add(1, 'month'));
  };

  const handleDaySelect = (day) => {
    onChange(day);
    setIsOpen(false);
  };

  return (
    <div className={twMerge('input relative w-full flex flex-col gap-1.5', className)}>
      <div ref={pickerRef} className="relative w-full">
        {label && (
          <label
            className={`absolute -top-[0.4em] left-[1.75em] px-1 z-10 bg-gradient-to-b from-transparent via-[20%] via-white to-white font-normal leading-none transition-colors duration-200 ${
              error ? 'text-red-500!' : ''
            }`}
          >
            {label}
          </label>
        )}

        <button
          type="button"
          onClick={handleToggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={`flex h-[4.5em] w-full items-center justify-between rounded-[0.6em] border shadow-lg bg-white px-[1.5em] transition-colors duration-200 ${
            error
              ? 'border-red-500'
              : isOpen
              ? 'border-brand'
              : 'border-black/10'
          }`}
        >
          <span
            className={twMerge(
              'truncate font-light',
              value ? 'text-black/70' : 'text-black/35'
            )}
          >
            {value ? value.format('MMM D, YYYY') : placeholder}
          </span>

          <Icon
            icon="solar:calendar-linear"
            className="h-[1.5em] w-[1.5em] shrink-0 text-brand"
          />
        </button>

        {isOpen && (
          <div
            role="dialog"
            aria-label="Select date"
            className="
              day-picker-popover
              absolute left-0 top-[calc(100%+0.5rem)] z-50
              w-[290px] overflow-hidden rounded-2xl
              border border-brand/20 bg-white
              shadow-[0_16px_45px_rgba(0,0,0,0.14)]
            "
          >
            <div className="flex items-center justify-between px-4 py-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="rounded-lg p-1.5 text-brand transition-colors hover:bg-brand/10"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="h-4 w-4" />
            </button>

            <span className="text-sm font-bold text-gray-900">
              {viewDate.format('MMMM YYYY')}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="rounded-lg p-1.5 text-brand transition-colors hover:bg-brand/10"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 px-3 pb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-black/40">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 px-3 pb-4">
            {cells.map((cell) => {
              const inCurrentMonth = cell.month() === viewDate.month();
              const isSelected = value && cell.isSame(value, 'day');
              const isToday = cell.isSame(dayjs(), 'day');

              return (
                <button
                  key={cell.format('YYYY-MM-DD')}
                  type="button"
                  disabled={!inCurrentMonth}
                  onClick={() => handleDaySelect(cell)}
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-[10px]
                    border text-[0.8rem] font-semibold transition-all
                    ${
                      !inCurrentMonth
                        ? 'cursor-default border-transparent text-gray-300'
                        : isSelected
                        ? 'border-brand bg-brand text-white shadow-[0_5px_14px_rgba(196,164,110,0.35)]'
                        : `border-transparent text-gray-700 hover:border-brand/20 hover:bg-brand/10 hover:text-brand ${
                            isToday ? 'ring-1 ring-brand/40' : ''
                          }`
                    }
                  `}
                >
                  {cell.date()}
                </button>
              );
            })}
            </div>
          </div>
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