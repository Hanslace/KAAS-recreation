'use client';


import VehicleCard, {
  VehicleCardField,
} from '@/components/shared/VehicleCard';
import { useLocation } from 'react-router';

interface BaseVehicleData {
  slug: string;
  name: string;
  imageUrl: string;
}

interface VehicleGridProps<T extends BaseVehicleData> {
  vehicles: T[];
  fields: VehicleCardField<T>[];
  pathAppendage?: string;
  className?: string;
  cardClassName?: string;
}

export default function VehicleGrid<T extends BaseVehicleData>({
  vehicles,
  fields,
  pathAppendage,
  className = '',
  cardClassName = '',
}: VehicleGridProps<T>) {
  const pathname = useLocation().pathname;

  const path =  pathname;

  const cleanBasePath =
    path.length > 1 && path.endsWith('/')
      ? path.slice(0, -1)
      : path;

  const cleanAppendage = pathAppendage
    ?.replace(/^\/+/, '')
    .replace(/\/+$/, '');

  const vehicleBasePath = cleanAppendage
    ? `${cleanBasePath}/${cleanAppendage}`
    : cleanBasePath;

  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ${className}`}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.slug}
          vehicle={vehicle}
          fields={fields}
          basePath={vehicleBasePath}
          className={cardClassName}
        />
      ))}
    </div>
  );
}