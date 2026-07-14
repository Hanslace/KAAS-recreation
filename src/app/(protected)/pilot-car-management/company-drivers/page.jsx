'use client';

import ListPage from '@/components/ListPage';
import data from '@/data/company-drivers.json';


export const companyDriverColumns = [
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
      tableData={data.tableData}
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