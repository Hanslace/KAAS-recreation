'use client';

import { useState } from 'react';
import trucksData from '@/data/trucks.json';
import escortsData from '@/data/escorts.json';
import VehicleGrid from '@/components/shared/VehicleGrid';
import SearchBar from '@/components/ui/SearchBar';
import BrandButton from '@/components/ui/BrandButton';
import { useLocation, useNavigate } from 'react-router';



const truckFields = [
  {
    label: 'MC Number',
    accessKey: 'mcNumber',
  },
  {
    label: 'DOT Number',
    accessKey: 'dotNumber',
  },
  {
    label: 'License Plate Number',
    accessKey: 'licensePlate',
  },
];

export default function VehiclesPage() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [searchQuery, setSearchQuery] = useState('');
  const role = import.meta.env.VITE_APP_ROLE ?? 'admin';
  const isPilotCar = role.startsWith('pilot-car');
  const vehicleLabel = isPilotCar ? 'Pilot Car' : 'Truck';
  const vehicles = isPilotCar ? escortsData.escorts : trucksData;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const query = searchQuery.toLowerCase();

    return (
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.mcNumber.toLowerCase().includes(query) ||
      vehicle.dotNumber.toLowerCase().includes(query) ||
      vehicle.licensePlate.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className='flex justify-between gap-[1rem]'>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <BrandButton
          type="button"
          onClick={() => navigate(`${path}/add`)}>
          Add {vehicleLabel}
        </BrandButton>
      </div>

      {filteredVehicles.length > 0 ? (
        <VehicleGrid
          vehicles={filteredVehicles}
          fields={truckFields}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
          <span className="text-sm font-semibold text-gray-400">
            No trucks found matching your search.
          </span>
        </div>
      )}
    </div>
  );
}
