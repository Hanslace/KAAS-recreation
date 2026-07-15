'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import BackButton from '@/components/ui/BackButton';
import DataTable from '@/components/shared/DataTable';
import data from '@/data/deleted-accounts.json';
import SearchBar from '@/components/ui/SearchBar';


const columns = [
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
    key: 'mcNumber',
    label: 'MC Number',
    type: 'text',
  },
  {
    key: 'licensePlateNumber',
    label: 'License Plate Number',
    type: 'text',
  },
  {
    key: 'address',
    label: 'Address',
    type: 'text',
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

export default function DeletedAccountsPage() {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    const search = searchValue.toLowerCase().trim();

    if (!search) return data.tableData;

    return data.tableData.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phoneNumber.toLowerCase().includes(search) ||
        item.mcNumber.toLowerCase().includes(search) ||
        item.licensePlateNumber.toLowerCase().includes(search) ||
        item.address.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
      );
    });
  }, [searchValue]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <BackButton href="/settings">Deleted Accounts</BackButton>

        <SearchBar value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search here"/>
          
      </div>

      <div className="mt-7">
        <DataTable
          path="/settings/deleted-accounts"
          data={filteredData }
          columns={columns}
        />
      </div>
    </div>
  );
}