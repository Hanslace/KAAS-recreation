'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Link, useNavigate } from 'react-router';



export const BackButton= ({
  href,
  children = 'Back',
  className = '',
}) => {
  const navigate = useNavigate();

  const buttonStyles = twMerge(
    'group inline-flex cursor-pointer select-none items-center gap-3 font-sans focus:outline-none',
    className,
  );

  const content = (
    <>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 ease-out group-hover:-translate-x-1 md:h-10 md:w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="h-4 w-4 md:h-5 md:w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <span className="text-[1.5rem] font-bold tracking-tight text-black md:text-[2rem]">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        className={buttonStyles}
        aria-label={typeof children === 'string' ? children : 'Go back'}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={buttonStyles}
      aria-label={typeof children === 'string' ? children : 'Go back'}
    >
      {content}
    </button>
  );
};

export default BackButton;