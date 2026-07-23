"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import AuthInput from "@/components/ui/Input";
import AuthButton from "@/components/ui/BrandButton";
import Selector from "@/components/ui/Selector";
import BackButton from "@/components/ui/BackButton";

const fareTypeOptions = [
  { id: "per-day", label: "Per Day" },
  { id: "per-mile", label: "Per Mile" },
  { id: "overnight", label: "Overnight" },
  { id: "custom", label: "Custom" },
];

const fareSchema = z.object({
  type: z.string().min(1, "Please select a fare type"),
  customName: z.string().optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, "Enter a valid price"),
});

const formSchema = z.object({
  fares: z.array(fareSchema).min(1, "At least one fare is required"),
});

const emptyFare = {
  type: "",
  customName: "",
  price: "",
};

export default function FaresPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { fares: [emptyFare] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fares",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Fares:", data);
      navigate("/home");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const addFare = () => append(emptyFare);

  return (
    <div className="gap-[1em] flex flex-col justify-center h-full min-h-fit">
      <BackButton>Back</BackButton>

      <div className="">
        <h1 className="auth-heading">Add fares</h1>
        <p className="auth-sub-heading">Please enter your pilot car fares</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-[1.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar ">
        <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3 md:pt-1">
          {fields.map((field, index) => {
            const fareErrors = errors.fares?.[index] || {};
            const fareType = watch(`fares.${index}.type`);

            return (
              <div key={field.id} className="flex flex-col gap-[2.5em]">
                {/* Fare label between blocks */}
                {index !== 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-bold auth-h2">Fare #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex items-center gap-2 auth-h2 font-medium text-red-500 transition hover:text-red-600"
                    >
                      <Icon icon="lucide:trash-2" className="h-[1em] w-[1em]" />
                    </button>
                  </div>
                )}

                <Controller
                  control={control}
                  name={`fares.${index}.type`}
                  render={({ field: typeField }) => (
                    <Selector
                      label="Fare Type"
                      placeholder="Select Fare Type"
                      options={fareTypeOptions}
                      value={typeField.value}
                      onChange={typeField.onChange}
                      error={fareErrors.type?.message}
                    />
                  )}
                />

                {fareType === "custom" && (
                  <AuthInput
                    label="Custom Field Name"
                    placeholder="Enter Field Name"
                    type="text"
                    error={fareErrors.customName?.message}
                    {...register(`fares.${index}.customName`)}
                  />
                )}

                <AuthInput
                  label="Price"
                  placeholder="$ Enter Price"
                  type="number"
                  inputMode="decimal"
                  error={fareErrors.price?.message}
                  {...register(`fares.${index}.price`)}
                />

                {/* Divider between fares */}
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
            onClick={addFare}
            className="flex items-center gap-3 font-medium text-black"
          >
            <span className="">Add Another Fare</span>
            <span className="flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full bg-black text-white transition hover:scale-105">
              <Icon icon="lucide:plus" className="h-[1em] w-[1em]" />
            </span>
          </button>
        </div>

        <AuthButton type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Saving..." : "Create Profile"}
        </AuthButton>
      </form>
    </div>
  );
}
