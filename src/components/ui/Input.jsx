import { useState, forwardRef } from "react";
import { Icon } from "@iconify/react"; // Import Iconify

export const Input = forwardRef(
  (
    {
      label,
      placeholder,
      type = "text",
      icon,
      showToggle = false,
      error,
      as: Component = "input", // Defaults to standard "input" if not provided
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showToggle ? (showPassword ? "text" : "password") : type;
    const isTextarea = Component === "textarea";

    return (
      <div className="auth-input relative w-full flex flex-col gap-1.5">
        {/* Added "has-[:focus]" wrapper to style the label dynamically when the input is active */}
        <div className="relative w-full has-[:focus]:text-black">
          {/* Floating Label */}
          <label 
            className={`absolute -top-[0.4em] left-[1.75em] px-1 z-10 bg-gradient-to-b from-transparent via-[20%] via-white to-white font-normal leading-none transition-colors duration-200 ${
              error ? "text-red-500!" : ""
            }`}
          >
            {label}
          </label>

          {/* Input/Textarea Container Box */}
          <div
            className={`flex w-full items-center rounded-[0.6em] border border-black/10 shadow-lg bg-white px-[1.5em] text-black/50 transition-colors duration-200 focus-within:border-1 focus-within:text-brand ${
              isTextarea ? "min-h-[6em] py-[1.2em] items-start" : "h-[4.5em]"
            } ${
              error
                ? "border-red-500 focus-within:border-red-500"
                : "focus-within:border focus-within:border-brand"
            }`}
          >
            {icon && (
              <Icon
                icon={icon}
                className={`mr-[1.5em] w-[1.5em] h-[1.5em] shrink-0 ${
                  error ? "text-red-500" : ""
                } ${isTextarea ? "mt-[0.1em]" : ""}`}
              />
            )}

            {/* Conditionally render explicit built-in tags to safely preserve React internal Ref bindings */}
            {isTextarea ? (
              <textarea
                ref={ref}
                placeholder={placeholder}
                {...props}
                className="w-full bg-transparent font-light text-black/70 outline-none placeholder:text-black/35 resize-y min-h-[4em]"
              />
            ) : (
              <input
                ref={ref}
                type={inputType}
                placeholder={placeholder}
                {...props}
                className={`w-full bg-transparent font-light text-black/70 outline-none placeholder:text-black/35 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  inputType === "password"
                    ? "[:not(:placeholder-shown)]:tracking-[0.3em]"
                    : ""
                }`}
              />
            )}

            {showToggle && !isTextarea && (
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
          <p className="text-red-500 px-4 font-medium transition-all duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;