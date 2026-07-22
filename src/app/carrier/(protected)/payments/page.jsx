'use client';

import { useMemo, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/shared/DataTable";
import Pagination from "@/components/ui/Pagination";
import data from "@/data/pilot-car-bookings.json";

const columns = [
  { key: 'pilotCarName', label: 'Pilot Car Name', type: 'imageText', imageKey: 'logo' },
  { key: 'pickupLocation', label: 'Pickup Location', type: 'text' },
  { key: 'dropLocation', label: 'Drop Location', type: 'text' },
  { key: 'dateTime', label: 'Date & Time', type: 'text' },
  { key: 'totalMiles', label: 'Total Miles', type: 'text' },
  { key: 'paymentMethod', label: 'Payment Method', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'text' },
];

const PAGE_SIZE = 10;

export default function PaymentsPage() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    const search = searchValue.toLowerCase().trim();
    if (!search) return data.tableData;

    return data.tableData.filter((row) =>
      row.pilotCarName.toLowerCase().includes(search) ||
      row.pickupLocation.toLowerCase().includes(search) ||
      row.dropLocation.toLowerCase().includes(search) ||
      row.paymentMethod.toLowerCase().includes(search)
    );
  }, [searchValue]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-wrap gap-3">
        <h2 className=" main-heading font-bold text-black tracking-tight">
          Dashboard
        </h2>
        <SearchBar value={searchValue} onChange={handleSearchChange} />
      </div>

      <DataTable  data={paginatedData} columns={columns} />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
