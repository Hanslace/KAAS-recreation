'use client';


import VehicleCard, { VehicleCardField } from "@/components/shared/VehicleCard";
import BackButton from "@/components/ui/BackButton";
import data from "@/data/escorts.json"
import { usePathname } from "next/navigation";

type Escort = (typeof data.escorts)[number];

const escortFields: VehicleCardField<Escort>[] = [
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
  const pathname = usePathname();
  return (
    <div>
        <BackButton> View Escorts</BackButton>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {data.escorts.map((truck) => (
            <VehicleCard basePath={pathname} key={truck.slug} vehicle={truck} fields={escortFields} />
          ))}
        </div>

    </div>
  );
}