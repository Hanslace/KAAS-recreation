
import VehicleCard from "@/components/shared/VehicleCard"; 
import vehicles from '@/data/trucks.json';
import bookings from '@/data/data.json'
import managerData from "@/data/managers.json";
import { notFound } from "next/navigation";
import BookingsGrid from "@/components/shared/BookingsGrid";
import InfoGrid from "@/components/shared/InfoGrid";
import DetailsLayout from "@/components/DetailsLayout";
import Image from "next/image";
import AttachmentImage from "@/components/ui/AttachmentImage";
import DocumentsSection from "@/components/shared/DocumentsSection";


interface PageProps {
  params: Promise<{ managerid: string }>;
}

export default async function Page({ params }: PageProps) {
  
  // Correctly await the params promise to extract your ID
  const { managerid } = await params;
  
  const currentManager = managerData.tableData.find(
    (item) => item.slug === managerid
  );

  // 3. Fallback to 404 page if someone enters an invalid URL managerid
  if (!currentManager) {
    return(notFound());
  }

  const status = currentManager.status;

  return (
    <>
      <DetailsLayout
        slugName={currentManager.slug}
        status={currentManager.status}
        companyName="ABC Logistics LLC"
        email="abcllogisticsas@gmail.com"
        phone="0321 3213233"
        logoSrc="/images/company-logo.png"
        manager={true}
      >

      <InfoGrid
          fields={[
            {
              label: 'Address',
              value: '53C, 14th Street, Empire State, USA',
            },
          ]}
        />

      <InfoGrid
        heading="Company Info"
        fields={[
          {
            label: 'MC Number',
            value: 'MC-00001',
          },
          {
            label: 'DOT Number',
            value: '01234567',
          },
        ]}
      />

      <DocumentsSection/>


      { status === "Cancelled" && (
        <div className="">
          <h3 className="text-[1rem] font-bold tracking-tight text-black">
            Reason:
          </h3>

          <p className="mt-2 text-[0.9rem] leading-relaxed tracking-tight text-black/50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      )}

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

      

      { status === "Approved" &&
     

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
    }

      </DetailsLayout>
    </>
  );
}
