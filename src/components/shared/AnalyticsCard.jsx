import { Icon } from '@iconify/react';



export default function AnalyticsCard({ 
  backgroundColor, 
  iconName, 
  value, 
  label 
}) {
  return (
    <div 
      className={`analytic-card flex flex-col sm:flex-row items-center gap-3 px-[1rem] py-[0.8rem] rounded-md text-white w-full ${backgroundColor}`}
    >
      {/* Translucent white icon circle wrapper */}
      <div className={`flex items-center justify-center p-[0.6rem] rounded-full bg-white/40 shrink-0`}>
        <Icon icon={iconName} className="w-[1.9em] h-[1.9em] text-white" />
      </div>

      {/* Numerical metric and label content data container */}
      <div className="flex flex-col text-left items-center  sm:items-start justify-center min-w-0">
        <span className="main-text  font-bold leading-tight tracking-tight truncate">
          {value}
        </span>
        <span className=" text-center sm:text-left font-medium opacity-80 leading-snug ">
          {label}
        </span>
      </div>
    </div>
  );
}
