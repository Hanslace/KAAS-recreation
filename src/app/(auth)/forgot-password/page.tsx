'use client'


import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import AuthInput from "@/components/ui/auth/AuthInput";
import BackButton from "@/components/ui/auth/BackButton";
import { useRouter } from "next/navigation";
import AuthButton from "@/components/ui/auth/AuthButton";


const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

// Infer the Form Type from the schema
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;


export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange", // Validates on every keystroke to toggle AuthButton 'disabled' state properly
  });

  // 3. Define the submission handler function
  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      // Perform your API logic / Auth trigger here
      router.push(`/forgot-password/otp`);
      
      // Example: await api.auth.forgotPassword(data.email);
    } catch (error) {

    }
  };

  return (
    <>
      <BackButton onBack={() => router.push('/login')} />

      <h1 className="mb-2 text-heading font-bold text-brand">
        Forgot Password
      </h1>

      <p className="mb-10 text-sub-text text-black/50">
        Please enter your email to reset your password
      </p>

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