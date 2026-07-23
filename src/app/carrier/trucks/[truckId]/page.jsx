import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import TruckPage from "@/components/shared/pages/truck";
import ConfirmationModal from "@/components/shared/modals/ConfirmationModal";

export default function Page() {
  const { truckId } = useParams();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    setDeleteOpen(false);
    navigate("/trucks");
  };

  return (
    <>
      <TruckPage
        onEdit={() => navigate(`/trucks/${truckId}/edit`)}
        onDelete={() => setDeleteOpen(true)}
      />

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
