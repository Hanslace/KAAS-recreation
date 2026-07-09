'use client';

import React from 'react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  children = 'Back',
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 group font-sans cursor-pointer focus:outline-none select-none ${className}`}
      aria-label={typeof children === 'string' ? children : 'Go back'}
    >
      <div className="flex items-center justify-center rounded-full bg-black text-white transition-transform duration-200 ease-out group-hover:-translate-x-1 w-8 h-8 md:w-10 md:h-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-4 h-4 md:w-5 md:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <span className="font-bold text-black text-[1.5rem] md:text-[2rem]  tracking-tight">
        {children}
      </span>
    </Link>
  );
};

export default BackButton;