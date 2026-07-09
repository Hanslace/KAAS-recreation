'use client';

import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export interface VehicleCardData {
  slug: string;
  name: string;
  imageUrl: string;
  mcNumber: string;
  dotNumber: string;
  licensePlate: string;
}

interface VehicleCardProps {
  vehicle: VehicleCardData;
  basePath: string; // Dynamic path prop added here (e.g., "/vehicles", "/fleet")
  className?: string;
}

export default function VehicleCard({ vehicle, basePath, className = '' }: VehicleCardProps) {
  // Cleans trailing slashes from basePath if present to avoid dual slashes like "//"
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  return (
    <Link
      href={`${cleanBasePath}/${vehicle.slug}`}
      className="block w-full focus:outline-none "
      aria-label={`View vehicle details for ${vehicle.name}`}
    >
      <div
        className={twMerge(
          "w-full flex flex-col rounded-[24px] p-[1rem] md:p-[1.25rem] shadow-xl border bg-white border-gray-100 transition-all duration-300 ease-in-out hover:shadow-2xl",
          className
        )}
      >
        {/* Vehicle Image Container */}
        <div className="relative aspect-[9/5] rounded-2xl overflow-hidden shrink-0 bg-gray-900 group">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-75"
          />
        </div>

        {/* Content Section */}
        <div className="mt-4 flex flex-col space-y-2.5 text-left">
          {/* Title */}
          <h3 className="text-[1rem] md:text-[1.5rem] font-bold text-gray-900 tracking-tight leading-tight truncate">
            {vehicle.name}
          </h3>

          {/* Details Metadata List */}
          <div className="space-y-1.5 text-[0.7rem] md:text-[0.875rem] font-medium pt-1">
            <div className=" break-words">
              <span className="font-bold text-gray-900">MC Number: </span>
              <span className="text-gray-500 font-normal">{vehicle.mcNumber}</span>
            </div>

            <div className=" break-words">
              <span className="font-bold text-gray-900">Dot Number: </span>
              <span className="text-gray-500 font-normal">{vehicle.dotNumber}</span>
            </div>

            <div className=" break-words">
              <span className="font-bold text-gray-900">License Plate Number: </span>
              <span className="text-gray-500 font-normal">{vehicle.licensePlate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
