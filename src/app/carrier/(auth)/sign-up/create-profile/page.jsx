import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Icon } from "@iconify/react";
import AuthInput from "@/components/ui/Input";
import BackButton from "@/components/ui/BackButton";
import AuthButton from "@/components/ui/BrandButton";
import { useNavigate } from "react-router";
import SuccessModal from "@/components/shared/modals/SuccessModal";
import AvatarPicker from "@/components/ui/AvatarPicker";

const createProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long"),
  phoneNumber: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  address: z
    .string()
    .min(5, "Please enter your complete address"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
});

export default function CreateProfilePage() {
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(createProfileSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting Profile Data:", data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };

  return (
    <div className="space-y-3">
      <BackButton href="/">Back</BackButton>
      <div className="mb-6">
        <h1 className="auth-heading">Create Profile</h1>
        <p className="auth-sub-heading">Please enter your Personal information</p>
      </div>

      <AvatarPicker onChange={(file) => console.log("Selected avatar:", file)} />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <AuthInput
          label="Full Name."
          type="text"
          placeholder="Enter Your Name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          inputMode="numeric"
          placeholder="Enter Phone Number"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/[^0-9+\-\s()]/g, "").slice(0, 15);
            },
          })}
        />

        <AuthInput
          label="Complete Address"
          type="text"
          placeholder="Enter Address"
          error={errors.address?.message}
          {...register("address")}
        />

        <AuthInput
          label="State"
          type="text"
          placeholder="Autofill from Address"
          error={errors.state?.message}
          {...register("state")}
        />

        <AuthInput
          label="City"
          type="text"
          placeholder="Autofill from Address"
          error={errors.city?.message}
          {...register("city")}
        />

        <AuthButton
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full"
        >
          {isSubmitting ? "Saving..." : "Next"}
        </AuthButton>
      </form>

      <SuccessModal
        open={showSuccess}
        title="Successfully!"
        description={[
            "Your profile has been submitted for review.",
            "Our team will verify your information, and once your profile is approved, you will be notified immediately."
          ]}        
        buttonText="Next"
        onDone={() => {
          setShowSuccess(false);
          navigate("/payment-plan");
        }}
      />
    </div>
  );
}