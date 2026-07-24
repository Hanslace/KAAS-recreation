'use client';

import { useMemo, useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import DataTable from '@/components/shared/DataTable';
import SearchBar from '@/components/ui/SearchBar';
import carriersData from '@/data/carriers.json';
import managersData from '@/data/managers.json';


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

const deletedAccounts = [
  ...carriersData.tableData
    .filter((carrier) => carrier.status === 'Deleted')
    .map((carrier) => ({
      ...carrier,
      id: `carrier-${carrier.slug}`,
      logo: carrier.logoUrl,
    })),
  ...managersData.tableData
    .filter((manager) => manager.status === 'Deleted')
    .map((manager) => ({
      ...manager,
      id: `manager-${manager.slug}`,
    })),
];

export default function DeletedAccountsPage() {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    const search = searchValue.toLowerCase().trim();

    if (!search) return deletedAccounts;

    return deletedAccounts.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phoneNumber.toLowerCase().includes(search) ||
        (item.mcNumber ?? '').toLowerCase().includes(search) ||
        item.address.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
      );
    });
  }, [searchValue]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
