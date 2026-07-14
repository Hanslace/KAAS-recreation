import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/escorts.json';
import InfoGrid from "@/components/shared/InfoGrid";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useParams } from "react-router";
import NotFound from "@/components/ui/NotFound";



export default async function Page() {

  const { escortid } = useParams<{ escortid: string }>();

  const vehicle = vehicles.escorts.find((v) => v.slug === escortid);
  if (!vehicle) {
    return (
      <NotFound/>
    );
  }



  return (
    <>
      <div className="flex flex-col sm:flex-row gap-10 justify-between">
        <BackButton>
        Details 
        </BackButton>
        
      </div>
      <div className="  rounded-2xl mt-[1.5rem]  p-[1.5rem] gap-[2rem] w-full shadow-lg ">
        
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

