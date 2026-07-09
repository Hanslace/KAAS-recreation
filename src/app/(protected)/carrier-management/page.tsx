'use client';

import ListPage from '@/components/ListPage';
import { DataTableColumn } from '@/components/shared/DataTable';
import data from '@/data/carriers.json';

type CarrierRow = (typeof data.tableData)[number];

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
    key: 'empty-1',
    label: '',
    type: 'empty',
  },
  {
    key: 'empty-2',
    label: '',
    type: 'empty',
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
] as const satisfies readonly DataTableColumn<CarrierRow>[];

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