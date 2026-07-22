'use client';

import { Icon } from '@iconify/react';

function BookingDetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-1">
      <Icon icon={icon} className="mt-0.5 h-[1.25em] w-[1.25em] shrink-0 text-brand" />
      <div className="min-w-0">
        <span className="font-bold text-gray-900">{label}: </span>
        <span className="break-words text-gray-500">{value}</span>
      </div>
    </div>
  );
}

export default function BookingsCard({ booking, selected = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(booking.slug)}
      className="block w-full text-left focus:outline-none booking-card"
      aria-pressed={selected}
      aria-label={`Select booking for ${booking.companyName}`}
    >
      <div
        className={`w-full flex flex-col rounded-xl p-3 shadow-xl border bg-white transition-all duration-300 ease-in-out hover:bg-[#FAF6EE] hover:shadow-md ${
          selected ? 'border-brand ring-1 ring-brand' : 'border-gray-100 hover:border-brand/30'
        }`}
      >
        <div className="relative aspect-[444/250] rounded-2xl overflow-hidden shrink-0 group">
          <img
            src={booking.imageUrl}
            alt={`${booking.companyName} vehicle`}
            className="h-full w-full aspect-[444/250] object-cover transition-transform duration-300 group-hover:scale-105 brightness-60"
          />

          <span className="absolute price top-3 left-3 backdrop-blur-md rounded-xl font-bold text-white tracking-tight">
            {booking.price}
          </span>

          {/* Checkbox replacing the status pill */}
          <span
            className={`absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
              selected
                ? 'bg-brand border-brand'
                : 'bg-white/30 border-white backdrop-blur-md'
            }`}
          >
            {selected && <Icon icon="lucide:check" className="h-4 w-4 text-white" />}
          </span>
        </div>

        <div className="mt-4 flex flex-col space-y-1 text-left flex-1">
          <div className="flex items-start gap-1">
            <img
              src={booking.companyLogoUrl}
              alt={`${booking.companyName} Logo`}
              className="w-8 h-8 rounded-full object-cover shadow-sm bg-black border border-gray-100 shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <h4 className="heading font-bold text-gray-900 tracking-tight leading-tight truncate">
                {booking.companyName}
              </h4>

              <div className="flex flex-row items-center gap-0.2 mt-1">
                <div className="flex gap-[1px] text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="solar:star-bold" className="w-[0.85em] h-[0.85em]" />
                  ))}
                </div>
                <span className="font-bold text-black ml-1">{booking.rating} |</span>
                <span className="text-brand">{booking.reviewCount} Reviews</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 border-t border-gray-100/50 pt-1 font-medium text-gray-500">
            <BookingDetailRow icon="uil:calendar" label="Date & Time" value={booking.dateTime} />
            <BookingDetailRow icon="boxicons:location" label="Pickup" value={booking.pickupLocation} />
            <BookingDetailRow icon="boxicons:location" label="Drop" value={booking.dropoffLocation} />
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-black pt-2 border-t border-gray-100/30 mt-auto">
            <Icon icon="boxicons:location-filled" className="w-[2em] h-[2em] text-brand" />
            <span>{booking.distanceAway}</span>
          </div>
        </div>
      </div>
    </button>
  );
}