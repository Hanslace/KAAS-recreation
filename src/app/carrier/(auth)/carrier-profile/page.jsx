"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import AuthInput from "@/components/ui/Input";
import AuthButton from "@/components/ui/auth/uthButton";
import { Icon } from "@iconify/react";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useState } from "react";

// Define schema validation rules
const carrierSchema = z.object({
  truckName: z.string().min(1, "Truck name is required"),
  mcNumber: z.string().min(1, "MC number is required"),
  dotNumber: z.string().min(1, "DOT number is required"),
  licensePlate: z.string().min(1, "License plate number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vinNumber: z.string().min(1, "VIN number is required"),
});

export default function CarrierProfilePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(carrierSchema),
    mode: "onChange",
    defaultValues: {
      truckName: "",
      mcNumber: "",
      dotNumber: "",
      licensePlate: "",
      registrationNumber: "",
      vinNumber: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Validated Form Submission Data:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const [truckDoc, setTruckDoc] = useState(null);      // { url, name }
  const [liabilityDoc, setLiabilityDoc] = useState(null);

  const handleSelect = (setter) => (file) => {
    if (!file) return;
    setter({ url: URL.createObjectURL(file), name: file.name });
  };

  const handleRemove = (doc, setter) => () => {
    if (doc?.url) URL.revokeObjectURL(doc.url);   // free memory
    setter(null);
  };

  return (
    <div className="flex flex-col gap-[3em] max-h-[calc(100vh-80px)]">
      <div className="">
        <h1 className="auth-heading">Carrier Profile</h1> 
        <p className="auth-sub-heading">
          <Icon icon={'bi:info-lg'} className="mr-1.5 w-[1.5em] bg-brand rounded-full text-white h-[1.5em] shrink-0 inline" />
          Each truck will be charged $5.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar">
        <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar">
          <UploadArea onFileSelect={handleSelect(setTruckDoc)} />
          {truckDoc && (
            <AttachmentImage
              src={truckDoc.url}
              alt={truckDoc.name}
              onRemove={handleRemove(truckDoc, setTruckDoc)}
            />
          )}


          <AuthInput
            label="Truck Name"
            placeholder="Enter Truck Name"
            type="text"
            error={errors.truckName?.message}
            {...register("truckName")}
          />

          <AuthInput
            label="MC Number"
            placeholder="Enter MC Number"
            type="text"
            error={errors.mcNumber?.message}
            {...register("mcNumber")}
          />

          <AuthInput
            label="DOT Number"
            placeholder="Enter DOT Number"
            type="text"
            error={errors.dotNumber?.message}
            {...register("dotNumber")}
          />

          <AuthInput
            label="License Plate Number"
            placeholder="Enter License Plate Number"
            type="text"
            error={errors.licensePlate?.message}
            {...register("licensePlate")}
          />

          <AuthInput
            label="Registration Number"
            placeholder="Enter Registration Number"
            type="text"
            error={errors.registrationNumber?.message}
            {...register("registrationNumber")}
          />

          <AuthInput
            label="VIN Number"
            placeholder="Enter VIN Number"
            type="text"
            error={errors.vinNumber?.message}
            {...register("vinNumber")}
          />

          <span className="font-bold auth-h2">Liability</span>

          <UploadArea onFileSelect={handleSelect(setLiabilityDoc)} iconPosition="left" />
          {liabilityDoc && (
            <AttachmentImage
              src={liabilityDoc.url}
              alt={liabilityDoc.name}
              onRemove={handleRemove(liabilityDoc, setLiabilityDoc)}
            />
          )}

        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={null}
            className="flex items-center gap-3 font-medium text-black"
          >
            <span>Add Another Carrier</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition ">
              <Icon icon="lucide:plus" className="h-4 w-4" />
            </span>
          </button>
        </div>

        <AuthButton type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Saving..." : "Save"}
        </AuthButton>
      </form>
    </div>
  );
}