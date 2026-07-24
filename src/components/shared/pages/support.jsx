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
      <div className="flex flex-col min-[23.4375rem]:flex-row gap-5 items-start justify-between">
        <h2 className="main-heading  font-bold tracking-tight text-black">
          Support
        </h2>
       

        <div className="flex   gap-4 self-end items-center justify-end flex-1">
          
          <Dropdown
            filters={data.filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            labelText="Sort By:"
            className=''
          />
          <BrandButton to="/support/create-ticket" className="min-w-fit sm:hidden ">Create Ticket</BrandButton>


          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search here"
            className='sm:block hidden'
          />

          <BrandButton to="/support/create-ticket" className="min-w-fit hidden sm:block ">Create Ticket</BrandButton>
        </div>
      </div>

        <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search here"
            className='sm:hidden'
        />


        <DataTable
          data={filteredData}
          columns={supportColumns}
        />
      </div>

  );
}