import { Icon } from '@iconify/react';



export default function AnalyticsCard({ 
  backgroundColor, 
  iconName, 
  value, 
  label 
}) {
  return (
    <div 
      className={`analytic-card flex items-center gap-3  rounded-md text-white w-full ${backgroundColor}`}
    >
      {/* Translucent white icon circle wrapper */}
      <div className={`flex items-center justify-center p-[0.6rem] rounded-full bg-white/40 shrink-0`}>
        <Icon icon={iconName} className=" text-white icon" />
      </div>

      {/* Numerical metric and label content data container */}
      <div className="flex flex-col text-left items-start justify-center min-w-0">
        <span className="main-text  font-bold leading-tight tracking-tight truncate">
          {value}
        </span>
        <span className=" text-left font-medium opacity-80 leading-snug ">
          {label}
        </span>
      </div>
    </div>
  );
}
