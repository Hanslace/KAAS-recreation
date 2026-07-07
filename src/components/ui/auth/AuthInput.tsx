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
          <label className="absolute -top-2 left-8 z-10 bg-white px-2 text-label font-normal leading-none text-black">
            {label}
          </label>

          {/* Input Box */}
          <div
            className={`flex h-[7.5vh] w-full items-center rounded-[14px] border border-2 shadow-[0_18px_45px_rgba(0,0,0,0.12)] bg-white px-10 transition-colors duration-200 focus-within:border-3 ${
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
                className={`mr-8 shrink-0 ${error ? "text-red-500" : "text-brand"}`}
              />
            )}

            <input
              ref={ref}
              type={inputType}
              placeholder={placeholder}
              {...props}
              className={`w-full bg-transparent text-sub-text font-light text-black/70 outline-none placeholder:text-black/35 ${
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
