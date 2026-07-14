import React, { useRef, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import BackButton from "@/components/ui/BackButton";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthHeading from '@/components/ui/auth/AuthHeading';
import AuthSubHeading from '@/components/ui/auth/AuthSubHeading';
import { useNavigate } from 'react-router';

const otpSchema = z.object({
  otp: z
    .array(z.string().regex(/^\d$/, "Must be a single number"))
    .length(6, "OTP must be exactly 6 digits"),
});

export default function OtpPage() {
  const navigate = useNavigate();
  // Changed type annotation to a plain array ref initialization
  const inputRefs = useRef([]);
  
  // Timer State Management (Starts at 40 seconds)
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  // Helper function to format time (e.g., 40 -> "00:40")
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Resend Click Handler with Reset Logic
  const handleResendOtp = () => {
    if (timeLeft > 0) return; // Prevent clicks while timer is still running
    
    console.log("Resending OTP Code via API...");
    // await api.auth.resendOtp();
    
    setTimeLeft(40); // Reset timer back to 40 seconds
  };

  // Removed <OtpFormValues> type parameter from useForm
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  // Removed SubmitHandler type definition
  const onSubmit = async (data) => {
    try {
      const fullOtpCode = data.otp.join("");
      console.log("Submitting Verified OTP Code:", fullOtpCode);
      navigate(`/forgot-password/reset`);
    } catch (error) {
      console.error("OTP verification failed", error);
    }
  };

  // Removed inline React parameter type annotations
  const handleInputChange = (e, index, onChange, value) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const currentDigit = val.substring(val.length - 1);
    const newOtp = [...value];
    newOtp[index] = currentDigit;
    onChange(newOtp);

    // Removed the '?' safe-navigation TypeScript assertion check
    if (index < 5 && currentDigit && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Removed inline React parameter type annotations
  const handleKeyDown = (e, index, onChange, value) => {
    if (e.key === "Backspace") {
      const newOtp = [...value];
      if (newOtp[index] === "") {
        if (index > 0) {
          newOtp[index - 1] = "";
          onChange(newOtp);
          if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
          }
        }
      } else {
        newOtp[index] = "";
        onChange(newOtp);
      }
      e.preventDefault();
    }
  };

  // Removed inline React parameter type annotations
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");
    if (pastedData.length === 6) {
      const digits = pastedData.split("");
      setValue("otp", digits, { shouldValidate: true });
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-4">
      <div className="w-full max-w-md flex flex-col items-start">
        <BackButton href="/forgot-password">Back</BackButton>

        <AuthHeading text="Enter OTP"/>
        <AuthSubHeading>Please enter OTP sent to your email</AuthSubHeading>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8 flex flex-col items-center">
          
          <Controller
            name="otp"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex justify-between items-center gap-2 sm:gap-3 py-2 w-full mx-auto">
                {value.map((digit, index) => {
                  const hasValue = digit !== "";
                  return (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onPaste={handlePaste}
                      onChange={(e) => handleInputChange(e, index, onChange, value)}
                      onKeyDown={(e) => handleKeyDown(e, index, onChange, value)}
                      className={`w-full aspect-square text-center text-xl font-bold rounded-xl border bg-white shadow-md transition-all focus:outline-none 
                        ${hasValue ? 'border-amber-600/30 text-black' : 'border-gray-100 text-gray-400'} 
                        focus:border-brand focus:ring-1 focus:ring-brand`}
                      placeholder="-"
                    />
                  );
                })}
              </div>
            )}
          />

          <AuthButton 
            type="submit" 
            disabled={isSubmitting || !isValid}
            className="w-full"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </AuthButton>

          {/* Action Footer Context */}
          <div className="text-center w-full space-y-6">
            <p className="text-sub-text text-gray-500">
              Code didn't receive?{" "}
              <button 
                type="button" 
                onClick={handleResendOtp} 
                disabled={timeLeft > 0}
                className={`font-medium focus:outline-none transition-colors ${
                  timeLeft > 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-brand hover:underline cursor-pointer'
                }`}
              >
                Resend OTP
              </button>
            </p>

            {/* Circular Timer Graphics Overlay */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand transition-all duration-1000 ease-linear"
                  strokeDasharray={`${(timeLeft / 40) * 100}, 100`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-brand font-bold text-sm">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
