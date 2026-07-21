"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import AuthInput from "@/components/ui/Input";
import AuthButton from "@/components/ui/BrandButton";
import { Icon } from "@iconify/react";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import { useState } from "react";

// Single carrier schema
const carrierSchema = z.object({
  truckName: z.string().min(1, "Truck name is required"),
  mcNumber: z
    .string()
    .min(1, "MC number is required")
    .regex(/^[0-9]+$/, "MC number must contain only digits"),
  dotNumber: z
    .string()
    .min(1, "DOT number is required")
    .regex(/^[0-9]+$/, "DOT number must contain only digits"),
  licensePlate: z
    .string()
    .min(1, "License plate number is required")
    .regex(/^[A-Za-z0-9\s-]+$/, "Enter a valid license plate"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vinNumber: z
    .string()
    .min(1, "VIN number is required")
    .length(17, "VIN must be exactly 17 characters")
    .regex(/^[A-HJ-NPR-Z0-9]+$/i, "Enter a valid VIN (no I, O, or Q)"),
});

// Whole form: at least one carrier
const formSchema = z.object({
  carriers: z.array(carrierSchema).min(1, "At least one carrier is required"),
});

const emptyCarrier = {
  truckName: "",
  mcNumber: "",
  dotNumber: "",
  licensePlate: "",
  registrationNumber: "",
  vinNumber: "",
};

export default function CarrierProfilePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { carriers: [emptyCarrier] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "carriers",
  });

  // Per-carrier document state, keyed by field id
  const [docs, setDocs] = useState({}); // { [id]: { truck, liability } }

  const setDoc = (id, key) => (file) => {
    if (!file) return;
    setDocs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: { url: URL.createObjectURL(file), name: file.name } },
    }));
  };

  const removeDoc = (id, key) => () => {
    setDocs((prev) => {
      const doc = prev[id]?.[key];
      if (doc?.url) URL.revokeObjectURL(doc.url);
      return { ...prev, [id]: { ...prev[id], [key]: null } };
    });
  };

  const onSubmit = async (data) => {
    try {
      console.log("Validated Form Submission Data:", data);
      navigate("/home");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const addCarrier = () => append(emptyCarrier);

  const removeCarrier = (index, id) => {
    // Clean up any object URLs for this carrier
    const doc = docs[id];
    if (doc?.truck?.url) URL.revokeObjectURL(doc.truck.url);
    if (doc?.liability?.url) URL.revokeObjectURL(doc.liability.url);
    setDocs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    remove(index);
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

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar ">
        <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3">
          {fields.map((field, index) => {
            const carrierErrors = errors.carriers?.[index] || {};
            const carrierDocs = docs[field.id] || {};

            return (
              <div key={field.id} className="flex flex-col gap-[2.5em]">
                {/* Carrier label between blocks */}
                {index !== 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-bold auth-h2">Carrier #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeCarrier(index, field.id)}
                      className="flex items-center gap-2 auth-h2 font-medium text-red-500 transition hover:text-red-600"
                    >
                      <Icon icon="lucide:trash-2" className="h-[1em] w-[1em]" />
                    </button>
                  </div>
                )}

                <UploadArea onFileSelect={setDoc(field.id, "truck")} />
                {carrierDocs.truck && (
                  <AttachmentImage
                    src={carrierDocs.truck.url}
                    alt={carrierDocs.truck.name}
                    onRemove={removeDoc(field.id, "truck")}
                  />
                )}

                <AuthInput
                  label="Truck Name"
                  placeholder="Enter Truck Name"
                  type="text"
                  error={carrierErrors.truckName?.message}
                  {...register(`carriers.${index}.truckName`)}
                />

                <AuthInput
                  label="MC Number"
                  placeholder="Enter MC Number"
                  type="number"
                  inputMode="numeric"
                  error={carrierErrors.mcNumber?.message}
                  {...register(`carriers.${index}.mcNumber`)}
                />

                <AuthInput
                  label="DOT Number"
                  placeholder="Enter DOT Number"
                  type="number"
                  inputMode="numeric"
                  error={carrierErrors.dotNumber?.message}
                  {...register(`carriers.${index}.dotNumber`)}
                />

                <AuthInput
                  label="License Plate Number"
                  placeholder="Enter License Plate Number"
                  type="number"
                  error={carrierErrors.licensePlate?.message}
                  {...register(`carriers.${index}.licensePlate`)}
                />

                <AuthInput
                  label="Registration Number"
                  placeholder="Enter Registration Number"
                  type="number"
                  error={carrierErrors.registrationNumber?.message}
                  {...register(`carriers.${index}.registrationNumber`)}
                />

                <AuthInput
                  label="VIN Number"
                  placeholder="Enter VIN Number"
                  type="number"
                  error={carrierErrors.vinNumber?.message}
                  {...register(`carriers.${index}.vinNumber`)}
                />

                <span className="font-bold auth-h2">Liability</span>

                <UploadArea onFileSelect={setDoc(field.id, "liability")} iconPosition="left" />
                {carrierDocs.liability && (
                  <AttachmentImage
                    src={carrierDocs.liability.url}
                    alt={carrierDocs.liability.name}
                    onRemove={removeDoc(field.id, "liability")}
                  />
                )}

                {/* Divider between carriers */}
                {index < fields.length - 1 && (
                  <hr className="border-t border-black/10" />
                )}
              </div>
            );
          })}
        </div>

        <div className="auth-h2 mt-5 flex justify-end md:pr-3">
          <button
            type="button"
            onClick={addCarrier}
            className="flex items-center gap-3 font-medium text-black"
          >
            <span className="">Add Another Carrier</span>
            <span className="flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full bg-black text-white transition hover:scale-105">
              <Icon icon="lucide:plus" className="h-[1em] w-[1em]" />
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