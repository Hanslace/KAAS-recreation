
import bookings from '@/data/data.json'
import drivers from "@/data/individual-drivers.json";
import BookingsGrid from "@/components/shared/BookingsGrid";
import InfoGrid from "@/components/shared/InfoGrid";
import DetailsLayout from "@/components/DetailsLayout";
import AttachmentImage from "@/components/ui/AttachmentImage";
import DocumentsSection from '@/components/shared/DocumentsSection';
import { useParams } from 'react-router';
import NotFound from '@/components/ui/NotFound';

// Assuming VehicleCard is stored here

export default  function Page() {
  const { driverid } = useParams();
  
  const currentDriver = drivers.tableData.find(
    (item) => item.slug === driverid
  );

  // 3. Fallback to 404 page if someone enters an invalid URL driverid
  if (!currentDriver) {
    return (
      <NotFound/>
    );
  }

  const status = currentDriver.status;

  return (
    <>
      <DetailsLayout
        slugName={currentDriver.slug}
        status={currentDriver.status}
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
          {
            label: 'MC Number',
            value: 'MC-845672',
          },
          {
            label: 'DOT Number',
            value: 'USDOT 2983745',
          },
        ]}
      />

      <DocumentsSection/>

      {/* Pilot car details */}
      <InfoGrid
        heading="Pilot Car Info"
        fields={[
          {
            label: 'Escort Name',
            value: 'Road Guardian',
          },
          {
            label: 'Escort Type',
            value: 'Front Escort',
          },
          {
            label: 'License Plate Number',
            value: 'CDL-A TX 5678901',
          },
          {
            label: 'VIN Number',
            value: '1HGCM82633A123456',
          },
          {
            label: 'Registration Number',
            value: 'REG-TX-98213476',
          },
        ]}
      />

      {/* Pilot car attachments */}
      <div className="max-w-[15.25rem] border-b-[3px] border-gray-100 pb-5">
        <h3 className="mb-4 main-heading font-bold tracking-tight text-black">
          Attachment:
        </h3>

        <div className="flex flex-wrap items-start gap-4">
          <AttachmentImage
            src="/images/car.jpg"
            alt="Pilot car attachment one"
          />

          <AttachmentImage
            src="/images/car.jpg"
            alt="Pilot car attachment two"
          />
        </div>
      </div>

      {/* Fare details */}
      <InfoGrid
        heading="Fares Info"
        fields={[
          {
            label: 'Per Day',
            value: '$600',
          },
          {
            label: 'Per Mile',
            value: '$2.5',
          },
          {
            label: 'Overnight',
            value: '$800',
          },
          {
            label: 'Custom',
            value: '$200',
          },
        ]}
      />

      { status === "Cancelled" && (
        <div className="">
          <h3 className="main-heading font-bold tracking-tight text-black">
            Reason:
          </h3>

          <p className="mt-2  leading-relaxed tracking-tight text-black/50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      )}

      { status === "Approved" &&
        <>

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
    </>
  );
}
