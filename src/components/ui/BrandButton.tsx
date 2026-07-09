'use client';

import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge'; // 1. Import twMerge

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
  
  // 2. Wrap your styles with twMerge(...)
  const baseStyles = twMerge(
    `flex h-fit text-[0.875rem] aspect-[3/1] p-[0.8rem] md:text-[1rem] md:aspect-[5/1] md:p-[1.35rem] w-full items-center justify-center rounded-xl bg-brand-gradient  tracking-wide font-bold text-white shadow-md transition duration-300 ${
      disabled
        ? 'pointer-events-none opacity-50 shadow-none'
        : 'hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer'
    }`,
    className // Passed as a second argument so it overrides the base styles
  );

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
