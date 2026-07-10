import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/escorts.json';
import { notFound } from "next/navigation";
import InfoCell from "@/components/ui/InfoCell"
import InfoGrid from "@/components/shared/InfoGrid";
import AttachmentImage from "@/components/ui/AttachmentImage";

// Assuming VehicleCard is stored here

interface PageProps {
  params: Promise<{ escortid: string }>;
}




export default async function Page({ params }: PageProps) {

  const { escortid } = await params;

  const vehicle = vehicles.escorts.find((v) => v.slug === escortid);
  if (!vehicle) {
    notFound();
  }


  const detailFields = [
    { label: "Escort Name", value: vehicle.name },
    { label: "Escort Tyoe", value: vehicle.escortType },
    { label: "License Plate Number", value: vehicle.licensePlate },
    { label: "VIN Number", value: vehicle.vinNumber || "1HGCM82633A123456" },
    { label: "Registration Number", value: vehicle.registrationNumber || "REG-TX-98213476" },
  ];


  return (
    <>
      <div className="flex flex-col sm:flex-row gap-10 justify-between">
        <BackButton>
        Details 
        </BackButton>
        
      </div>
      <div className=" xl:h-[calc(80vh-11rem)] overflow-y-auto rounded-2xl mt-[1.5rem]  p-[1.5rem] gap-[2rem] w-full h-full shadow-lg ">
        
        <InfoGrid
          heading="Escorts Info"
          fields={[
            {
              label: 'Escort Name',
              value: 'Falcon Hauler',
            },
            {
              label: 'Escort Type',
              value: 'Front Escort',
            },
            {
              label: 'License Plate Number',
              value: 'TX-7H2K9L',
            },
            {
              label: 'VIN Number',
              value: '1FTFW1ET4EFA12345',
            },
            {
              label: 'Registration Number',
              value: 'REG-TX-45892173',
            },
          ]}
        />

        <div className="mt-7">
          <h3 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
            Attachment:
          </h3>

          <div className="flex flex-wrap items-start gap-4">
            <AttachmentImage
              src="/images/car.jpg"
              alt="Escort attachment front"
            />

            <AttachmentImage
              src="/images/car.jpg"
              alt="Escort attachment back"
            />
          </div>
        </div>

 

      </div>
    </>
  );
}

