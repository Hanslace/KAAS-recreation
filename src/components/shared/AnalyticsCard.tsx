import { Icon } from '@iconify/react';

interface AnalyticsCardProps {
  /** The background color class for the outer card container (e.g., 'bg-[#C2A371]' or 'bg-amber-500') */
  backgroundColor: string;
  /** The full Iconify token string for the icon (e.g., 'solar:bus-linear') */
  iconName: string;
  /** The large primary value or metric display text (e.g., '512') */
  value: string | number;
  /** The descriptive text below the main value metric (e.g., 'Total Pilot Cars') */
  label: string;
}

export default function AnalyticsCard({ 
  backgroundColor, 
  iconName, 
  value, 
  label 
}: AnalyticsCardProps) {
  return (
    <div 
      className={`flex flex-col sm:flex-row items-center gap-5 p-[1rem] xl:p-[1.5rem] rounded-xl text-white w-full ${backgroundColor}`}
    >
      {/* Translucent white icon circle wrapper */}
      <div className={`flex items-center justify-center w-[3rem] h-[3rem] rounded-full bg-white/40 shrink-0`}>
        <Icon icon={iconName} className="w-[1.5rem] h-[1.5rem] text-white" />
      </div>

      {/* Numerical metric and label content data container */}
      <div className="flex flex-col text-left items-center  sm:items-start justify-center min-w-0">
        <span className="text-[1rem] xl:text-[1.5rem] font-bold leading-tight tracking-tight truncate">
          {value}
        </span>
        <span className=" text-[0.7rem] xl:text-[0.875rem] text-center sm:text-left font-medium opacity-80 leading-snug ">
          {label}
        </span>
      </div>
    </div>
  );
}
