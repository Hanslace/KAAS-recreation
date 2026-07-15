import React from "react";


export default function BrandPill({ children, className = "" }) {
  return (
    <span
      className={`brand-pill flex items-center justify-center rounded-full border border-brand bg-brand/30 px-[0.4rem] py-[0.2rem] font-medium text-brand ${className}`}
    >
      {children}
    </span>
  );
}