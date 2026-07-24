import BookingsGrid from '@/components/shared/BookingsGrid';
import InfoGrid from '@/components/shared/InfoGrid';
import DetailsLayout from '@/components/shared/pages/details/DetailsLayout';
import NotFound from '@/components/ui/NotFound';
import { useParams } from 'react-router';

import vehicles from '@/data/trucks.json';
import bookings from '@/data/data.json';
import carrierData from '@/data/carriers.json';
import VehicleGrid from '../../VehicleGrid';



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



export default function CarrierDetailsContent() {
  const { id } = useParams();

  const currentCarrier = carrierData.tableData.find(
    (carrier) => carrier.slug === id,
  );

  if (!currentCarrier) {
    return (
      <NotFound/>
    );
  }

  const status = currentCarrier.status;

  return (

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
          <h2 className="main-heading font-bold text-black tracking-tight">
            Truck Info
          </h2>

          <VehicleGrid
            vehicles={vehicles}
            fields={truckFields}
            pathAppendage="truck"
            />
          
          
        </div>
        {/* ==================== TRUCK INFO SECTION END ==================== */}

        <div className="mt-8 flex flex-col gap-4">
          <h2 className="main-heading font-bold text-black tracking-tight">
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

  );
}