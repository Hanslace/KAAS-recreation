import BackButton from "@/components/ui/BackButton";
import BrandPill from "@/components/ui/BrandPill";
import NotFound from "@/components/ui/NotFound";
import data from "@/data/data.json"
import { Icon } from "@iconify/react";
import { useParams } from 'react-router';
import ReviewCard from "@/components/shared/cards/ReviewCard";


function RatingRow({
  rating,
  reviewCount,
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <Icon key={index} icon="solar:star-bold" className="h-[0.8em] w-[0.8em]" />
        ))}
      </div>

      <span className="font-bold text-black">{rating} |</span>

      <span className="text-brand "> {reviewCount} Reviews</span>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-1">
      <Icon icon={icon} className=" h-[1.25em] w-[1.25em] shrink-0 text-brand" />

      <p className=" leading-snug text-black/50">
        <span className="font-bold text-black">{label}: </span>
        {value}
      </p>
    </div>
  );
}

export default  function EscortProfilePage() {
  const { escortId } = useParams();

  const booking = data.bookingDetails.find((item) => item.slug === escortId);

  if (!booking) {
    return (
      <NotFound/>
    );
  }


  return (
    <div className="booking-detail space-y-6">
      <div className="flex flex-wrap justify-between gap-3">
        <BackButton>Profile</BackButton>
      </div>

      <div className="rounded-[20px] items-center lg:items-stretch p-[0.75rem] gap-[0.75rem] w-full shadow-lg flex flex-col lg:flex-row">
        <div className="w-[27rem] max-w-full aspect-square overflow-hidden items-center rounded-2xl">
          <img
            src={booking.imageUrl}
            alt={booking.companyName}
            className="w-[25rem] aspect-square rounded-2xl object-cover"
          />
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center gap-1">
            <img
              src={booking.escortCompany.logoUrl}
              alt={booking.escortCompany.name}
              className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover"
            />
            <div className="mt-2">
              <h1 className="font-bold leading-tight tracking-tight text-black">
                {booking.escortCompany.name}
              </h1>
              <RatingRow
                rating={booking.escortCompany.rating}
                reviewCount={booking.escortCompany.reviewCount}
              />
            </div>
          </div>

          <div className="space-y-2">
            <DetailRow
              icon="ph:scroll"
              label="MC Number"
              value={booking.trailerDetails.mcNumber}
            />

            <DetailRow
              icon="ph:scroll"
              label="Dot Number"
              value={booking.trailerDetails.dotNumber}
            />

            <DetailRow
              icon="ph:scroll"
              label="License Plate Number"
              value={booking.trailerDetails.licensePlateNumber}
            />
          </div>

          <div className="flex flex-wrap gap-[1em]">
            <div className="space-y-2">
              <h3 className="font-bold tracking-tight text-black">Fares:</h3>

              <div className="flex flex-wrap gap-2">
                {booking.fares.split(',').map((fare) => (
                  <BrandPill key={fare}>{fare.trim()}</BrandPill>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold tracking-tight text-black">Payment Method:</h3>

              <BrandPill className="w-fit">{booking.paymentMethod}</BrandPill>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-black tracking-tight">Rating & Review</h2>

        <ReviewCard
          logoUrl={booking.companyLogoUrl}
          companyName="ABC Logistics LLC"
          rating={5}
          title="Great Work"
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />

        <ReviewCard
          logoUrl={booking.companyLogoUrl}
          companyName="Fast Track Transport Inc"
          rating={5}
          title="Great Work"
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </div>
    </div>
  );
}