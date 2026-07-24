'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import OptionGroup from '@/components/ui/OptionGroup';

const DEFAULT_ESCORT_PLACES = ['Front Escort', 'Rear Escort', 'Left Escort', 'Right Escort', 'High pole'];

const DEFAULT_DRIVERS = [
  { id: 1, name: 'Chance Korsgaard', imageUrl: 'https://i.pravatar.cc/120?img=51' },
  { id: 2, name: 'Leo Septimus', imageUrl: 'https://i.pravatar.cc/120?img=52' },
  { id: 3, name: 'Gustavo Botosh', imageUrl: 'https://i.pravatar.cc/120?img=53' },
  { id: 4, name: 'Alfredo Vaccaro', imageUrl: 'https://i.pravatar.cc/120?img=54' },
  { id: 5, name: 'Gustavo Schleifer', imageUrl: 'https://i.pravatar.cc/120?img=55' },
  { id: 6, name: 'Omar Passaquindici Arcand', imageUrl: 'https://i.pravatar.cc/120?img=56' },
  { id: 7, name: 'Leo Mango', imageUrl: 'https://i.pravatar.cc/120?img=57' },
  { id: 8, name: 'Davis Culhane', imageUrl: 'https://i.pravatar.cc/120?img=58' },
  { id: 9, name: 'Roger Dias', imageUrl: 'https://i.pravatar.cc/120?img=59' },
];

export default function DriverAssignmentModal({
  open,
  onClose,
  onAssign,
  drivers = DEFAULT_DRIVERS,
  escortPlaces = DEFAULT_ESCORT_PLACES,
  title = 'Assign Driver!',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}) {
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    if (!open) setAssignments({});
  }, [open]);

  if (!open) return null;

  const toggleDriver = (id) => {
    setAssignments((previous) => {
      if (previous[id] !== undefined) {
        const next = { ...previous };
        delete next[id];
        return next;
      }
      return { ...previous, [id]: escortPlaces[0] };
    });
  };

  const setEscortPlace = (id, place) => {
    setAssignments((previous) => ({ ...previous, [id]: place }));
  };

  const handleAssign = () => {
    onAssign?.(assignments);
    onClose?.();
  };

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/80 py-10 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="driver-assignment-title"
    >
      <div className="relative flex w-full max-w-[85rem] max-h-[80vh] flex-col overflow-hidden rounded-[2em] bg-white px-7 pb-7 pt-10 shadow-2xl sm:px-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-[1.5em] top-[1.5em] flex h-[2.5em] w-[2.5em] items-center justify-center rounded-full bg-black text-white transition duration-200 hover:scale-110 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-[1em] w-[1em]"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2
          id="driver-assignment-title"
          className="shrink-0 heading text-center font-bold leading-tight text-brand"
        >
          {title}
        </h2>

        {description && (
          <p className="mx-auto mt-2 max-w-[42em] shrink-0 text-center text-black/50">
            {description}
          </p>
        )}

        <div className="custom-scrollbar mt-7 min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {drivers.map((driver) => {
              const isChecked = assignments[driver.id] !== undefined;

              return (
                <div
                  key={driver.id}
                  className="mb-4 break-inside-avoid rounded-2xl border border-black/5 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={driver.imageUrl}
                      alt={driver.name}
                      className="h-[2.75em] w-[2.75em] shrink-0 rounded-full object-cover"
                    />

                    <span className="flex-1 font-bold text-black">{driver.name}</span>

                    <button
                      type="button"
                      onClick={() => toggleDriver(driver.id)}
                      aria-pressed={isChecked}
                      aria-label={`Select ${driver.name}`}
                      className={`flex h-[1.5em] w-[1.5em] shrink-0 items-center justify-center rounded-[0.35em] border transition-colors ${
                        isChecked ? 'border-brand bg-brand-gradient' : 'border-brand/40 bg-white'
                      }`}
                    >
                      {isChecked && <Icon icon="lucide:check" className="h-[1em] w-[1em] text-white" />}
                    </button>
                  </div>

                  {isChecked && (
                    <div className="mt-2">
                      <p className="mb-1 font-bold text-brand">Escort Place:</p>

                      <OptionGroup
                        options={escortPlaces}
                        value={assignments[driver.id]}
                        onChange={(place) => setEscortPlace(driver.id, place)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-7 w-full max-w-[20.5rem] shrink-0">
          <button
            type="button"
            onClick={handleAssign}
            disabled={Object.keys(assignments).length === 0}
            className="flex button w-full items-center justify-center rounded-sm bg-brand-gradient brand-button font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Assign Booking
          </button>
        </div>
      </div>
    </div>
  );
}
