import React from "react";

type BrandPillProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BrandPill({ children, className = "" }: BrandPillProps) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border border-brand bg-brand/30 px-[0.8rem] h-[1.5rem] text-[0.85rem] font-medium text-brand ${className}`}
    >
      {children}
    </span>
  );
}