'use client';

import { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import Dropdown from '@/components/ui/Dropdown';
import SearchBar from '@/components/ui/SearchBar';
import data from '@/data/support.json';




const supportColumns = [
  {
    key: 'name',
    label: 'Name',
    type: 'imageText',
    imageKey: 'logo',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
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
    <div className="w-full space-y-3">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="main-heading font-bold tracking-tight text-black">
          Support
        </h2>

        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-end ">
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
            
          />
        </div>
      </div>


        <DataTable
          data={filteredData}
          columns={supportColumns}
          path="/support"
        />
      </div>

  );
}