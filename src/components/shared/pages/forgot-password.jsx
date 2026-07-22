'use client'


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import AuthInput from "@/components/ui/Input";
import BackButton from "@/components/ui/BackButton";

import AuthButton from "@/components/ui/BrandButton";
import { useNavigate } from "react-router";


const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

// Infer the Form Type from the schema


export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange", // Validates on every keystroke to toggle AuthButton 'disabled' state properly
  });

  // 3. Define the submission handler function
  const onSubmit = async () => {
    try {
      // Perform your API logic / Auth trigger here
      navigate(`/forgot-password/otp`);
      
      // Example: await api.auth.forgotPassword(data.email);
    } catch (error) {

    }
  };

  return (
    <div className="gap-3 flex flex-col justify-center h-full min-h-fit">
      <BackButton href="/login">Back</BackButton>
      <div className="mb-6">
        <h1 className="auth-heading">Forgot Password</h1> 
        <p className="auth-sub-heading">Please enter your email to reset your password</p>
      </div>
   

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            icon="iconoir:mail" 
            error={errors.email?.message}
            {...register("email")}
          />

          <AuthButton 
            type="submit" 
            disabled={isSubmitting || !isValid}
            className="w-full"
          >
            {isSubmitting ? "Sending..." : "Reset Password"}
          </AuthButton>
        </form>

    </div>
  );
}