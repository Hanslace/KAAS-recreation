"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router"; // Import the navigate for programmatic navigation
import AuthInput from "@/components/ui/Input";
import AuthButton from "@/components/ui/auth/uthButton";

// Define schema validation rules
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  rememberMe: z.boolean().optional(),
});


export default function LoginPage() {
  const navigate = useNavigate(); // Initialize the navigate

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }, // Extracted isValid to monitor form validity status
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange", 
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // This will ONLY execute if react-hook-form confirms all Zod validation rules pass
  const onSubmit = async (data) => {
    try {
      console.log("Validated Form Submission Data:", data);
      
      // Perform your API authentication call here if needed
      // const response = await api.login(data);

      // Route the user to dashboard programmatically after a successful check
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="">
      <div className="mb-[2em]">
        <h1 className="auth-heading">Welcome Back!</h1>
        <p className="auth-sub-heading">Please enter your credentials</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-[2.5em]">

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          icon="iconoir:mail" 
          error={errors.email?.message}
          {...register("email")}
        />


        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon="solar:lock-password-linear" 
          showToggle
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex auth-options -mt-[1em] mb-[3em] items-center justify-between">
          <label className="flex items-center gap-2  text-black cursor-pointer select-none">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              {...register("rememberMe")}
            />

            <span className="flex h-[1.8em] w-[1.8em] items-center justify-center rounded border border-[#C0A86C] bg-white peer-checked:bg-[#C0A86C] peer-checked:[&>svg]:block">
              <svg
                className="hidden h-[2em] w-[2em] text-white"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 10.5L8.2 13.5L15 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Remember Me
          </label>

          <a
            type="button"
            className=" font-medium text-brand transition hover:text-brand-dark"
            href={"/forgot-password"}
          >
            Forgot Password?
          </a>
        </div>

        {/* Removed href prop so it acts as a genuine submit button, and disabled it if form is invalid or submitting */}
        <AuthButton type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Logging in..." : "Login"}
        </AuthButton>
      </form>
    </div>
  );
}
