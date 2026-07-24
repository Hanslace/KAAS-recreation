import { Icon } from "@iconify/react";
import EditDeleteActions from "@/components/ui/EditDeleteActions";

export default function ReviewCard({
  logoUrl,
  companyName,
  rating = 5,
  title,
  review,
  mine = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="review-card relative rounded-[20px] p-[1.5rem] gap-[0.75rem] w-full shadow-lg flex">
      {!mine && (
        <img
          src={logoUrl}
          alt={companyName}
          className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover shrink-0"
        />
      )}

      <div className="space-y-[1em] w-full">
        {!mine && (
          <h3 className="font-bold heading leading-tight tracking-tight text-black">
            {companyName}
          </h3>
        )}

        <div className={`flex items-center gap-0.5 text-yellow-400 ${mine ? '' : '-mt-2'}`}>
          {[...Array(rating)].map((_, index) => (
            <Icon key={index} icon="solar:star-bold" className="h-[1.5em] w-[1.5em]" />
          ))}
        </div>

        <div className="space-y-[0.5em] pr-[5em]">
          <h4 className="sub-heading font-bold leading-tight tracking-tight text-black">
            {title}
          </h4>
          <span className=" text-black/50">{review}</span>
        </div>
      </div>

      {mine && (
        <div className="absolute right-5 top-5">
          <EditDeleteActions
            label="review"
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      )}
    </div>
  );
}