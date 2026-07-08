'use client';

import React from 'react';
import { Icon } from '@iconify/react';

export interface LogisticsCardProps {
  /** The pricing display string (e.g., "$625") */
  price: string;
  /** Status banner text token (e.g., "Reschedule", "Cancelled", "Completed") */
  status: 'Reschedule' | 'Cancelled' | 'Completed' | string;
  /** Image URL path for the carrier vehicle */
  imageUrl: string;
  /** Company logo image asset or avatar URL */
  companyLogoUrl: string;
  /** Primary title of the logistics company */
  companyName: string;
  /** Numeric rating decimal value (e.g., 4.8) */
  rating: number;
  /** Number of aggregate customer reviews */
  reviewCount: number;
  /** Scheduled date and time string */
  dateTime: string;
  /** Origin pickup location summary text */
  pickupLocation: string;
  /** Destination destination dropoff summary text */
  dropoffLocation: string;
  /** Geographic baseline radius proximity string */
  distanceAway: string;
}

export default function LogisticsCard({
  price,
  status,
  imageUrl,
  companyLogoUrl,
  companyName,
  rating,
  reviewCount,
  dateTime,
  pickupLocation,
  dropoffLocation,
  distanceAway
}: LogisticsCardProps) {
  
  // Custom helper mapping to handle variable background context states safely


  return (
    <div className="w-full flex flex-col rounded-[24px] p-5 shadow-xl border bg-white border-gray-100 transition-all duration-300 ease-in-out hover:bg-[#FAF6EE] hover:border-[#C4A46E]/30 hover:shadow-md">
      
      {/* ========================================================================= */}
      {/* HERO IMAGE CONTAINER COVER AREA                                           */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[15rem] rounded-2xl overflow-hidden shrink-0 group">
        <img 
          src={imageUrl} 
          alt={`${companyName} truck layout`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-60"
        />
        
        {/* Floating Price Overlap Tag */}
        <span className="absolute top-4 left-4  backdrop-blur-md px-3 py-1 rounded-xl text-[1.8rem] font-bold text-white tracking-tight">
          {price}
        </span>

        {/* Floating Responsive Status Accent Indicator Banner */}
        <span className={`absolute top-4 right-4 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-md bg-brand/40 text-white border border-brand`}>
          {status}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* CARD BODY CONTENT SUMMARY CONTAINER                                       */}
      {/* ========================================================================= */}
      <div className="mt-4 flex flex-col space-y-3.5 text-left flex-1">
        
        {/* Company Identity Banner (Avatar + Title + Rating) */}
        <div className="flex items-start gap-3">
          <img 
            src={companyLogoUrl} 
            alt={`${companyName} Logo`}
            className="w-10 h-10 rounded-full object-cover shadow-sm bg-black border border-gray-100 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <h4 className="text-[1.5rem] font-bold text-gray-900 tracking-tight leading-tight truncate">
              {companyName}
            </h4>
            
            {/* Dynamic Gold Rating Star Node Stack Array */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="solar:star-bold" className="w-3 h-3" />
                ))}
              </div>
              <span className="text-[1rem] font-bold text-black ml-1">{rating}</span>
              <span className="text-[1rem]  text-brand">| {reviewCount} Reviews</span>
            </div>
          </div>
        </div>

        {/* Operational Metrics Sublist Frame */}
        <div className="space-y-2 text-[0.875rem] font-medium text-gray-500 pt-1 border-t border-gray-100/50">
          
          {/* Appointment Data Record */}
          <div className="flex items-start gap-2.5">
            <Icon icon="uil:calendar" className="w-5 h-5 text-[#C4A46E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900">Date & Time: </span>
              <span className="text-gray-500">{dateTime}</span>
            </div>
          </div>

          {/* Logistics Origin Context Marker */}
          <div className="flex items-start gap-2.5">
            <Icon icon="boxicons:location" className="w-5 h-5 text-[#C4A46E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900">Pickup: </span>
              <span className="text-gray-500">{pickupLocation}</span>
            </div>
          </div>

          {/* Logistics Destination Destination Context Marker */}
          <div className="flex items-start gap-2.5">
            <Icon icon="boxicons:location" className="w-5 h-5 text-[#C4A46E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900">Drop: </span>
              <span className="text-gray-500">{dropoffLocation}</span>
            </div>
          </div>

        </div>

        {/* Dynamic Spatial Distance Radius Axis Indicator */}
        <div className="flex items-center gap-1.5 text-[0.875rem] font-semibold text-black pt-2 border-t border-gray-100/30 mt-auto">
          <Icon icon="boxicons:location-filled" className="w-6 h-6 text-brand" />
          <span>{distanceAway}</span>
        </div>

      </div>
    </div>
  );
}
