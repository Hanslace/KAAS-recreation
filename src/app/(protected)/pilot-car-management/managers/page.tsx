'use client';

import ListPage from '@/components/ListPage';
import type { DataTableColumn } from '@/components/shared/DataTable';
import data from '@/data/managers.json';

export type ManagerData = {
  id: number;
  slug: string;
  name: string;
  logo: string;
  email: string;
  phoneNumber: string;
  mcNumber: string;
  dotNumber: string;
  address: string;
  status: 'Pending' | 'Cancelled' | 'Approved';
};

export const managerColumns: readonly DataTableColumn<ManagerData>[] = [
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
    key: 'dotNumber',
    label: 'DOT Number',
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

export default function ManagersPage() {
  return (
    <ListPage
      heading="Pilot Car Management"
      secondaryText="Managers"
      filters={data.filters}
      tableData={data.tableData as ManagerData[]}
      columns={managerColumns}
      path="/pilot-car-management/managers"
      searchPlaceholder="Search here"
      searchKeys={[
        'name',
        'email',
        'phoneNumber',
        'mcNumber',
        'dotNumber',
        'address',
        'status',
      ]}
    />
  );
}