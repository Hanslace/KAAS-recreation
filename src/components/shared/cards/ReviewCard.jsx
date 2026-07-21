import { Icon } from "@iconify/react";

export default function ReviewCard({
  logoUrl,
  companyName,
  rating = 5,
  title,
  review,
}) {
  return (
    <div className="rounded-[20px] p-[1.5rem] gap-[0.75rem] w-full shadow-lg flex">
      <img
        src={logoUrl}
        alt={companyName}
        className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover shrink-0"
      />
      <div className="space-y-[1em]">
        <h3 className="font-bold leading-tight tracking-tight text-black">
          {companyName}
        </h3>
        <div className="flex items-center gap-0.5 -mt-2 text-yellow-400">
          {[...Array(rating)].map((_, index) => (
            <Icon key={index} icon="solar:star-bold" className="h-[1.5em] w-[1.5em]" />
          ))}
        </div>
        <div className="space-y-[0.5em]">
          <h4 className="font-bold leading-tight tracking-tight text-black">
            {title}
          </h4>
          <span className="review text-black/50">{review}</span>
        </div>
      </div>
    </div>
  );
}