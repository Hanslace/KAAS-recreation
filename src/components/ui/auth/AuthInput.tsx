"use client";

import { useState, forwardRef, ComponentPropsWithRef } from "react";
import { Icon } from "@iconify/react"; // Import Iconify

type AuthInputProps = {
  label: string;
  placeholder: string;
  type?: string;
  icon?: string; // Changed from union to generic string for Iconify identifiers
  showToggle?: boolean;
  error?: string;
} & ComponentPropsWithRef<"input">;

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      icon,
      showToggle = false,
      error,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showToggle ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative w-full flex flex-col gap-1.5">
        <div className="relative w-full">
          {/* Floating Label */}
          <label className="absolute -top-[6px] left-5 z-10 bg-gradient-to-b from-transparent via-white  to-transparent px-1 text-[0.7rem] lg:text-[0.8rem] xl:text-[0.875rem] font-normal leading-none text-black">
            {label}
          </label>

          {/* Input Box */}
          <div
            className={`flex h-[7.5vh] w-full items-center rounded-xl border border-1 shadow-[0_18px_45px_rgba(0,0,0,0.12)] bg-white px-5 text-black/50 transition-colors duration-200 focus-within:border-1 focus-within:text-brand ${
              error
                ? "border-red-500 focus-within:border-red-500"
                : "border-black/50 focus-within:border-brand"
            }`}
          >
            {icon && (
              <Icon
                icon={icon}
                width={24}
                height={24}
                className={`mr-4 shrink-0 ${error ? "text-red-500" : ""}`}
              />
            )}

            <input
              ref={ref}
              type={inputType}
              placeholder={placeholder}
              {...props}
              className={`w-full bg-transparent text-[1rem] font-light text-black/70 outline-none placeholder:text-black/35 ${
                inputType === "password"
                  ? "[:not(:placeholder-shown)]:tracking-[0.3em]"
                  : ""
              }`}
            />

            {showToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-4 shrink-0 text-black/35 transition hover:text-brand flex items-center justify-center"
                aria-label="Toggle password visibility"
              >
                <Icon 
                  icon={showPassword ? "lucide:eye-off" : "lucide:eye"} 
                  width={24} 
                  height={24} 
                />
              </button>
            )}
          </div>
        </div>

        {/* Validation Error Message */}
        {error && (
          <p className="text-xs text-red-500 px-4 font-medium transition-all duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
