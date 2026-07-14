'use client';

import { useMemo, useState } from 'react';
import FiltersHeader from '@/components/shared/FiltersHeader';
import DataTable, { DataTableColumn } from '@/components/shared/DataTable';

type FilterOption = {
  id: string;
  label: string;
};

type ListPageProps<
  T extends {
    id: number | string;
    slug: string;
    status: string;
  }
> = {
  heading: string;
  secondaryText?: string;
  filters: FilterOption[];
  tableData: T[];
  columns: readonly DataTableColumn<T>[];
  path: string;
  searchPlaceholder?: string;
  searchKeys?: readonly (keyof T)[];
};

export default function ListPage<
  T extends {
    id: number | string;
    slug: string;
    status: string;
  }
>({
  heading,
  secondaryText = '',
  filters,
  tableData,
  columns,
  path,
  searchPlaceholder = 'Search here',
  searchKeys,
}: ListPageProps<T>) {
  const [activeTabId, setActiveTabId] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchesTab =
        activeTabId === 'all' ||
        item.status.toLowerCase() === activeTabId.toLowerCase();

      const search = searchValue.toLowerCase().trim();

      const matchesSearch =
        !search ||
        (searchKeys?.length
          ? searchKeys.some((key) =>
              String(item[key] ?? '').toLowerCase().includes(search)
            )
          : Object.values(item).some((value) =>
              String(value ?? '').toLowerCase().includes(search)
            ));

      return matchesTab && matchesSearch;
    });
  }, [activeTabId, searchValue, tableData, searchKeys]);

  return (
    <>
      <div>
        <h2 className="flex flex-wrap items-center gap-3 text-[2rem] font-bold text-black tracking-tight">
            <span>{heading}</span>

            {secondaryText ? (
            <>
                <span className="font-normal text-brand">→</span>
                <span>{secondaryText}</span>
            </>
            ) : null}
        </h2>
        </div>

      <div className="mt-[1.5rem]">
        <FiltersHeader
          options={filters}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder={searchPlaceholder}
        />
      </div>

      <div className="mt-[1.5rem]">
        <DataTable path={path} data={filteredData} columns={columns} />
      </div>
    </>
  );
}