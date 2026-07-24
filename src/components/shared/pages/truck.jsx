import { useState } from "react";
import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/trucks.json';
import InfoGrid from "@/components/shared/InfoGrid";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useLocation, useNavigate, useParams } from "react-router";
import NotFound from "@/components/ui/NotFound";
import ConfirmationModal from "@/components/shared/modals/ConfirmationModal";
import EditDeleteActions from "@/components/ui/EditDeleteActions";



export default function TruckPage() {

  const { truckId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const vehicle = vehicles.find((v) => v.slug === truckId);
  if (!vehicle) {
    return (
      <NotFound/>
    );
  }

  const handleDeleteConfirm = async () => {
    setDeleteOpen(false);
    navigate("/trucks");
  };

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
              <EditDeleteActions
                label="truck"
                onDelete={() => setDeleteOpen(true)}
                onEdit={() => navigate(`${pathname}/edit`)}
              />
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

      <ConfirmationModal
        open={deleteOpen}
        icon="lucide:trash-2"
        title="Delete!"
        description="Are you sure you want to delete this truck?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

