'use client';

import AnalyticsCard from '@/components/shared/AnalyticsCard'; // Adjust path based on where you created the card
import mockData from '@/data/data.json';
import { Icon } from '@iconify/react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-md flex flex-col items-center justify-center text-center min-w-[90px] relative">
        <span className="text-[10px] text-gray-400 font-medium">This Month</span>
        <span className="text-lg font-bold text-gray-900 leading-tight">
          {payload[0].value}
        </span>
        <span className="text-[10px] text-gray-400 font-medium">September</span>
        
        {/* Floating Indicator Dot Anchor underneath the card container */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white border-r border-b border-gray-100" />
      </div>
    );
  }
  return null;
};


export default function Page() {
  const { analytics } = mockData;


  return (
    <div className="space-y-10 dashboard ">
      
      <div  className="space-y-2">
      <div>
        <h2 className=" font-bold text-black tracking-tight">
          Dashboard
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* METRIC ANALYTICS GRID MARGIN                                              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-3">
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
      <div className="space-y-5 w-full">
      {/* ========================================================================= */}
      {/* CHART HEADER CONTROLS SECTION                                             */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between w-full">
        <h3 className=" font-bold text-black tracking-tight">
          Pilot Car & Carriers
        </h3>

      </div>

      {/* ========================================================================= */}
      {/* MAIN VISUAL CANVAS ELEMENT                                                */}
      {/* ========================================================================= */}
      <div className="bg-white border border-gray-100 rounded-2xl p-3  shadow-xl w-full">
        {/* Date Dropdown Selection Pill Container */}
        <div className="chart-text flex items-center justify-end gap-4 w-full mb-6">
          <span className=" text-black/50 font-medium hidden sm:inline">
            Provisions Month
          </span>
          <button 
            type="button" 
            className="flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-sm bg-white ont-semibold text-black hover:bg-gray-50 transition-colors"
          >
            <span>September 2025</span>
            <Icon icon="solar:calendar-linear" className="w-[1em] -mt-1 h-[1em] text-brand" />
          </button>
        </div>

        {/* 1. Added horizontal scrolling and custom scrollbar clipping styles here */}
        <div className="w-full lg:overflow-x-auto pb-2 lg:custom-scrollbar">
          
          {/* 2. Enforced a minimum width so the visual chart tracks cannot compress below desktop layout thresholds */}
          <div className="w-full h-60 min-w-[45rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={mockData.chartData} 
                margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
              >
                {/* Definition tags for background color opacity transitions */}
                <defs>
                  <linearGradient id="pilotColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4A46E" stopOpacity={0.06}/>
                    <stop offset="95%" stopColor="#C4A46E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="carrierColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7F7F7F" stopOpacity={0.04}/>
                    <stop offset="95%" stopColor="#7F7F7F" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                {/* Minimalist chart framework markers */}
                <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="0" />
                
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#9CA3AF"
                  dy={12}
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                
                <YAxis 
                  domain={[0, 20]} 
                  ticks={[5, 10, 15, 20]} 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: '#C4A46E', strokeWidth: 1, strokeDasharray: '4 4' }}
                />

                {/* Pilot Car Spline Stream Path (Gold/Amber) */}
                <Area 
                  type="monotone" 
                  dataKey="pilotCars" 
                  stroke="#C4A46E" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#pilotColor)"
                  activeDot={{ 
                    r: 6, 
                    stroke: '#C4A46E', 
                    strokeWidth: 3, 
                    fill: 'white' // Fixed typo: changed '#white' to 'white'
                  }}
                />

                {/* Carriers Spline Stream Path (Slate/Muted Gray) */}
                <Area 
                  type="monotone" 
                  dataKey="carriers" 
                  stroke="#9CA3AF" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#carrierColor)"
                  activeDot={{ 
                    r: 5, 
                    stroke: '#9CA3AF', 
                    strokeWidth: 2, 
                    fill: 'white' // Fixed typo: changed '#white' to 'white'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}
