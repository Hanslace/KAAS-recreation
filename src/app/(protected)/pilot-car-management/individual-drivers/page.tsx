'use client';

import ListPage from '@/components/ListPage';
import type { DataTableColumn } from '@/components/shared/DataTable';
import data from '@/data/individual-drivers.json';

export type IndividualDriverData = {
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

export const individualDriverColumns: readonly DataTableColumn<IndividualDriverData>[] = [
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

export default function IndividualDriversPage() {
  return (
    <ListPage
      heading="Pilot Car Management"
      secondaryText="Individual Drivers"
      filters={data.filters}
      tableData={data.tableData as IndividualDriverData[]}
      columns={individualDriverColumns}
      path="/pilot-car-management/individual-drivers"
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