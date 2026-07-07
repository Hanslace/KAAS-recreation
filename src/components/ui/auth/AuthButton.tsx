"use client";

import Link from "next/link";
import { ComponentPropsWithRef } from "react";

type BaseProps = {
  children: React.ReactNode;
};

// Extends native link or button props depending on the presence of an href
type AuthButtonProps = BaseProps &
  (
    | ({ href: string; disabled?: boolean } & ComponentPropsWithRef<typeof Link>)
    | ({ href?: never; disabled?: boolean } & ComponentPropsWithRef<"button">)
  );

export default function AuthButton({
  children,
  type = "button",
  href,
  disabled,
  className = "",
  ...props
}: AuthButtonProps) {
  // Shared structural, gradient, hover, active, and state styles
  const baseStyles = `flex h-[7.5vh] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand to-brand-dark text-sub-text font-bold text-white shadow-md transition duration-300 ${
    disabled
      ? "pointer-events-none opacity-50 shadow-none"
      : "hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer"
  } ${className}`;

  // Renders Next.js Link layout if href is passed down
  if (href) {
    return (
      <Link 
        href={disabled ? "#" : href} 
        className={baseStyles} 
        {...(props as ComponentPropsWithRef<typeof Link>)}
      >
        {children}
      </Link>
    );
  }

  // Fallback to normal HTML form button execution block
  return (
    <button
      type={type}
      disabled={disabled}
      className={baseStyles}
      {...(props as ComponentPropsWithRef<"button">)}
    >
      {children}
    </button>
  );
}
