'use client'


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import AuthInput from "@/components/ui/auth/AuthInput";
import BackButton from "@/components/ui/BackButton";

import AuthButton from "@/components/ui/auth/AuthButton";
import AuthHeading from "@/components/ui/auth/AuthHeading";
import AuthSubHeading from "@/components/ui/auth/AuthSubHeading";
import { useNavigate } from "react-router";


const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

// Infer the Form Type from the schema


export default function Page() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
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
    <>
      <BackButton href="/login">Back</BackButton>

      <AuthHeading text="Forgot Password" />
        


      <AuthSubHeading>Please enter your email to reset your password</AuthSubHeading>
        
   

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

    </>
  );
}