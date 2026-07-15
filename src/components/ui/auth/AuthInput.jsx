import { useState, forwardRef, ComponentPropsWithRef } from "react";
import { Icon } from "@iconify/react"; // Import Iconify



export const AuthInput = forwardRef(
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
      <div className="auth-input relative w-full flex flex-col gap-1.5">
        <div className="relative w-full">
          {/* Floating Label */}
          <label className="absolute -top-[0.4em] left-3 z-10 bg-gradient-to-b from-transparent via-white  to-white  font-normal leading-none text-black">
            {label}
          </label>

          {/* Input Box */}
          <div
            className={`flex h-[4.5em] w-full items-center rounded-md border border-black/10 shadow-lg bg-white px-3 text-black/50 transition-colors duration-200 focus-within:border-1 focus-within:text-brand ${
              error
                ? " border-red-500 focus-within:border-red-500"
                : "focus-within:border focus-within:border-brand"
            }`}
          >
            {icon && (
              <Icon
                icon={icon}
                className={`mr-3 w-[1.5em] h-[1.5em] shrink-0 ${error ? "text-red-500" : ""}`}
              />
            )}

            <input
              ref={ref}
              type={inputType}
              placeholder={placeholder}
              {...props}
              className={`w-full bg-transparent  font-light text-black/70 outline-none placeholder:text-black/35 ${
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
                  className="w-[1.5em] h-[1.5em]"
                />
              </button>
            )}
          </div>
        </div>

        {/* Validation Error Message */}
        {error && (
          <p className=" text-red-500 px-4 font-medium transition-all duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
