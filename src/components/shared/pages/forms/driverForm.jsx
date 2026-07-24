"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router";
import Input from "@/components/ui/Input";
import BrandButton from "@/components/ui/BrandButton";
import BackButton from "@/components/ui/BackButton";
import AvatarPicker from "@/components/ui/AvatarPicker";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import SuccessModal from "@/components/shared/modals/SuccessModal";
import NotFound from "@/components/ui/NotFound";
import driversData from "@/data/company-drivers.json";

const driverSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a complete address"),
  escortName: z.string().min(1, "Escort name is required"),
  escortType: z.string().optional(),
});

const emptyDriver = {
  name: "",
  password: "",
  email: "",
  phoneNumber: "",
  address: "",
  escortName: "",
  escortType: "",
};

const makeFileHandlers = (value, setValue, setError) => ({
  onSelect: (file) => {
    if (!file) return;
    if (value) {
      setError("You can only upload 1 file. Remove the current one to upload another.");
      return;
    }
    setError("");
    setValue({ url: URL.createObjectURL(file), name: file.name });
  },
  onRemove: () => {
    if (value?.url) URL.revokeObjectURL(value.url);
    setValue(null);
    setError("");
  },
});

export default function DriverForm({ mode = "add" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === "edit";

  const currentDriver = isEdit
    ? driversData.tableData.find((driver) => driver.slug === id)
    : null;

  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);
  const [pevoCert, setPevoCert] = useState(null);
  const [dotCert, setDotCert] = useState(null);

  const [licenseFrontError, setLicenseFrontError] = useState("");
  const [licenseBackError, setLicenseBackError] = useState("");
  const [pevoError, setPevoError] = useState("");
  const [dotError, setDotError] = useState("");

  const licenseFrontHandlers = makeFileHandlers(licenseFront, setLicenseFront, setLicenseFrontError);
  const licenseBackHandlers = makeFileHandlers(licenseBack, setLicenseBack, setLicenseBackError);
  const pevoHandlers = makeFileHandlers(pevoCert, setPevoCert, setPevoError);
  const dotHandlers = makeFileHandlers(dotCert, setDotCert, setDotError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(driverSchema),
    mode: "onChange",
    defaultValues: currentDriver
      ? {
          name: currentDriver.name,
          email: currentDriver.email,
          phoneNumber: currentDriver.phoneNumber,
          address: currentDriver.address,
          escortName: currentDriver.escortName,
          escortType: currentDriver.escortType ?? "",
        }
      : emptyDriver,
  });

  if (isEdit && !currentDriver) {
    return (<NotFound/>);
  }

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        avatarFile,
        licenseFront,
        licenseBack,
        pevoCert,
        dotCert,
      };
      console.log(isEdit ? "Updating driver:" : "Adding driver:", payload);
      setShowSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <BackButton>{isEdit ? "Edit Driver" : "Add Driver"}</BackButton>

      <AvatarPicker onChange={setAvatarFile} defaultPreview={currentDriver?.logo ?? null} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-[70rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter Full Name"
              error={errors.name?.message}
              {...register("name")}
            />

            

          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register("email")}
          />

          {!isEdit && (
            <Input
              label="Password"
              type="password"
              showToggle
              placeholder="Enter Password"
              error={errors.password?.message}
              {...register("password")}
            />
          )}

          <Input
            label="Phone Number"
            type="tel"
            inputMode="numeric"
            placeholder="Enter Phone Number"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />

          <Input
            label="Address"
            type="text"
            placeholder="Enter Address"
            error={errors.address?.message}
            {...register("address")}
          />

          <Input
            label="Escort Name"
            type="text"
            placeholder="Enter Escort Name"
            error={errors.escortName?.message}
            {...register("escortName")}
          />

          <Input
            label="Escort Type"
            type="text"
            placeholder="Enter Escort Type"
            error={errors.escortType?.message}
            {...register("escortType")}
          />

          <Input
              label="Driver ID ( Auto Generated)"
              type="text"
              value={currentDriver?.driverId ?? "DRV-00001"}
              disabled
              readOnly
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-bold auth-h2 tracking-tight text-black">License:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <UploadArea label="License Front Upload" iconPosition="left" onFileSelect={licenseFrontHandlers.onSelect} />
              {licenseFrontError && (
                <p className="text-red-500 px-4 font-medium transition-all duration-200">
                  {licenseFrontError}
                </p>
              )}
              {licenseFront && (
                <AttachmentImage
                  src={licenseFront.url}
                  alt={licenseFront.name}
                  onRemove={licenseFrontHandlers.onRemove}
                />
              )}
            </div>

            <div className="space-y-3">
              <UploadArea label="License Back Upload" iconPosition="left" onFileSelect={licenseBackHandlers.onSelect} />
              {licenseBackError && (
                <p className="text-red-500 px-4 font-medium transition-all duration-200">
                  {licenseBackError}
                </p>
              )}
              {licenseBack && (
                <AttachmentImage
                  src={licenseBack.url}
                  alt={licenseBack.name}
                  onRemove={licenseBackHandlers.onRemove}
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold auth-h2 tracking-tight text-black">Certification:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <UploadArea
                label="Escort Vehicle Operator Certification (PEVO)"
                iconPosition="left"
                onFileSelect={pevoHandlers.onSelect}
              />
              {pevoError && (
                <p className="text-red-500 px-4 font-medium transition-all duration-200">
                  {pevoError}
                </p>
              )}
              {pevoCert && (
                <AttachmentImage src={pevoCert.url} alt={pevoCert.name} onRemove={pevoHandlers.onRemove} />
              )}
            </div>

            <div className="space-y-3">
              <UploadArea iconPosition="left" label="DOT Medical Certificate" onFileSelect={dotHandlers.onSelect} />
              {dotError && (
                <p className="text-red-500 px-4 font-medium transition-all duration-200">
                  {dotError}
                </p>
              )}
              {dotCert && (
                <AttachmentImage src={dotCert.url} alt={dotCert.name} onRemove={dotHandlers.onRemove} />
              )}
            </div>
          </div>
        </div>

        <BrandButton
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full max-w-[35rem]"
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update" : "Add Driver"}
        </BrandButton>
      </form>

      <SuccessModal
        open={showSuccess}
        title="Successfully!"
        description={
          isEdit
            ? "Driver has been updated successfully."
            : "Driver has been added successfully."
        }
        buttonText="Done"
        onDone={() => {
          setShowSuccess(false);
          navigate("/drivers");
        }}
      />
    </div>
  );
}
