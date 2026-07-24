import { useState } from "react";
import BackButton from "@/components/ui/BackButton"
import vehicles from '@/data/escorts.json';
import InfoGrid from "@/components/shared/InfoGrid";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useLocation, useNavigate, useParams } from "react-router";
import NotFound from "@/components/ui/NotFound";
import { Icon } from "@iconify/react";
import ConfirmationModal from "@/components/shared/modals/ConfirmationModal";

export default function EscortPage() {
  const { escortId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const role = import.meta.env.VITE_APP_ROLE ?? 'admin';
  const isPilotCar = role.startsWith('pilot-car');

  const vehicle = vehicles.escorts.find((v) => v.slug === escortId);
  if (!vehicle) {
    return (
      <NotFound/>
    );
  }

  const handleDeleteConfirm = async () => {
    setDeleteOpen(false);
    navigate("/escorts");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-10 justify-between">
        <BackButton>
        Details
        </BackButton>

      </div>
      <div className="  rounded-2xl mt-[1.5rem]  p-[1.5rem] gap-[2rem] w-full shadow-lg ">
        <div className="flex justify-between">
            <h2 className="main-heading mb-3 font-bold text-black tracking-tight">
                Escorts Info
            </h2>
            {isPilotCar && (
            <div className=" flex items-center gap-2">
                <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                aria-label="Delete escort"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition duration-200 hover:scale-110 active:scale-95"
                >
                <Icon icon="lucide:trash-2" className="h-4 w-4" />
                </button>

                <button
                type="button"
                onClick={() => navigate(`${pathname}/edit`)}
                aria-label="Edit escort"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white transition duration-200 hover:scale-110 active:scale-95"
                >
                <Icon icon="lucide:pencil" className="h-4 w-4" />
                </button>
            </div>
            )}
        </div>
        <InfoGrid
          fields={[
            {
              label: 'Escort Name',
              value: vehicle.name,
            },
            {
              label: 'Escort Type',
              value: vehicle.escortType,
            },
            {
              label: 'License Plate Number',
              value: vehicle.licensePlate,
            },
            {
              label: 'VIN Number',
              value: vehicle.vinNumber,
            },
            {
              label: 'Registration Number',
              value: vehicle.registrationNumber,
            },
          ]}
        />

        <div className="mt-7">
          <h3 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
            Attachment:
          </h3>

          <div className="flex flex-wrap items-start gap-4">
            <AttachmentImage
              src={vehicle.imageUrl}
              alt={`${vehicle.name} attachment front`}
            />

            <AttachmentImage
              src={vehicle.imageUrl}
              alt={`${vehicle.name} attachment back`}
            />
          </div>
        </div>

      </div>

      <ConfirmationModal
        open={deleteOpen}
        icon="lucide:trash-2"
        title="Delete!"
        description="Are you sure you want to delete this escort?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
