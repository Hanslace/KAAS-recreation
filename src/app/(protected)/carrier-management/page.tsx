'use client';

import { useMemo, useState } from 'react';
import FiltersHeader from '@/components/shared/FiltersHeader';
import DataTable from '@/components/shared/DataTable';
import data from './data.json';

export default function Page() {
  const [activeTabId, setActiveTabId] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const columns = [
  {
    key: 'name',
    label: 'Name',
    type: 'imageText',
    imageKey: 'logoUrl',
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
    key: 'address',
    label: 'Address',
    type: 'text',
  },
  {
    key: 'empty-1',
    label: '',
    type: 'empty',
  },
  {
    key: 'empty-2',
    label: '',
    type: 'empty',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
  },
  {
    key: 'action',
    label: 'Action',
    type: 'action',
  },
] as const;

  const filteredData = useMemo(() => {
    return data.tableData.filter((item) => {
      const matchesTab =
        activeTabId === 'all' ||
        item.status.toLowerCase() === activeTabId.toLowerCase();

      const search = searchValue.toLowerCase().trim();

      const matchesSearch =
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phoneNumber.toLowerCase().includes(search) ||
        item.address.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search);

      return matchesTab && matchesSearch;
    });
  }, [activeTabId, searchValue]);

  return (
    <>
      <h2 className="text-[2rem] font-bold text-black tracking-tight">
        Carriers Management
      </h2>

      <div className="mt-[1.5rem]">
        <FiltersHeader
          options={data.filters}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search here"
        />
      </div>

      <div className="mt-[1.5rem]">
        <DataTable
          path="/carrier-management"
          data={filteredData}
          columns={columns}
        />
      </div>
    </>
  );
}