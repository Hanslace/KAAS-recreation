'use client';

import BrandButton from '@/components/ui/BrandButton';



export default function PlanCard({
  title,
  billingPeriod,
  price,
  description,
  features,
  href,
  buttonText = 'Edit Now',
  disabled = false,
}) {
  return (
    <div className="w-full rounded-[1.25rem] bg-white px-6 py-7 shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:px-8">
      {/* Top section */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[1.8rem] font-black leading-tight text-brand">
            {title}
          </h3>

          <p className="mt-1 text-[1.15rem] font-black text-black">
            {billingPeriod}
          </p>
        </div>

        <div className="flex gap-2 shrink-0 items-start text-brand">
          <span className="mt-4 text-[2rem] font-black leading-none">
            $
          </span>

          <span className="text-[6rem] font-black leading-[0.8] tracking-tight">
            {price}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-[33rem] text-[0.95rem] leading-6 text-gray-500">
        {description}
      </p>

      {/* Divider */}
      <div className="mx-auto my-6 h-px w-[70%] bg-brand/20" />

      {/* Features */}
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li
            key={`${feature}-${index}`}
            className="flex items-start gap-3 text-[0.8rem] lg:text-[0.95rem] leading-6 text-black"
          >
            <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="mx-auto mt-8 w-full max-w-[25rem]">
        <BrandButton
          to={href}
          disabled={disabled}
          className="h-[2.9rem] aspect-auto rounded-lg p-0 text-[0.75rem] md:h-[2.9rem] md:aspect-auto md:p-0 md:text-[0.75rem]"
        >
          {buttonText}
        </BrandButton>
      </div>
    </div>
  );
}