'use client';

import ListPage from '@/components/ListPage';
import type { DataTableColumn } from '@/components/shared/DataTable';
import data from '@/data/company-drivers.json';

export type CompanyDriverData = {
  id: number;
  slug: string;
  name: string;
  logo: string;
  email: string;
  phoneNumber: string;
  driverId: string;
  company: string;
  address: string;
  status: 'Pending' | 'Cancelled' | 'Approved';
};

export const companyDriverColumns: readonly DataTableColumn<CompanyDriverData>[] = [
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
    key: 'company',
    label: 'Company',
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

export default function CompanyDriversPage() {
  return (
    <ListPage
      heading="Pilot Car Management"
      secondaryText="Company Drivers"
      filters={data.filters}
      tableData={data.tableData as CompanyDriverData[]}
      columns={companyDriverColumns}
      path="/pilot-car-management/company-drivers"
      searchPlaceholder="Search here"
      searchKeys={[
        'name',
        'email',
        'phoneNumber',
        'driverId',
        'company',
        'address',
        'status',
      ]}
    />
  );
}