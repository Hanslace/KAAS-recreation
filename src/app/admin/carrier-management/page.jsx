'use client';

import ListPage from '@/components/shared/ListPage';
import data from '@/data/carriers.json';


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

export default function Page() {
  return (
    <ListPage
      heading="Carriers Management"
      secondaryText=""
      filters={data.filters}
      tableData={data.tableData}
      columns={columns}
      path="/carrier-management"
      searchPlaceholder="Search here"
      searchKeys={[
        'name',
        'email',
        'phoneNumber',
        'address',
        'status',
      ]}
    />
  );
}