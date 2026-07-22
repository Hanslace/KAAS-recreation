"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import Input from "@/components/ui/Input";
import BrandButton from "@/components/ui/BrandButton";
import BackButton from "@/components/ui/BackButton";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import SuccessModal from "@/components/shared/modals/SuccessModal";

const truckSchema = z.object({
  truckName: z.string().min(1, "Truck name is required"),
  mcNumber: z.string().min(1, "MC number is required"),
  dotNumber: z.string().min(1, "DOT number is required"),
  licensePlate: z.string().min(1, "License plate number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vinNumber: z
    .string()
    .min(1, "VIN number is required")
    .length(17, "VIN must be exactly 17 characters")
    .regex(/^[A-HJ-NPR-Z0-9]+$/i, "Enter a valid VIN (no I, O, or Q)"),
});

const emptyTruck = {
  truckName: "",
  mcNumber: "",
  dotNumber: "",
  licensePlate: "",
  registrationNumber: "",
  vinNumber: "",
};

export default function TruckForm({
  mode = "add",
  defaultValues = emptyTruck,
  onSubmit: onSubmitProp,
  onDone,
}) {
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(truckSchema),
    mode: "onChange",
    defaultValues,
  });

  const [truckPhoto, setTruckPhoto] = useState(null);
  const [liabilityDoc, setLiabilityDoc] = useState(null);

  const handleTruckPhotoSelect = (file) => {
    if (!file) return;
    setTruckPhoto({ url: URL.createObjectURL(file), name: file.name });
  };

  const removeTruckPhoto = () => {
    if (truckPhoto?.url) URL.revokeObjectURL(truckPhoto.url);
    setTruckPhoto(null);
  };

  const handleLiabilitySelect = (file) => {
    if (!file) return;
    setLiabilityDoc({ url: URL.createObjectURL(file), name: file.name });
  };

  const removeLiabilityDoc = () => {
    if (liabilityDoc?.url) URL.revokeObjectURL(liabilityDoc.url);
    setLiabilityDoc(null);
  };

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, truckPhoto, liabilityDoc };
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
    if (onDone) {
      onDone();
    } else {
      navigate("/trucks");
    }
  };

  return (
    <div className="gap-[2em] flex flex-col justify-center h-full min-h-fit">
      <BackButton>{isEdit ? "Edit Truck" : "Add Truck"}</BackButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-[2em] flex flex-col max-w-[35rem]"
      >
        <div className="gap-[2em] md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3">
          <UploadArea label="Upload Truck Photo" onFileSelect={handleTruckPhotoSelect} />
          {truckPhoto && (
            <AttachmentImage
              src={truckPhoto.url}
              alt={truckPhoto.name}
              onRemove={removeTruckPhoto}
            />
          )}

          <Input
            label="Truck Name"
            placeholder="Enter Truck Name"
            type="text"
            error={errors.truckName?.message}
            {...register("truckName")}
          />

          <Input
            label="MC Number"
            placeholder="Enter MC Number"
            type="text"
            error={errors.mcNumber?.message}
            {...register("mcNumber")}
          />

          <Input
            label="DOT Number"
            placeholder="Enter DOT Number"
            type="text"
            error={errors.dotNumber?.message}
            {...register("dotNumber")}
          />

          <Input
            label="License Plate Number"
            placeholder="Enter License Plate Number"
            type="text"
            error={errors.licensePlate?.message}
            {...register("licensePlate")}
          />

          <Input
            label="Registration Number"
            placeholder="Enter Registration Number"
            type="text"
            error={errors.registrationNumber?.message}
            {...register("registrationNumber")}
          />

          <Input
            label="VIN Number"
            placeholder="Enter VIN Number"
            type="text"
            error={errors.vinNumber?.message}
            {...register("vinNumber")}
          />

          <h2 className="font-bold tracking-tight text-black">Liability:</h2>

          <UploadArea
            label="Upload Liability Insurance"
            iconPosition="left"
            onFileSelect={handleLiabilitySelect}
          />
          {liabilityDoc && (
            <AttachmentImage
              src={liabilityDoc.url}
              alt={liabilityDoc.name}
              onRemove={removeLiabilityDoc}
            />
          )}
        </div>

        <BrandButton type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Add Truck"}
        </BrandButton>
      </form>

      <SuccessModal
        open={successOpen}
        title="Successfully!"
        description={
          isEdit
            ? "Your truck have been updated successfully."
            : "Your truck has been added successfully."
        }
        buttonText="Done"
        onDone={handleSuccessDone}
      />
    </div>
  );
}
