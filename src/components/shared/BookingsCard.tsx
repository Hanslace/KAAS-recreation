'use client';

import {Link} from 'react-router';
import { Icon } from '@iconify/react';

export interface BookingsCardData {
  price: string;
  status: 'Reschedule' | 'Cancelled' | 'Completed' | string;
  slug: string;
  imageUrl: string;
  companyLogoUrl: string;
  companyName: string;
  rating: number;
  reviewCount: number;
  dateTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  distanceAway: string;
}

interface BookingsCardProps {
  booking: BookingsCardData;
}

export default function BookingsCard({ booking }: BookingsCardProps) {
  return (
    <Link
      to={`/bookings/${booking.slug}`}
      className="block w-full focus:outline-none"
      aria-label={`View booking for ${booking.companyName}`}
    >
      <div className="w-full flex flex-col rounded-[24px] p-5 shadow-xl border bg-white border-gray-100 transition-all duration-300 ease-in-out hover:bg-[#FAF6EE] hover:border-brand/30 hover:shadow-md">
        
        <div className="relative aspect-[9/5]  rounded-2xl overflow-hidden shrink-0 group">
          <img
            src={booking.imageUrl}
            alt={`${booking.companyName} truck layout`}
            className="h-full aspect-[9/5] object-cover transition-transform duration-300 group-hover:scale-105 brightness-60"
          />

          <span className="absolute top-3 left-4 backdrop-blur-md px-2.5 py-1 rounded-xl lg:text-[1.8rem] font-bold text-white tracking-tight">
            {booking.price}
          </span>

          <span className="absolute top-4 right-4 text-[0.5rem] lg:text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-md bg-brand/40 text-white border border-brand">
            {booking.status}
          </span>
        </div>

        <div className="mt-4 flex flex-col space-y-3.5 text-left flex-1">
          <div className="flex items-start gap-3">
            <img
              src={booking.companyLogoUrl}
              alt={`${booking.companyName} Logo`}
              className="w-10 h-10 rounded-full object-cover shadow-sm bg-black border border-gray-100 shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <h4 className="text-[1rem] lg:text-[1.5rem] font-bold text-gray-900 tracking-tight leading-tight truncate">
                {booking.companyName}
              </h4>

              <div className="flex  flex-col lg:flex-row lg:items-center gap-1 mt-1">
                <div className='flex items-center gap-1 mt-1'>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} icon="solar:star-bold" className="w-2 h-2 lg:w-3 lg:h-3" />
                    ))}
                  </div>
                
                  <span className="text-[0.8rem] lg:text-[1rem] font-bold text-black ml-1">
                    {booking.rating}
                  </span>
                </div>
                  <span className='text-[0.8rem] lg:text-[1rem] text-brand hidden lg:block'>|</span>

                  <span className="text-[0.8rem] lg:text-[1rem] text-brand">
                    {booking.reviewCount} Reviews
                  </span>
                
              </div>
            </div>
          </div>

          <div className="space-y-2 text-[0.75rem] lg:text-[0.875rem] font-medium text-gray-500 pt-1 border-t border-gray-100/50">
            <div className="flex items-start gap-2.5">
              <Icon icon="uil:calendar" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-bold text-gray-900">Date & Time: </span>
                <span className="text-gray-500">{booking.dateTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Icon icon="boxicons:location" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-bold text-gray-900">Pickup: </span>
                <span className="text-gray-500">{booking.pickupLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Icon icon="boxicons:location" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-bold text-gray-900">Drop: </span>
                <span className="text-gray-500">{booking.dropoffLocation}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[0.8rem] lg:text-[0.875rem] font-semibold text-black pt-2 border-t border-gray-100/30 mt-auto">
            <Icon icon="boxicons:location-filled" className="w-6 h-6 text-brand" />
            <span>{booking.distanceAway}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}