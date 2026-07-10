import VehicleCard, { VehicleCardField } from "@/components/shared/VehicleCard"; 
import vehicles from '@/data/trucks.json';
import bookings from '@/data/data.json'
import carrierData from "@/data/carriers.json";
import { notFound } from "next/navigation";
import BookingsGrid from "@/components/shared/BookingsGrid";
import InfoGrid from "@/components/shared/InfoGrid";
import DetailsLayout from "@/components/DetailsLayout";


import data from '@/data/trucks.json';

type Truck = (typeof data)[number];

const truckFields: VehicleCardField<Truck>[] = [
  {
    label: 'MC Number',
    accessKey: 'mcNumber',
  },
  {
    label: 'Dot Number',
    accessKey: 'dotNumber',
  },
  {
    label: 'License Plate Number',
    accessKey: 'licensePlate',
  },
];
interface PageProps {
  params: Promise<{ carrierId: string }>;
}

export default async function Page({ params }: PageProps) {
  // Correctly await the params promise to extract your ID
  const { carrierId } = await params;
  
  const currentCarrier = carrierData.tableData.find(
    (item) => item.slug === carrierId
  );

  // 3. Fallback to 404 page if someone enters an invalid URL carrierId
  if (!currentCarrier) {
    notFound();
  }

  const status = currentCarrier.status;

  return (
    <>
      <DetailsLayout
        slugName={currentCarrier.slug}
        status={currentCarrier.status}
        companyName="ABC Logistics LLC"
        email="abcllogisticsas@gmail.com"
        phone="0321 3213233"
        logoSrc="/images/company-logo.png"
      >

      <InfoGrid
          fields={[
            {
              label: 'Address',
              value: '53C, 14th Street, Empire State, USA',
            },
          ]}
        />

      { status === "Approved" &&
        <>
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-bold text-black tracking-tight">
            Truck Info
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {vehicles.map((truck) => (
              <VehicleCard basePath={`/carrier-management/${carrierId}/truck`} key={truck.slug} vehicle={truck} fields={truckFields}/>
            ))}
          </div>
        </div>
        {/* ==================== TRUCK INFO SECTION END ==================== */}

        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-bold text-black tracking-tight">
            Booking History
          </h2>
          
          {bookings.bookingsList.length > 0 ? (
                  <BookingsGrid bookingsList={bookings.bookingsList}/>
                  
                ) : (
                  /* Zero Results Empty Feedback Banner */
                  <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <span className="text-sm font-semibold text-gray-400">
                      No bookings found matching your current filters.
                    </span>
                  </div>
                )}
        </div>
        </>}

      </DetailsLayout>
    </>
  );
}
