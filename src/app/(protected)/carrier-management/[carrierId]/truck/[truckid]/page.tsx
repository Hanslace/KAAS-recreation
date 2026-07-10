import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/trucks.json';
import { notFound } from "next/navigation";
import InfoCell from "@/components/ui/InfoCell"

// Assuming VehicleCard is stored here

interface PageProps {
  params: Promise<{ truckid: string }>;
}




export default async function Page({ params }: PageProps) {

  const { truckid } = await params;

  const vehicle = vehicles.find((v) => v.slug === truckid);
  if (!vehicle) {
    notFound();
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
      <div className="flex flex-col sm:flex-row gap-10 justify-between">
        <BackButton href="/carrier-management">
        Details 
        </BackButton>
        
      </div>
      <div className=" xl:h-[calc(80vh-11rem)] overflow-y-auto rounded-2xl mt-[1.5rem]  p-[1.5rem] gap-[2rem] w-full h-full shadow-lg ">
        
        <h2 className="text-[1.75rem] font-bold text-black tracking-tight">
          Truck Info
        </h2>
       

        <img
            src="/images/truck.jpg"
            alt={`truck `}
            className="max-h-[10rem] h-full aspect-[9/2.5] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 brightness-60"
          />


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          {detailFields.map((field, index) => (
            <InfoCell 
              key={index} 
              label={field.label} 
              value={field.value} 
            />
          ))}
        </div>

        <h2 className="text-[1.75rem] font-bold text-black tracking-tight">
              Liability:
            </h2>

            <div className=" w-fit flex flex-col gap-5">
              <p className="text-brand font-bold">Important docs</p>
            <img
            src="/images/liability-doc.jpg"
            alt={`truck `}
            className="max-h-[7rem] h-full aspect-[6/6.5] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 brightness-60"
          />
          </div>

 

      </div>
    </>
  );
}

