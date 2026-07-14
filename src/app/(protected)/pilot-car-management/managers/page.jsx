'use client';

import ListPage from '@/components/ListPage';
import data from '@/data/managers.json';



export const managerColumns = [
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
      tableData={data.tableData}
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