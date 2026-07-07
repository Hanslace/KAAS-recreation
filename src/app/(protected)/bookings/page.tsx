'use client'

import AnalyticsCard from "@/components/shared/AnalyticsCard";
import FiltersHeader from "@/components/shared/FiltersHeader";
import LogisticsCard from "@/components/shared/LogisticsCard";
import data from '@/data.json';
import React, { useState } from 'react';



export default function Page() {
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

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-5">
      {data.bookingsList.map((card) => (
        <LogisticsCard key={card.id} {...card} />
      ))}
    </div>

    </div>
  );
}