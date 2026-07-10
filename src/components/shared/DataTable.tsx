'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

type ColumnType = 'text' | 'imageText' | 'status' | 'action' | 'empty';

export type DataTableColumn<T> =
  | {
      key: keyof T;
      label: string;
      type?: 'text' | 'status';
      imageKey?: never;
    }
  | {
      key: keyof T;
      label: string;
      type: 'imageText';
      imageKey: keyof T;
    }
  | {
      key: 'action';
      label: string;
      type: 'action';
      imageKey?: never;
    }
  | {
      key: `empty-${string}`;
      label: string;
      type: 'empty';
      imageKey?: never;
    };

type DataTableProps<T extends { id: number | string; slug: string }> = {
  data: T[];
  columns: readonly DataTableColumn<T>[];
  path: string;
};

const statusClasses: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-500',
  Cancelled: 'bg-red-100 text-red-500',
  Approved: 'bg-green-100 text-green-500',
  Deleted: 'bg-red-100 text-red-500',
  Closed: 'bg-red-100 text-red-500',
  Opened: 'bg-green-100 text-green-500',

};

export default function DataTable<T extends { id: number | string; slug: string }>({
  data,
  columns,
  path,
}: DataTableProps<T>) {
  const router = useRouter();

  const goToDetails = (slug: string) => {
    router.push(`${path}/${slug}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[75rem] border-separate border-spacing-0 ">
        <thead>
          <tr className="bg-brand-gradient text-white">
            {columns.map((column, index) => (
              <th
                key={String(column.key)}
                className={`px-[1.25rem] py-[1rem] text-[0.9rem] font-bold ${
                  column.type === 'action' ? 'text-center' : 'text-left'
                } ${
                  index === 0 ? 'rounded-l-[0.5rem]' : ''
                } ${
                  index === columns.length - 1 ? 'rounded-r-[0.5rem]' : ''
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id}
              onClick={() => goToDetails(row.slug)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') goToDetails(row.slug);
              }}
              tabIndex={0}
              role="link"
              className={`cursor-pointer transition-all hover:bg-brand/10 focus:outline-none focus:ring-1 focus:ring-brand ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F2]'
              }`}
            >
              {columns.map((column, columnIndex) => {
                const cellRounded =
                    columnIndex === 0
                    ? 'rounded-l-[0.5rem]'
                    : columnIndex === columns.length - 1
                    ? 'rounded-r-[0.5rem]'
                    : '';

                if (column.type === 'empty') {
                    return (
                    <td
                        key={String(column.key)}
                        className={`${cellRounded} px-[1.25rem] py-[1rem]`}
                    />
                    );
                }

                const value = column.key === 'action' ? '' : row[column.key];


                if (column.type === 'imageText') {
                  const imageValue = column.imageKey
                    ? row[column.imageKey]
                    : undefined;

                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded} px-[1.25rem] py-[1rem]`}
                    >
                      <div className="flex items-center gap-[0.75rem]">
                        <img
                          src={String(imageValue || '/images/company-logo.png')}
                          alt={String(value)}
                          className="h-[2rem] w-[2rem] shrink-0 rounded-full object-cover"
                        />

                        <span className="whitespace-nowrap text-[0.9rem] text-black/50">
                          {String(value)}
                        </span>
                      </div>
                    </td>
                  );
                }

                if (column.type === 'status') {
                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded} px-[1.25rem] py-[1rem]`}
                    >
                      <span
                        className={`inline-flex rounded-full px-[1rem] py-[0.5rem] text-[0.8rem] font-medium ${
                          statusClasses[String(value)] ||
                          'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {String(value)}
                      </span>
                    </td>
                  );
                }

                if (column.type === 'action') {
                  return (
                    <td
                      key={String(column.key)}
                      className={`${cellRounded} px-[1.25rem] py-[1rem] text-center`}
                    >
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          goToDetails(row.slug);
                        }}
                        className="inline-flex items-center justify-center rounded-full p-[0.5rem] text-black/50 hover:bg-black/5"
                        aria-label="Open details"
                      >
                        <Icon
                          icon="solar:menu-dots-bold"
                          className="h-[1.25rem] w-[1.25rem]"
                        />
                      </button>
                    </td>
                  );
                }

                return (
                  <td
                    key={String(column.key)}
                    className={`${cellRounded} px-[1.25rem] py-[1rem]`}
                  >
                    <span className="whitespace-nowrap text-[0.9rem] text-black/50">
                      {String(value)}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}