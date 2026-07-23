"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/BrandButton";
import Input from "@/components/ui/Input";
import OptionGroup from "@/components/ui/OptionGroup";
import Selector from "@/components/ui/Selector";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import Dropdown from "@/components/ui/Dropdown";

// Option arrays (id + label shape that Dropdown expects)
const truckOptions = [
  { id: "truck-a", label: "Truck A" },
  { id: "truck-b", label: "Truck B" },
  { id: "truck-c", label: "Truck C" },
];

const escortCountOptions = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
];

const timeOptions = [
  { id: "08:00", label: "08:00 AM" },
  { id: "10:00", label: "10:00 AM" },
  { id: "12:00", label: "12:00 PM" },
  { id: "14:00", label: "02:00 PM" },
  { id: "16:00", label: "04:00 PM" },
];

const escortPlaces = ["Front Escort", "Rear Escort", "Left Escort", "Right Escort", "High pole"];


const schema = z.object({
  truck: z.string().min(1, "Please select a truck"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropLocation: z.string().min(1, "Drop location is required"),
  miles: z
    .string()
    .min(1, "Miles is required")
    .regex(/^[0-9]+$/, "Enter a valid number of miles"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  numberOfEscorts: z.string().min(1, "Select number of escorts"),
  escortPlaces: z.array(z.string().min(1, "Select a place")),
  mcNumber: z.string().min(1, "MC number is required").regex(/^[0-9]+$/, "Digits only"),
  dotNumber: z.string().min(1, "DOT number is required").regex(/^[0-9]+$/, "Digits only"),
  licensePlate: z.string().min(1, "License plate number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vinNumber: z
    .string()
    .min(1, "VIN number is required")
    .length(17, "VIN must be exactly 17 characters")
    .regex(/^[A-HJ-NPR-Z0-9]+$/i, "Enter a valid VIN (no I, O, or Q)"),
  description: z.string().optional(),
});

const emptyDefaults = {
  truck: "",
  pickupLocation: "",
  dropLocation: "",
  miles: "",
  date: "",
  time: "",
  numberOfEscorts: "",
  escortPlaces: [],
  mcNumber: "",
  dotNumber: "",
  licensePlate: "",
  registrationNumber: "",
  vinNumber: "",
  description: "",
};

export default function Page({ prefill }) {
  const navigate = useNavigate();
  const [permits, setPermits] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { ...emptyDefaults, ...prefill }, // empty unless prefill provided
  });

  const numberOfEscorts = watch("numberOfEscorts");
  const escortPlaces_ = watch("escortPlaces");
  const escortCount = parseInt(numberOfEscorts || "0", 10);

  const setEscortPlace = (index, place) => {
    const next = [...(escortPlaces_ || [])];
    next[index] = place;
    setValue("escortPlaces", next, { shouldValidate: true });
  };

  const handlePermitSelect = (file) => {
    if (!file) return;
    setPermits((prev) => {
      if (prev.length >= 2) return prev; // already at max, ignore
      return [...prev, { url: URL.createObjectURL(file), name: file.name }];
    });
  };

  const removePermit = (index) => () => {
    setPermits((prev) => {
      const doc = prev[index];
      if (doc?.url) URL.revokeObjectURL(doc.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = async (data) => {
    try {
      console.log("Booking data:", data, "Permits:", permits);
      navigate("/bookings");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <BackButton>Book Now</BackButton>
        <Button type="button" to="/home/previous-bookings">
          Add Details from Previous Booking
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[35em] space-y-6">
        {/* Truck */}
        <Controller
          control={control}
          name="truck"
          render={({ field }) => (
            <Selector
              label="Truck"
              placeholder="Select Truck"
              options={truckOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.truck?.message}
            />
          )}
        />

        <Input
          label="Pickup Location"
          placeholder="Enter Pickup Location"
          error={errors.pickupLocation?.message}
          {...register("pickupLocation")}
        />

        <Input
          label="Drop Location"
          placeholder="Enter Drop Location"
          error={errors.dropLocation?.message}
          {...register("dropLocation")}
        />

        <Input
          label="Miles"
          placeholder="250 Miles"
          type="number"
          inputMode="numeric"
          error={errors.miles?.message}
          {...register("miles")}
        />

        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register("date")}
        />

        <Controller
          control={control}
          name="time"
          render={({ field }) => (
            <Selector
              label="Time"
              placeholder="Select Time"
              options={timeOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.time?.message}
            />
          )}
        />

        {/* Number of Escorts */}
        <Controller
          control={control}
          name="numberOfEscorts"
          render={({ field }) => (
            <Selector
              label="Number of Escorts"
              placeholder="Select Number of Escorts"
              options={escortCountOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.numberOfEscorts?.message}
            />
          )}
        />

        {/* Per-escort place selectors */}
        {escortCount > 0 &&
          [...Array(escortCount)].map((_, i) => (
            <div key={i} className="space-y-3">
              <h3 className="font-bold text-black">Escort {i + 1} Place:</h3>
              <OptionGroup
                options={escortPlaces}
                value={escortPlaces_?.[i] || ""}
                onChange={(place) => setEscortPlace(i, place)}
              />
            </div>
          ))}

        {/* Permit upload */}
        <div className="space-y-3">
          <h3 className="font-bold text-black">Permit:</h3>
          <UploadArea label="Upload Permit" iconPosition="left" onFileSelect={handlePermitSelect} />
          {permits.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {permits.map((p, i) => (
                <AttachmentImage
                  key={i}
                  src={p.url}
                  alt={p.name}
                  onRemove={removePermit(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trailer details */}
        <div className="space-y-6">
          <h3 className="font-bold text-black">Trailer Details:</h3>

          <Input
            label="MC Number"
            placeholder="Enter MC Number"
            type="number"
            inputMode="numeric"
            error={errors.mcNumber?.message}
            {...register("mcNumber")}
          />

          <Input
            label="Dot Number"
            placeholder="Enter Dot Number"
            type="number"
            inputMode="numeric"
            error={errors.dotNumber?.message}
            {...register("dotNumber")}
          />

          <Input
            label="License Plate Number"
            placeholder="Enter License Plate Number"
            error={errors.licensePlate?.message}
            {...register("licensePlate")}
          />

          <Input
            label="Registration Number"
            placeholder="Enter Registration Number"
            error={errors.registrationNumber?.message}
            {...register("registrationNumber")}
          />

          <Input
            label="Vin Number"
            placeholder="Vin Number"
            error={errors.vinNumber?.message}
            {...register("vinNumber")}
          />

          <Input
            as="textarea"
            label="Description"
            placeholder="Write a Short Discription"
            error={errors.description?.message}
            {...register("description")}
          />
        </div>

        <Button type="submit" disabled={isSubmitting || !isValid} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}