'use client';

import { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import Dropdown from '@/components/ui/Dropdown';
import SearchBar from '@/components/ui/SearchBar';
import data from '@/data/support.json';
import BrandButton from '@/components/ui/BrandButton';




const supportColumns = [
  {
    key: 'attachments',
    label: 'Attachments',
    type: 'attachments',
  },
  {
    key: 'subject',
    label: 'Subject',
    type: 'text',
  },
  {
    key: 'message',
    label: 'Message',
    type: 'text',
  },
  {
    key: 'dateTime',
    label: 'Date & Time',
    type: 'text',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
  },
];

export default function SupportPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    const search = searchValue.toLowerCase().trim();

    return data.tickets.filter((item) => {
      const matchesFilter =
        activeFilter === 'all' ||
        item.status.toLowerCase() === activeFilter.toLowerCase();

      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phoneNumber.toLowerCase().includes(search) ||
        item.subject.toLowerCase().includes(search) ||
        item.message.toLowerCase().includes(search) ||
        item.dateTime.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchValue]);

  return (
    <div className="w-full space-y-[1em] lg:space-y-[1.5em]">
      <div className="flex flex-col gap-5 min-[43.75rem]:flex-row min-[43.75rem]:items-center min-[43.75rem]:justify-between">
        <h2 className="main-heading font-bold tracking-tight text-black">
          Support
        </h2>

        <div className="flex w-full flex-col items-end gap-4 min-[40.625rem]:flex-row min-[40.625rem]:items-center min-[40.625rem]:justify-end ">
          <Dropdown
            filters={data.filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            labelText="Sort By:"
          />

          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search here"
            className='min-[40.625rem]:max-w-[30rem]'
          />

          <BrandButton to="/support/create-ticket">Create Ticket</BrandButton>
        </div>
      </div>


        <DataTable
          data={filteredData}
          columns={supportColumns}
        />
      </div>

  );
}