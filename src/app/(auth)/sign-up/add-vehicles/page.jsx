"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import AuthButton from "@/components/ui/BrandButton";
import { Icon } from "@iconify/react";
import BackButton from "@/components/ui/BackButton";
import VehicleFormFields from "@/components/shared/VehicleFormFields";

const isPilotCarRole = (import.meta.env.VITE_APP_ROLE ?? "admin").startsWith("pilot-car");

// Single carrier schema
const carrierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mcNumber: isPilotCarRole
    ? z.string().optional()
    : z
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
  name: "",
  mcNumber: "",
  dotNumber: "",
  licensePlate: "",
  registrationNumber: "",
  vinNumber: "",
};

export default function AddVehiclesPage() {
  const navigate = useNavigate();

  const role = import.meta.env.VITE_APP_ROLE ?? "admin";
  const isPilotCar = role.startsWith("pilot-car");
  const vehicleLabel = isPilotCar ? "Pilot Car" : "Truck";

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

  const onSubmit = async (data) => {
    try {
      console.log("Validated Form Submission Data:", data);
      navigate(isPilotCar ? "/sign-up/fares" : "/home");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const addCarrier = () => append(emptyCarrier);

  const removeCarrier = (index) => {
    remove(index);
  };

  return (
    <div className="gap-[1em] flex flex-col justify-center h-full min-h-fit">
      <BackButton>Back</BackButton>

      <div className="">
        <h1 className="auth-heading">{isPilotCar ? "Add Pilot Car" : "Carrier Profile"}</h1>
        <p className="auth-sub-heading">
          <Icon icon={'bi:info-lg'} className="mr-1.5 w-[1.5em] bg-brand rounded-full text-white h-[1.5em] shrink-0 inline" />
          Each {vehicleLabel.toLowerCase()} will be charged $5.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-[1.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar ">
        <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3 md:pt-1">
          {fields.map((field, index) => {
            const carrierErrors = errors.carriers?.[index] || {};

            return (
              <div key={field.id} className="flex flex-col gap-[2.5em]">
                {/* Carrier label between blocks */}
                {index !== 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-bold auth-h2">
                      {isPilotCar ? "Pilot Car" : "Carrier"} #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCarrier(index)}
                      className="flex items-center gap-2 auth-h2 font-medium text-red-500 transition hover:text-red-600"
                    >
                      <Icon icon="lucide:trash-2" className="h-[1em] w-[1em]" />
                    </button>
                  </div>
                )}

                <VehicleFormFields
                  register={register}
                  errors={carrierErrors}
                  fieldName={(key) => `carriers.${index}.${key}`}
                />

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
            <span className="">{isPilotCar ? "Add Pilot Car" : "Add Another Carrier"}</span>
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
