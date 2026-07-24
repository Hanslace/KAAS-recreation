'use client';

import { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import FilterTabs from '@/components/shared/FilterTabs';
import SearchBar from '@/components/ui/SearchBar';
import BrandButton from '@/components/ui/BrandButton';
import data from '@/data/company-drivers.json';

const driverColumns = [
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
    key: 'driverId',
    label: 'Driver ID',
    type: 'text',
  },
  {
    key: 'escortName',
    label: 'Escort Name',
    type: 'text',
  },
  {
    key: 'availability',
    label: 'Availability',
    type: 'availability',
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
];

export default function DriversPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    const search = searchValue.toLowerCase().trim();

    return data.tableData.filter((item) => {
      const matchesFilter =
        activeFilter === 'all' ||
        item.status.toLowerCase() === activeFilter.toLowerCase();

      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phoneNumber.toLowerCase().includes(search) ||
        item.driverId.toLowerCase().includes(search) ||
        item.escortName.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchValue]);

  return (
    <div className="w-full space-y-4">
      <div className="flex fflex-row gap-5 items-start justify-between">
        <h2 className="main-heading font-bold tracking-tight text-black">
          Drivers
        </h2>

        <div className="flex gap-4 self-end items-center justify-end flex-1">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search here"
            className="sm:block hidden"
          />

          <BrandButton to="/drivers/add" className="min-w-fit">
            Add Driver
          </BrandButton>
        </div>
      </div>

      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search here"
        className="sm:hidden"
      />

      <FilterTabs
        options={data.filters}
        activeTabId={activeFilter}
        onTabChange={setActiveFilter}
      />

      <DataTable
        data={filteredData}
        columns={driverColumns}
        path={"/drivers"}
      />
    </div>
  );
}
