import { redirect } from 'next/dist/server/api-utils';
import React from 'react';



export const BackButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  
  className = '', 
  ...props 
}) => {
  return (
    <button
      onClick={() => redirect('/login')}
      className={`inline-flex items-center gap-3 group font-sans cursor-pointer focus:outline-none select-none ${className}`}
      aria-label="Go back"
      {...props}
    >
      {/* Circular Arrow Container */}
      <div className="flex items-center justify-center rounded-full bg-black text-white transition-transform duration-200 ease-out group-hover:-translate-x-1 w-8 h-8 md:w-10 md:h-10">
        <svg 
          xmlns="http://w3.org" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2.5" 
          stroke="currentColor" 
          className="w-4 h-4 md:w-5 md:h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      
      {/* "Back" Text */}
      <span className="font-bold text-black text-lg md:text-xl tracking-tight">
        Back
      </span>
    </button>
  );
};

export default BackButton;
