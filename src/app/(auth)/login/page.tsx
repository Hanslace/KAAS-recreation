"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation"; // Import the router for programmatic navigation
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthHeading from "@/components/ui/auth/AuthHeading";
import AuthSubHeading from "@/components/ui/auth/AuthSubHeading";

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

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter(); // Initialize the router

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }, // Extracted isValid to monitor form validity status
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", 
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // This will ONLY execute if react-hook-form confirms all Zod validation rules pass
  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("Validated Form Submission Data:", data);
      
      // Perform your API authentication call here if needed
      // const response = await api.login(data);

      // Route the user to dashboard programmatically after a successful check
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="">
      <AuthHeading text="Welcome Back!"/>
        
      

      <AuthSubHeading>Please enter your credentials</AuthSubHeading>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          icon="iconoir:mail" 
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="py-1"></div>

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon="lucide:lock" 
          showToggle
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[0.8rem]  xs:text-[0.9rem] xl:text-[1rem] text-black cursor-pointer select-none">
            <input 
              type="checkbox" 
              className="peer sr-only" 
              {...register("rememberMe")}
            />

            <span className="flex h-5 w-5 items-center justify-center rounded border border-[#C0A86C] bg-white peer-checked:bg-[#C0A86C] peer-checked:[&>svg]:block">
              <svg
                className="hidden h-6 w-6 text-white"
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
            className="text-[0.8rem]  xs:text-[0.9rem] xl:text-[1rem] font-medium text-brand transition hover:text-brand-dark"
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
