import { Link } from 'react-router';
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

// ✅ Updated to explicitly use 'to' instead of Next.js 'href'
type LinkButtonProps = CommonProps & {
  to: string; 
} & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    'to' | 'children' | 'className'
  >;

type NativeButtonProps = CommonProps & {
  to?: never;
} & Omit<
    ComponentPropsWithoutRef<'button'>,
    'children' | 'className' | 'disabled'
  >;

export type BrandButtonProps = LinkButtonProps | NativeButtonProps;

export default function BrandButton(props: BrandButtonProps) {
  const baseStyles =
    'flex h-[3.25rem] items-center justify-center rounded-xl bg-brand-gradient px-6 text-[0.95rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0';

  // ✅ Check for 'to' instead of Next.js 'href'
  if ('to' in props && typeof props.to === 'string') {
    const {
      to,
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
        {...linkProps}
        to={to} // ✅ Keep 'to' placed AFTER the spread to prevent typescript syntax overwrites
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
