"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router";
import BrandButton from "@/components/ui/BrandButton";
import BackButton from "@/components/ui/BackButton";
import NotFound from "@/components/ui/NotFound";
import SuccessModal from "@/components/shared/modals/SuccessModal";
import VehicleFormFields from "@/components/shared/VehicleFormFields";
import trucksData from "@/data/trucks.json";
import escortsData from "@/data/escorts.json";

const isPilotCarRole = (import.meta.env.VITE_APP_ROLE ?? "admin").startsWith("pilot-car");

const vehicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mcNumber: isPilotCarRole
    ? z.string().optional()
    : z.string().min(1, "MC number is required"),
  dotNumber: z.string().min(1, "DOT number is required"),
  licensePlate: z.string().min(1, "License plate number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vinNumber: z
    .string()
    .min(1, "VIN number is required")
    .length(17, "VIN must be exactly 17 characters")
    .regex(/^[A-HJ-NPR-Z0-9]+$/i, "Enter a valid VIN (no I, O, or Q)"),
});

const emptyVehicle = {
  name: "",
  mcNumber: "",
  dotNumber: "",
  licensePlate: "",
  registrationNumber: "",
  vinNumber: "",
};

export default function VehicleForm({
  mode = "add",
  onSubmit: onSubmitProp,
}) {
  const navigate = useNavigate();
  const { truckId, escortId } = useParams();
  const [successOpen, setSuccessOpen] = useState(false);
  const [files, setFiles] = useState({});

  const isEdit = mode === "edit";
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";
  const isPilotCar = role.startsWith("pilot-car");
  const vehicleLabel = isPilotCar ? "Pilot Car" : "Truck";
  const slug = isPilotCar ? escortId : truckId;

  const vehicle = isEdit
    ? isPilotCar
      ? escortsData.escorts.find((v) => v.slug === slug)
      : trucksData.find((v) => v.slug === slug)
    : null;

  const defaultValues = vehicle
    ? {
        name: vehicle.name,
        mcNumber: vehicle.mcNumber,
        dotNumber: vehicle.dotNumber,
        licensePlate: vehicle.licensePlate,
        registrationNumber: vehicle.registrationNumber,
        vinNumber: vehicle.vinNumber,
      }
    : emptyVehicle;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(vehicleSchema),
    mode: "onChange",
    defaultValues,
  });

  if (isEdit && !vehicle) {
    return <NotFound />;
  }

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, ...files };
      if (onSubmitProp) {
        await onSubmitProp(payload);
      }
      setSuccessOpen(true);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleSuccessDone = () => {
    setSuccessOpen(false);
    navigate(-1);
  };

  return (
    <div className="gap-[2em] flex flex-col  h-full min-h-fit">
      <BackButton>{isEdit ? `Edit ${vehicleLabel}` : `Add ${vehicleLabel}`}</BackButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-[2em] flex flex-col max-w-[35rem]"
      >
        <div className="gap-[2em] md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3 md:pt-1">
          <VehicleFormFields
            register={register}
            errors={errors}
            onFilesChange={setFiles}
          />
        </div>

        <BrandButton type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : `Add ${vehicleLabel}`}
        </BrandButton>
      </form>

      <SuccessModal
        open={successOpen}
        title="Successfully!"
        description={
          isEdit
            ? `Your ${vehicleLabel.toLowerCase()} have been updated successfully.`
            : `Your ${vehicleLabel.toLowerCase()} has been added successfully.`
        }
        buttonText="Done"
        onDone={handleSuccessDone}
      />
    </div>
  );
}
