import React from "react";


export default function BrandPill({ children, className = "" }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border border-brand bg-brand/30 px-[0.8rem] h-[2rem] text-[0.85rem] font-medium text-brand ${className}`}
    >
      {children}
    </span>
  );
}