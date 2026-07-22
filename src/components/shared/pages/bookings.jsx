'use client'

import AnalyticsCard from "@/components/shared/cards/AnalyticsCard";
import FiltersHeader from "@/components/shared/FiltersHeader";
import data from '@/data/data.json';
import  { useState } from 'react';
import BookingsGrid from "@/components/shared/BookingsGrid";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'completed', label: 'Completed' },
  ];

  // Filter and search logic combined
  const filteredBookings = data.bookingsList.filter((card) => {
    // 1. Tab Status Filtering
    const matchesTab = activeTab === 'all' || card.status.toLowerCase() === activeTab.toLowerCase();
    
    // 2. Search Box Query Filtering
    const matchesSearch = card.companyName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-[1em] lg:space-y-[1.5em]">
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {Object.entries(data.bookingMetrics).map(([key, item]) => (
          <AnalyticsCard 
            key={key}
            backgroundColor={item.backgroundColor}
            iconName={item.icon}
            value={item.total}
            label={item.label}
          />
        ))}
      </div>
      
      <FiltersHeader
        options={filterTabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search here..."
      />

      {/* Grid rendering the runtime filtered array */}
      {filteredBookings.length > 0 ? (
        <BookingsGrid bookingsList={filteredBookings}/>
        
      ) : (
        /* Zero Results Empty Feedback Banner */
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
          <span className="text-sm font-semibold text-gray-400">
            No bookings found matching your current filters.
          </span>
        </div>
      )}

    </div>
  );
}
