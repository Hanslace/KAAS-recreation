"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/BrandButton";
import Input from "@/components/ui/Input";
import OptionGroup from "@/components/ui/OptionGroup";
import Selector from "@/components/ui/Selector";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import Dropdown from "@/components/ui/Dropdown";
import { DayPicker } from "@/components/ui/Calendar";



const timeOptions = [
  { id: "08:00", label: "08:00 AM" },
  { id: "10:00", label: "10:00 AM" },
  { id: "12:00", label: "12:00 PM" },
  { id: "14:00", label: "02:00 PM" },
  { id: "16:00", label: "04:00 PM" },
];



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



  const onSubmit = async (data) => {
    try {
      console.log("Booking data:", data, "Permits:", permits);
      navigate("/bookings");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="space-y-6 h-full">
        <BackButton>Reschedule Booking</BackButton>


      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[35em] space-y-6">


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

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DayPicker
              label="Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(day) => field.onChange(day.format("YYYY-MM-DD"))}
              error={errors.date?.message}
            />
          )}
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

        

          <Input
            as="textarea"
            label="Description"
            placeholder="Write a Short Discription"
            error={errors.description?.message}
            {...register("description")}
          />

        <Button type="submit" disabled={isSubmitting || !isValid} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}