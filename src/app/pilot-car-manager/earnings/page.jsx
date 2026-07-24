'use client';

import { useMemo, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import DataTable from "@/components/shared/DataTable";
import data from "@/data/pilot-car-bookings.json";

const columns = [
  { key: 'pilotCarName', label: 'Carrier Name', type: 'imageText', imageKey: 'logo' },
  { key: 'driver', label: 'Driver', type: 'text' },
  { key: 'pickupLocation', label: 'Pickup Location', type: 'text' },
  { key: 'dropLocation', label: 'Drop Location', type: 'text' },
  { key: 'dateTime', label: 'Date & Time', type: 'text' },
  { key: 'totalMiles', label: 'Total Miles', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'text' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function EarningsPage() {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    const search = searchValue.toLowerCase().trim();
    if (!search) return data.tableData;

    return data.tableData.filter((row) =>
      row.pilotCarName.toLowerCase().includes(search) ||
      row.driver.toLowerCase().includes(search) ||
      row.pickupLocation.toLowerCase().includes(search) ||
      row.dropLocation.toLowerCase().includes(search) ||
      row.status.toLowerCase().includes(search)
    );
  }, [searchValue]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-wrap gap-3">
        <h2 className=" main-heading font-bold text-black tracking-tight">
          Earnings
        </h2>
        <SearchBar value={searchValue} onChange={setSearchValue} />
      </div>

      <DataTable path={"/earnings"} data={filteredData} columns={columns} />
    </div>
  );
}
