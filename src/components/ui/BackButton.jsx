'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Link, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';



export const BackButton= ({
  href,
  children = 'Back',
  className = '',
}) => {
  const navigate = useNavigate();

  const buttonStyles = twMerge(
    'back-button group inline-flex cursor-pointer select-none items-center gap-3 font-sans focus:outline-none',
    className,
  );

  const content = (
    <>
      <div className="back-button flex p-1 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 ease-out group-hover:-translate-x-1 ">
        <Icon icon='weui:back-filled' className='w-[0.8em] h-[0.8em] text-white'/>
      </div>

      <span className="font-bold tracking-tight text-black ">
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