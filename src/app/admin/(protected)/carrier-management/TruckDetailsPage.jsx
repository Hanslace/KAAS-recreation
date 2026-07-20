import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/trucks.json';
import InfoGrid from "@/components/shared/InfoGrid";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useParams } from "react-router";
import NotFound from "@/components/ui/NotFound";



export default function Page() {

  const { truckid } = useParams();

  const vehicle = vehicles.find((v) => v.slug === truckid);
  if (!vehicle) {
    return (
      <NotFound/>
    );
  }


  const detailFields = [
    { label: "Truck Name", value: vehicle.name },
    { label: "MC Number", value: vehicle.mcNumber },
    { label: "DOT Number", value: vehicle.dotNumber },
    { label: "License Plate Number", value: vehicle.licensePlate },
    { label: "Registration Number", value: vehicle.registrationNumber || "REG-TX-98213476" },
    { label: "VIN Number", value: vehicle.vinNumber || "1HGCM82633A123456" },
  ];


  return (
    <>
        <BackButton href="/carrier-management">
        Details 
        </BackButton>
        
      <div className=" truck-details rounded-2xl  space-y-3 p-4 w-full  shadow-lg ">
        <>
          <h2 className="main-heading mb-3 font-bold text-black tracking-tight">
            Truck Info
          </h2>
        

          <img
              src="/images/truck.jpg"
              alt={`truck `}
              className="h-[11em]  aspect-[9/2.5] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 brightness-60"
            />
          </>


        <InfoGrid fields={detailFields} />
        <div>

          <h2 className="main-heading  font-bold text-black tracking-tight">
            Liability:
          </h2>

          <div className=" ml-3 w-fit flex flex-col gap-2">
            <p className="text-brand font-bold">Important docs</p>
            <AttachmentImage
              src="/images/liability-doc.jpg"
              alt={`truck `}
            />
          </div>
        </div>
 

      </div>
    </>
  );
}

