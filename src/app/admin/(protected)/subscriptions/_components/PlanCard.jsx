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
    <div className="plan-card w-full rounded-[15px] bg-white p-4 shadow-[0_12px_28px_rgba(0,0,0,0.12)] space-y-3">
      {/* Top section */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="heading font-black leading-tight text-brand">
            {title}
          </h3>

          <p className="mt-1  font-black text-black">
            {billingPeriod}
          </p>
        </div>

        <div className="flex gap-2 shrink-0 items-start text-brand">
          <span className="mt-4 heading font-black leading-none">
            $
          </span>

          <span className="price font-black leading-[0.8] tracking-tight">
            {price}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className=" max-w-[33rem]   text-gray-500">
        {description}
      </p>

      {/* Divider */}
      <div className="mx-auto  h-px w-[70%] bg-brand/20" />

      {/* Features */}
      <ul className="space-y-0.5">
        {features.map((feature, index) => (
          <li
            key={`${feature}-${index}`}
            className="flex items-start gap-2  leading-6 text-black"
          >
            <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-gray-500" />

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="flex justify-center">
        <BrandButton
          to={href}
          disabled={disabled}
          className="h-[3em] aspect-[530/60]  max-w-full   "
        >
          {buttonText}
        </BrandButton>
      </div>
    </div>
  );
}