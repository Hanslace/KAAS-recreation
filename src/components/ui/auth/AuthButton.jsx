"use client";

import {Link} from "react-router";
import { ComponentPropsWithRef } from "react";


export default function AuthButton({
  children,
  type = "button", // 4. This now perfectly matches the literal union type
  href,
  disabled,
  className = "",
  ...props
}) {
  const baseStyles = `brand-button flex  items-center justify-center rounded-md bg-brand-gradient py-3 px-11  font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95  ${
    disabled
      ? "pointer-events-none opacity-50 shadow-none"
      : "hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer"
  } ${className}`;

  if (href) {
    const linkProps = props;

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

  const buttonProps = props;

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
