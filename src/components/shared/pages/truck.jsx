import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/trucks.json';
import InfoGrid from "@/components/shared/InfoGrid";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useParams } from "react-router";
import NotFound from "@/components/ui/NotFound";
import { Icon } from "@iconify/react";



export default function TruckPage({ onEdit, onDelete }) {

  const { truckId } = useParams();

  const vehicle = vehicles.find((v) => v.slug === truckId);
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
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";

  return (
    <>
        <BackButton >
        Details 
        </BackButton>
        
      <div className=" truck-details rounded-2xl  space-y-3 p-4 w-full  shadow-lg ">
        <div className="flex justify-between">
            <h2 className="main-heading mb-3 font-bold text-black tracking-tight">
                Truck Info
            </h2>
            {role === "carrier" && (
            <div className=" flex items-center gap-2">
                <button
                type="button"
                onClick={onDelete}
                aria-label="Delete truck"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition duration-200 hover:scale-110 active:scale-95"
                >
                <Icon icon="lucide:trash-2" className="h-4 w-4" />
                </button>

                <button
                type="button"
                onClick={onEdit}
                aria-label="Edit truck"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white transition duration-200 hover:scale-110 active:scale-95"
                >
                <Icon icon="lucide:pencil" className="h-4 w-4" />
                </button>
            </div>
            )}
            </div>

          <img
              src="/images/truck.jpg"
              alt={`truck `}
              className="h-[11em]  aspect-[9/2.5] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 brightness-60"
            />


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

