'use client';

import BackButton from '@/components/ui/BackButton';
import data from '@/data/escorts.json';
import VehicleGrid from '@/components/shared/VehicleGrid';


const escortFields = [
  {
    label: 'Escort Type',
    accessKey: 'escortType',
  },
  {
    label: 'License Plate Number',
    accessKey: 'licensePlate',
  },
  {
    label: 'VIN Number',
    accessKey: 'vinNumber',
  },
];

export default function Page() {
  return (
    <div>
      <BackButton>View Escorts</BackButton>

      <div className="mt-6">
        <VehicleGrid
          vehicles={data.escorts}
          fields={escortFields}
        />
      </div>
    </div>
  );
}