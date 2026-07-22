import { Link } from 'react-router';

import { twMerge } from 'tailwind-merge';



export default function BrandButton(props) {
  const baseStyles =
    'brand-button flex  items-center justify-center rounded-md bg-brand-gradient py-3 px-11  font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0';

  // ✅ Check for 'to' instead of Next.js 'href'
  // `to` may be a string or a react-router Partial<Path> object, so only
  // check for presence/truthiness here rather than restricting to strings.
  if (props.to) {
    const {
      to,
      children,
      className,
      disabled,
      onClick,
      ...linkProps
    } = props;

    const handleClick = (
      event,
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
        to={to}
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
