"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

type AuthInputProps = {
  label: string;
  placeholder: string;
  type?: string;
  icon?: "mail" | "lock";
  showToggle?: boolean;
};

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  icon,
  showToggle = false,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showToggle ? (showPassword ? "text" : "password") : type;

  const Icon = icon === "mail" ? Mail : icon === "lock" ? Lock : null;

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label className="absolute -top-2 left-8 z-10 bg-white px-2 text-base font-normal leading-none text-black">
        {label}
      </label>

      {/* Input Box */}
      <div className="flex h-[86px] w-full items-center rounded-[14px] border border-black/50-4 bg-white px-10 transition-colors duration-200 focus-within:border-brand">
        {Icon && (
          <Icon
            size={31}
            strokeWidth={1.8}
            className="mr-8 shrink-0 text-brand"
          />
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent text-[24px] font-light text-black/70 outline-none placeholder:text-black/35"
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-4 shrink-0 text-black/35 transition hover:text-brand"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff size={24} strokeWidth={1.8} />
            ) : (
              <Eye size={24} strokeWidth={1.8} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}