'use client';

import { Link } from 'react-router';
import { Icon } from '@iconify/react';

export default function EscortServiceCard({ service }) {
  return (
    <Link
      to={`/home/${service.slug}`}
      className="block w-full focus:outline-none escort-card"
      aria-label={`View details for ${service.companyName}`}
    >
      <div className="w-full flex flex-col rounded-xl p-3 shadow-xl border bg-white border-gray-100 transition-all duration-300 ease-in-out hover:bg-[#FAF6EE] hover:border-brand/30 hover:shadow-md">

        {/* Vehicle image */}
        <div className="relative aspect-[444/250] rounded-2xl overflow-hidden shrink-0 group">
          <img
            src={service.imageUrl}
            alt={`${service.companyName} pilot car`}
            className="h-full w-full aspect-[444/250] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-col space-y-2 text-left flex-1">
          {/* Company + rating */}
          <div className="flex items-start gap-2">
            <img
              src={service.companyLogoUrl}
              alt={`${service.companyName} Logo`}
              className="w-8 h-8 rounded-full object-cover shadow-sm bg-black border border-gray-100 shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <h4 className="heading font-bold text-gray-900 tracking-tight leading-tight truncate">
                {service.companyName}
              </h4>

              <div className="flex flex-row items-center gap-0.5 mt-1">
                <div className="flex gap-[1px] text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="solar:star-bold" className="w-[0.85em] h-[0.85em]" />
                  ))}
                </div>

                <span className="font-bold text-black ml-1">
                  {service.rating} |
                </span>

                <span className="text-brand underline">
                  {service.reviewCount} Reviews
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 line-clamp-2">
            {service.description}
          </p>

          {/* Distance */}
          <div className="flex items-center gap-1.5 font-semibold text-black">
            <Icon icon="boxicons:location-filled" className="w-[1.25em] h-[1.25em] text-brand shrink-0" />
            <span>{service.distanceAway}</span>
          </div>

          {/* Fares */}
          <div className="border-t border-gray-100/50 pt-2 text-gray-500">
            <span className="font-bold text-gray-900">Fares: </span>
            <span>{service.fares}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}