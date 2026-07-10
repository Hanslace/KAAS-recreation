'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface SearchBarProps {
  /** Current textual value inside the search input element */
  value: string;

  /** State callback handler triggered when user changes input text entry */
  onChange: (value: string) => void;

  /** Custom optional placeholder override configuration for the text field */
  placeholder?: string;

  /** Optional additional classes for the outer container */
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search here',
  className = '',
}: SearchBarProps) {
  return (
    <div
      className={`relative w-full lg:max-w-[18rem] xl:max-w-[25rem] shrink-0 ${className}`}
    >
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Icon
          icon="solar:magnifer-linear"
          className="w-4 h-4 text-gray-400"
        />
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-2 py-2 text-[1rem] bg-white rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none shadow-lg focus:border-[#C4A46E] focus:ring-1 focus:ring-[#C4A46E] transition-all"
      />
    </div>
  );
}