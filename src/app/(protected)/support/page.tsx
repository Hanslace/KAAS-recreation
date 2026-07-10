'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import DataTable from '@/components/shared/DataTable';
import data from '@/data/support.json';

import type { DataTableColumn } from '@/components/shared/DataTable';

type SupportData = {
  id: number;
  slug: string;
  name: string;
  logo: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  dateTime: string;
  status: 'Pending' | 'Opened' | 'Closed';
};

const supportColumns: readonly DataTableColumn<SupportData>[] = [
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
    <div className="w-full">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[2rem] font-bold tracking-tight text-black">
          Support
        </h2>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto">
          <select
            value={activeFilter}
            onChange={(event) => setActiveFilter(event.target.value)}
            className="h-[3.5rem] rounded-lg bg-white px-5 text-black shadow-lg focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {data.filters.map((filter) => (
              <option key={filter.id} value={filter.id}>
                {filter.label}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:min-w-[22rem] lg:min-w-[25rem]">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Icon
                icon="solar:magnifer-linear"
                className="h-5 w-5 text-gray-400"
              />
            </span>

            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search here"
              className="h-[3.5rem] w-full rounded-lg bg-white py-3 pl-12 pr-4 text-[1rem] text-gray-900 shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <DataTable
          data={filteredData as SupportData[]}
          columns={supportColumns}
          path="/support"
        />
      </div>
    </div>
  );
}