"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router"; // Import the navigate for programmatic navigation
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthHeading from "@/components/ui/auth/AuthHeading";
import AuthSubHeading from "@/components/ui/auth/AuthSubHeading";
import { Icon } from "@iconify/react";
import UploadArea from "@/components/ui/UploadArea";
import AttachmentImage from "@/components/ui/AttachmentImage";

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


export default function CarrierProfilePage() {
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
    <div className="flex flex-col gap-[3em] max-h-[calc(100vh-80px)]">
      <div className="">
        <AuthHeading text="Carrier Profile"/>
        <AuthSubHeading>
          <Icon icon={'bi:info-lg'} className="mr-1.5 w-[1.5em] bg-brand rounded-full text-white h-[1.5em] shrink-0 inline"/>
          Each truck will be charged $5.</AuthSubHeading>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar">
        <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar">
          <UploadArea onFileSelect={null}/>

          <AttachmentImage src alt/>

          <AuthInput
            label="Email Address"
            placeholder="Enter your password"
            type="email"
            icon="iconoir:mail" 
            error={errors.email?.message}
            {...register("email")}
          />


          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            showToggle
            error={errors.password?.message}
            {...register("password")}
          />

          <AuthInput
            label="Email Address"
            placeholder="Enter your password"
            type="email"
            icon="iconoir:mail" 
            error={errors.email?.message}
            {...register("email")}
          />


          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            showToggle
            error={errors.password?.message}
            {...register("password")}
          />


          <AuthInput
            label="Email Address"
            placeholder="Enter your password"
            type="email"
            icon="iconoir:mail" 
            error={errors.email?.message}
            {...register("email")}
          />


          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            showToggle
            error={errors.password?.message}
            {...register("password")}
          />

          <span className="font-bold auth-h2">Liability</span>

          <UploadArea onFileSelect={null} iconPosition="left"/>

          <AttachmentImage src alt/>

        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={null}
            className="flex items-center gap-3 font-medium text-black"
          >
            <span>Add Another Carrier</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition hover:scale-105">
              <Icon
                icon="lucide:plus"
                className="h-4 w-4"
              />
            </span>
          </button>
        </div>

  

        {/* Removed href prop so it acts as a genuine submit button, and disabled it if form is invalid or submitting */}
        <AuthButton type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Logging in..." : "Login"}
        </AuthButton>
      </form>
    </div>
  );
}
