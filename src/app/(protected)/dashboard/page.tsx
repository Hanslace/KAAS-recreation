'use client';

import React from 'react';
import AnalyticsCard from '@/components/shared/AnalyticsCard'; // Adjust path based on where you created the card
import { Icon } from '@iconify/react';
import mockData from '@/data/dashboardData.json'; // Direct path importing the json mockup setup above

export default function Page() {
  const { analytics, chartData } = mockData;

  // Simple proportional helper to generate CSS bars without needing massive external chart libraries
  const maxVal = Math.max(...chartData.map(d => Math.max(d.pilotCars, d.carriers)));

  return (
    <div className="space-y-10">
      
      <div  className="space-y-5">
      <div>
        <h2 className="text-sub-heading font-bold text-black tracking-tight">
          Dashboard
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* METRIC ANALYTICS GRID MARGIN                                              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(analytics).map(([key, item]) => (
          <AnalyticsCard 
            key={key}
            backgroundColor={item.backgroundColor}
            iconName={item.icon}
            value={item.total}
            label={item.label}
          />
        ))}
      </div>
      </div>

      {/* ========================================================================= */}
      {/* VISUAL CHART AREA (Pilot Car & Carriers)                                  */}
      {/* ========================================================================= */}
      <div className="space-y-5">
        <h3 className="text-sub-heading font-bold text-black tracking-tight">
          Pilot Car & Carriers
        </h3>

        {/* Lightweight Flex Bar Chart Representation */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
          <div className="flex items-end justify-between h-64 pt-4 px-2 sm:px-6 gap-2 sm:gap-6 border-b border-gray-100">
            {chartData.map((data, index) => {
              const pilotHeight = (data.pilotCars / maxVal) * 100;
              const carrierHeight = (data.carriers / maxVal) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex justify-center items-end gap-1.5 h-full max-w-[60px]">
                    {/* Pilot Cars Bar Column */}
                    <div 
                      style={{ height: `${pilotHeight}%` }} 
                      className="w-1/2 bg-[#C4A46E] rounded-t-sm transition-all duration-300 relative group-hover:opacity-90"
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {data.pilotCars}
                      </span>
                    </div>

                    {/* Carriers Bar Column */}
                    <div 
                      style={{ height: `${carrierHeight}%` }} 
                      className="w-1/2 bg-[#FFB703] rounded-t-sm transition-all duration-300 relative group-hover:opacity-90"
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {data.carriers}
                      </span>
                    </div>
                  </div>
                  
                  {/* Calendar/Month Axis Label Label */}
                  <span className="text-xs text-gray-400 mt-3 font-medium">
                    {data.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Custom Colored Legend Wrapper Footer */}
          <div className="flex items-center gap-6 mt-6 justify-start text-xs font-semibold text-gray-600 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#C4A46E]" />
              <span>Pilot Cars</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#FFB703]" />
              <span>Carriers</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
