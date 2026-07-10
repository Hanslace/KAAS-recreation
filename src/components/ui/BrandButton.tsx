'use client';

import Link from 'next/link';
import type {
  ComponentPropsWithoutRef,
  MouseEvent,
  ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

type CommonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type LinkButtonProps = CommonProps & {
  href: string;
} & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    'href' | 'children' | 'className'
  >;

type NativeButtonProps = CommonProps & {
  href?: never;
} & Omit<
    ComponentPropsWithoutRef<'button'>,
    'children' | 'className' | 'disabled'
  >;

export type BrandButtonProps = LinkButtonProps | NativeButtonProps;

export default function BrandButton(props: BrandButtonProps) {
  const baseStyles =
    'flex h-[3.25rem] items-center justify-center rounded-xl bg-brand-gradient px-6 text-[0.95rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0';

  if ('href' in props && typeof props.href === 'string') {
    const {
      href,
      children,
      className,
      disabled,
      onClick,
      ...linkProps
    } = props;

    const handleClick = (
      event: MouseEvent<HTMLAnchorElement>,
    ) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    return (
      <Link
        href={href}
        {...linkProps}
        onClick={handleClick}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : linkProps.tabIndex}
        className={twMerge(
          baseStyles,
          disabled && 'pointer-events-none opacity-50',
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    disabled,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={twMerge(baseStyles, className)}
    >
      {children}
    </button>
  );
}