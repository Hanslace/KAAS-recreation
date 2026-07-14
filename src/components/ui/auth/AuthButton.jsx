"use client";

import {Link} from "react-router";
import { ComponentPropsWithRef } from "react";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset"; // 1. Enforce strict button types globally here
};

type LinkButtonProps = {
  href: string;
  disabled?: boolean;
} & Omit<ComponentPropsWithRef<typeof Link>, "href" | "className" | "type">; // 2. Omit conflicting type definitions

type NormalButtonProps = {
  href?: never;
  disabled?: boolean;
} & Omit<ComponentPropsWithRef<"button">, "className" | "type">; // 3. Omit conflicting type definitions

type AuthButtonProps = BaseProps & (LinkButtonProps | NormalButtonProps);

export default function AuthButton({
  children,
  type = "button", // 4. This now perfectly matches the literal union type
  href,
  disabled,
  className = "",
  ...props
}: AuthButtonProps) {
  const baseStyles = `flex h-[7.5vh] w-full items-center justify-center rounded-xl bg-brand-gradient text-[1rem] font-bold text-white shadow-md transition duration-300 ${
    disabled
      ? "pointer-events-none opacity-50 shadow-none"
      : "hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer"
  } ${className}`;

  if (href) {
    const linkProps = props as Omit<
      ComponentPropsWithRef<typeof Link>,
      "href" | "className" | "type"
    >;

    return (
      <Link
        
        className={baseStyles}
        aria-disabled={disabled}
        {...linkProps}
        to={disabled ? "#" : href}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as Omit<ComponentPropsWithRef<"button">, "className" | "type">;

  return (
    <button
      type={type} // Error fully resolved
      disabled={disabled}
      className={baseStyles}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
