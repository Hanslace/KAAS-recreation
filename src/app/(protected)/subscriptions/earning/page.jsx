'use client'

import { useMemo, useState } from 'react';
import data from "@/data/earning.json"
import BackButton from '@/components/ui/BackButton';
import Dropdown from '@/components/ui/Dropdown';
import SearchBar from '@/components/ui/SearchBar';
import AnalyticsCard from '@/components/shared/AnalyticsCard';
import DataTable from '@/components/shared/DataTable';





const subscriptionColumns =
  [
    {
      key: 'userName',
      label: 'User Name',
      type: 'imageText',
      imageKey: 'logo',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      key: 'type',
      label: 'Type',
      type: 'text',
    },
    {
      key: 'duration',
      label: 'Duration',
      type: 'text',
    },
    {
      key: 'dateTime',
      label: 'Date & Time',
      type: 'text',
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'text',
    },
    {
      key: 'tax',
      label: 'Tax',
      type: 'text',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status',
    },
  ];

export default function BlankPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const filteredTransactions = useMemo(() => {
    const search = searchValue.toLowerCase().trim();

    return data.transactions.filter((transaction) => {
      const matchesType =
        selectedType === 'all' ||
        transaction.type.toLowerCase().replace(/\s+/g, '-') === selectedType;

      const matchesDuration =
        selectedDuration === 'all' ||
        transaction.duration.toLowerCase() === selectedDuration;

      const matchesSearch =
        !search ||
        transaction.userName.toLowerCase().includes(search) ||
        transaction.email.toLowerCase().includes(search) ||
        transaction.type.toLowerCase().includes(search) ||
        transaction.duration.toLowerCase().includes(search) ||
        transaction.dateTime.toLowerCase().includes(search) ||
        transaction.amount.toLowerCase().includes(search) ||
        transaction.tax.toLowerCase().includes(search) ||
        transaction.status.toLowerCase().includes(search);

      return matchesType && matchesDuration && matchesSearch;
    });
  }, [selectedType, selectedDuration, searchValue]);


  return (
    <div className='w-full space-y-3'>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between ">
        <BackButton href='/subscriptions' className='w-full'>
          Subscription Earning
        </BackButton>

        <div className="flex  flex-col w-full  gap-3 sm:flex-row sm:items-center sm:justify-end items-end">
          <div className='flex gap-4  items-end'>
            <Dropdown
              filters={data.filters.types}
              activeFilter={selectedType}
              onFilterChange={setSelectedType}
              labelText="Filter by Type:"
              className='z-50'
            />
            <Dropdown
              filters={data.filters.durations}
              activeFilter={selectedDuration}
              onFilterChange={setSelectedDuration}
              labelText="Filter by Duration:"
            />
          </div>

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search here"
            
          />
        </div>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-4 gap-3">
        {Object.entries(data.analytics).map(([key, item]) => (
          <AnalyticsCard 
            key={key}
            backgroundColor={item.backgroundColor}
            iconName={item.icon}
            value={item.total}
            label={item.label}
          />
        ))}
      </div>

      <DataTable
        data={filteredTransactions}
        columns={subscriptionColumns}
        path="/subscriptions/earning"
      />
        
        
     
    </div>
  );
}