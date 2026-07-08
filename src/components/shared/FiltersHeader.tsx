'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface FilterOption {
  id: string;
  label: string;
}

interface FiltersHeaderProps {
  /** Array of filter options containing a unique id string and display label string */
  options: FilterOption[];
  /** Current active selection ID matching an option id string token */
  activeTabId: string;
  /** State callback handler triggered when a tab is clicked */
  onTabChange: (id: string) => void;
  /** Current textual value inside the search input element */
  searchValue: string;
  /** State callback handler triggered when user changes input text entry */
  onSearchChange: (value: string) => void;
  /** Custom optional placeholder override configuration for the text field */
  searchPlaceholder?: string;
}

export default function FiltersHeader({
  options,
  activeTabId,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search here"
}: FiltersHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4  2xl:flex-row 2xl:items-center 2xl:justify-between w-full bg-white  rounded-md ">
      
      {/* ========================================================================= */}
      {/* FILTER BUTTON TABS BAR STACK                                               */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto min-w-0 pb-1 scrollbar-none">
        {options.map((option) => {
          const isActive = activeTabId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onTabChange(option.id)}
              className={`shrink-0 px-4 py-2 text-[0.8rem] font-semibold rounded-lg transition-all duration-150 tracking-tight
                ${isActive 
                  ? 'bg-brand-gradient text-white shadow-sm' 
                  : 'bg-brand/20 text-brand hover:bg-brand/40'
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INPUT SEARCH BAR SLOT RECEPTACLE CONTAINER                                 */}
      {/* ========================================================================= */}
      <div className="relative w-full  max-w-[30rem] shrink-0">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-gray-400" />
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-11 pr-4 py-2.5 text-[1rem] bg-white rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none  shadow-lg  focus:border-[#C4A46E] focus:ring-1 focus:ring-[#C4A46E] transition-all"
        />
      </div>

    </div>
  );
}
