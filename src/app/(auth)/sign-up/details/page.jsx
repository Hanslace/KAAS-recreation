"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import AuthInput from "@/components/ui/Input";
import AuthButton from "@/components/ui/BrandButton";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";
import BackButton from "@/components/ui/BackButton";

const schema = z.object({
  mcNumber: z
    .string()
    .min(1, "MC number is required")
    .regex(/^[0-9]+$/, "MC number must contain only digits"),
  dotNumber: z
    .string()
    .min(1, "DOT number is required")
    .regex(/^[0-9]+$/, "DOT number must contain only digits"),
});

export default function DetailsPage() {
  const navigate = useNavigate();

  const role = import.meta.env.VITE_APP_ROLE ?? "admin";
  const isCompany = role === "pilot-car-manager";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { mcNumber: "", dotNumber: "" },
  });

  const [insuranceDocs, setInsuranceDocs] = useState([]);
  const [licenseDocs, setLicenseDocs] = useState([]);
  const [certificateDocs, setCertificateDocs] = useState([]);
  const [docErrors, setDocErrors] = useState({});

  const addDoc = (setDocs, limit, key) => (file) => {
    if (!file) return;
    setDocs((previous) => {
      if (previous.length >= limit) {
        setDocErrors((prev) => ({
          ...prev,
          [key]: `You can only upload ${limit} file${limit > 1 ? "s" : ""}`,
        }));
        return previous;
      }
      setDocErrors((prev) => ({ ...prev, [key]: undefined }));
      return [
        ...previous,
        { id: crypto.randomUUID(), url: URL.createObjectURL(file), name: file.name },
      ];
    });
  };

  const removeDoc = (setDocs, key) => (id) => () => {
    setDocs((previous) => {
      const doc = previous.find((item) => item.id === id);
      if (doc?.url) URL.revokeObjectURL(doc.url);
      return previous.filter((item) => item.id !== id);
    });
    setDocErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (data) => {
    try {
      console.log(isCompany ? "Company details:" : "Personal details:", data, {
        insuranceDocs,
        licenseDocs,
        certificateDocs,
      });
      navigate("/sign-up/create-profile");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="gap-3 flex flex-col justify-center h-full min-h-fit">
      <BackButton>Back</BackButton>

      <div className="mb-6">
        <h1 className="auth-heading">{isCompany ? "Company Details" : "Personal Details"}</h1>
        <p className="auth-sub-heading">
          {isCompany ? "Please enter your company information" : "Please enter your personal information"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-[1.5em] md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3 md:pt-1"
      >
        <AuthInput
            label="MC Number"
            placeholder="Enter MC Number"
            type="number"
            inputMode="numeric"
            error={errors.mcNumber?.message}
            {...register("mcNumber")}
        />

        <AuthInput
            label="DOT Number"
            placeholder="Enter DOT Number"
            type="number"
            inputMode="numeric"
            error={errors.dotNumber?.message}
            {...register("dotNumber")}
        />
 

        <div className="space-y-3">
          <span className="font-bold auth-h2">Insurance:</span>

          <UploadArea
            label="Upload Insurance Documents"
            onFileSelect={addDoc(setInsuranceDocs, 1, "insurance")}
          />

          {docErrors.insurance && (
            <p className="text-red-500 px-4 font-medium transition-all duration-200">
              {docErrors.insurance}
            </p>
          )}

          {insuranceDocs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {insuranceDocs.map((doc) => (
                <AttachmentImage
                  key={doc.id}
                  src={doc.url}
                  alt={doc.name}
                  onRemove={removeDoc(setInsuranceDocs, "insurance")(doc.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <span className="font-bold auth-h2">License:</span>

          <UploadArea
            label="Upload License"
            onFileSelect={addDoc(setLicenseDocs, 2, "license")}
          />

          {docErrors.license && (
            <p className="text-red-500 px-4 font-medium transition-all duration-200">
              {docErrors.license}
            </p>
          )}

          {licenseDocs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {licenseDocs.map((doc) => (
                <AttachmentImage
                  key={doc.id}
                  src={doc.url}
                  alt={doc.name}
                  onRemove={removeDoc(setLicenseDocs, "license")(doc.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <span className="font-bold auth-h2">Certificate:</span>

          <UploadArea
            label="Upload Certificates"
            onFileSelect={addDoc(setCertificateDocs, 2, "certificate")}
          />

          {docErrors.certificate && (
            <p className="text-red-500 px-4 font-medium transition-all duration-200">
              {docErrors.certificate}
            </p>
          )}

          {certificateDocs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {certificateDocs.map((doc) => (
                <AttachmentImage
                  key={doc.id}
                  src={doc.url}
                  alt={doc.name}
                  onRemove={removeDoc(setCertificateDocs, "certificate")(doc.id)}
                />
              ))}
            </div>
          )}
        </div>

        <AuthButton type="submit" disabled={isSubmitting || !isValid} className="w-full">
          {isSubmitting ? "Saving..." : "Next"}
        </AuthButton>
      </form>
    </div>
  );
}
