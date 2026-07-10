'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import BackButton from '@/components/ui/BackButton';
import DataTable, { type DataTableColumn } from '@/components/shared/DataTable';
import data from '@/data/deleted-accounts.json';

export type DeletedAccountData = {
  id: number;
  slug: string;
  name: string;
  logo: string;
  email: string;
  phoneNumber: string;
  mcNumber: string;
  licensePlateNumber: string;
  address: string;
  status: 'Deleted';
};

const columns: readonly DataTableColumn<DeletedAccountData>[] = [
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

        <div className="relative w-full lg:max-w-[25rem]">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Icon icon="solar:magnifer-linear" className="h-5 w-5 text-gray-400" />
          </span>

          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search here"
            className="w-full rounded-lg bg-white py-3 pl-12 pr-4 text-[1rem] text-gray-900 shadow-lg transition-all placeholder:text-gray-400 focus:border-[#C4A46E] focus:outline-none focus:ring-1 focus:ring-[#C4A46E]"
          />
        </div>
      </div>

      <div className="mt-7">
        <DataTable
          path="/settings/deleted-accounts"
          data={filteredData as DeletedAccountData[]}
          columns={columns}
        />
      </div>
    </div>
  );
}