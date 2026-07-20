import { useForm } from "react-hook-form"; // Removed SubmitHandler import
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "@/components/ui/auth/AuthInput";
import BackButton from "@/components/ui/BackButton";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthHeading from '@/components/ui/auth/AuthHeading';
import AuthSubHeading from '@/components/ui/auth/AuthSubHeading';
import { useNavigate } from "react-router";

// 1. Define the Schema for Resetting Password with matching requirements
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Sets the error specifically on the confirmPassword field
  });


export default function CreateProfilePage() {
  const navigate = useNavigate();

  // 2. React Hook Form Initialization - Stripped out <ResetPasswordFormValues>
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // 3. Submission Handler Function
  const onSubmit = async (data) => {
    try {
      console.log("Submitting New Password Data:", data.password);
      // Example: await api.auth.updatePassword(data.password);
      
      // Redirect straight to login once password update succeeds
      navigate(`/login`);
    } catch (error) {
      console.error("Failed to update password:", error);
    }
  };

  return (
    <div className="space-y-3">
      {/* Back button directs user back to the OTP screen if they need to check it */}
      <BackButton href="/forgot-password/otp">Back</BackButton>
      <div className="mb-6">
        <AuthHeading text="Reset Password"/>

        <AuthSubHeading>Please type your new password</AuthSubHeading>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <AuthInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          icon="solar:lock-password-linear" // Updated to lock icon
          error={errors.password?.message}
          {...register("password")}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          icon="solar:lock-password-linear" // Updated to lock icon
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <AuthButton 
          type="submit" 
          disabled={isSubmitting || !isValid}
          className="w-full"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </AuthButton>
      </form>
    </div>
  );
}
