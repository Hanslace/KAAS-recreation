'use client';

import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';

type BrandButtonProps = {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
} & Omit<ComponentPropsWithRef<typeof Link>, 'href' | 'className'>;

export default function BrandButton({
  href,
  children,
  disabled = false,
  className = '',
  ...props
}: BrandButtonProps) {
  const baseStyles = `flex h-fit px-[4rem] py-[1.5rem] w-full items-center justify-center rounded-xl bg-brand-gradient text-[1rem] font-bold text-white shadow-md transition duration-300 ${
    disabled
      ? 'pointer-events-none opacity-50 shadow-none'
      : 'hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer'
  } ${className}`;

  return (
    <Link
      href={disabled ? '#' : href}
      className={baseStyles}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Link>
  );
}