
import bookings from '@/data/data.json'
import drivers from "@/data/company-drivers.json";
import BookingsGrid from "@/components/shared/BookingsGrid";
import InfoGrid from "@/components/shared/InfoGrid";
import DetailsLayout from "@/components/DetailsLayout";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useParams } from 'react-router';
import NotFound from '@/components/ui/NotFound';


export default function Page() {
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
            label: 'Company Name',
            value: 'Patriot Escort Services',
          },
          {
            label: 'Escort Name',
            value: 'Falcon Hauler',
          },
          {
            label: 'Escort Type',
            value: 'Front Escort',
          },
          {
            label: 'Driver ID',
            value: 'DRV-00001',
          },
          {
            label: 'Address',
            value: '53C, 14th Street, Empire State, USA',
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 min-[37.5rem]:grid-cols-2">
        {/* License */}
        <div className="border-b-[3px] border-gray-100 pb-5">
          <h3 className="mb-5 main-heading font-bold tracking-tight text-black">
            License:
          </h3>

          <div className="flex flex-wrap items-start gap-4">
            <AttachmentImage
              src="/images/id-front.jpg"
              alt="Driver license front"
            />

            <AttachmentImage
              src="/images/id-back.jpg"
              alt="Driver license back"
            />
          </div>
        </div>

        {/* Certification */}
        <div className="border-b-[3px] border-gray-100 pb-5">
          <h3 className="mb-5 main-heading font-bold tracking-tight text-black">
            Certification:
          </h3>

          <div className="flex flex-wrap items-start gap-4">
            <AttachmentImage
              src="/images/permit-1.jpg"
              alt="Driver certification"
            />

            <AttachmentImage
              src="/images/permit-2.jpg"
              alt="Training certification"
            />
          </div>
        </div>
      </div>

      { status === "Cancelled" && (
        <div className="">
          <h3 className="main-heading font-bold tracking-tight text-black">
            Reason:
          </h3>

          <p className="mt-2 leading-relaxed tracking-tight text-black/50">
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
