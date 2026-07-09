import BackButton from "@/components/ui/BackButton";
import data from "@/data/data.json"
import { Icon } from "@iconify/react";


type BookingDetailPageProps = {
  params: {
    slug: string;
  };
};

function RatingRow({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <Icon key={index} icon="solar:star-bold" className="h-3 w-3" />
        ))}
      </div>

      <span className="font-bold text-black">{rating}</span>

      <span className="text-brand underline">| {reviewCount} Reviews</span>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon icon={icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand" />

      <p className="text-[0.95rem] leading-snug text-black/50">
        <span className="font-bold text-black">{label}: </span>
        {value}
      </p>
    </div>
  );
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { slug } = await params;
  
  const booking = data.bookingDetails.find((item) => item.slug === slug);

  if (!booking) {
    return (
      <div className="p-6">
        <BackButton href="/bookings">Details</BackButton>

        <div className="mt-6 rounded-2xl p-5 shadow-lg">
          {/* Render the slug inside curly braces */}
          <h1 className="text-2xl font-bold text-black">
            Booking not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackButton href="/bookings"> Details</BackButton>
      <div className=" xl:h-[calc(80vh-11rem)] rounded-2xl mt-[1rem]  items-center xl:items-stretch p-[1.25rem] gap-[2rem] xl:w-full h-full shadow-lg flex flex-col xl:flex-row">
        <div className="w-[25rem] max-w-full aspect-square overflow-hidden items-center rounded-2xl">
          <img
            src={booking.imageUrl}
            alt={booking.companyName}
            className="w-[25rem] aspect-square rounded-2xl object-cover"
          />
        </div>
       

        <div className="w-full xl:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={booking.companyLogoUrl}
                  alt={booking.companyName}
                  className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                />

                <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-black">
                  {booking.companyName}
                </h1>
              </div>

              <div className="ml-14 mt-1">
                <RatingRow
                  rating={booking.rating}
                  reviewCount={booking.reviewCount}
                />
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="inline-flex rounded-full border border-brand/30 bg-[#F5E9CF] px-4 py-1.5 text-[0.75rem] font-medium text-brand">
                {booking.status}
              </span>

              <h2 className="mt-3 text-[2rem] font-black tracking-tight text-black">
                {booking.price}
              </h2>
            </div>
          </div>

          <div className="">
            {booking.status === "Reschedule" 
            ?
            <h2 className="mb-5 text-[1.45rem] font-bold tracking-tight text-black">
              
                Reschedule Details
            </h2>
            : null}

            <div className="space-y-4">
              <DetailRow
                icon="uil:calendar"
                label="Date & Time"
                value={booking.dateTime}
              />

              {booking.description
              ?

              <DetailRow
                icon="solar:document-text-bold-duotone"
                label="Description"
                value={booking.description}
              />
                : null}

              {booking.previousDateTime  
              ?
              <DetailRow
                icon="uil:calendar"
                label="Previous Date & Time"
                value={booking.previousDateTime }
              />
              : null}
              

              <DetailRow
                icon="boxicons:location"
                label="Pickup"
                value={booking.pickupLocation}
              />

              <DetailRow
                icon="boxicons:location"
                label="Drop"
                value={booking.dropoffLocation}
              />

              <DetailRow
                icon="solar:route-bold-duotone"
                label="Total Mile"
                value={booking.totalMile}
              />

              <DetailRow
                icon="solar:bill-list-bold-duotone"
                label="Fares"
                value={booking.fares}
              />

              <DetailRow
                icon="solar:transfer-horizontal-bold-duotone"
                label="Number of Escorts"
                value={booking.numberOfEscorts}
              />

              <DetailRow
                icon="solar:map-point-bold-duotone"
                label="Escort 1 Place"
                value={booking.escort1Place}
              />

              <DetailRow
                icon="solar:map-point-bold-duotone"
                label="Escort 2 Place"
                value={booking.escort2Place}
              />

              <DetailRow
                icon="solar:wallet-money-bold-duotone"
                label="Payment Method"
                value={booking.paymentMethod}
              />
            </div>
          </div>

          <div className="mt-7">
            <h2 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
              Permit:
            </h2>

            <div className="flex flex-wrap gap-5">
              {booking.permitImages.map((permit, index) => (
                <img
                  key={index}
                  src={permit}
                  alt={`Permit ${index + 1}`}
                  className="h-24 w-24 rounded-2xl object-cover shadow-lg shadow-black/10"
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-[1.45rem] font-bold tracking-tight text-black">
              Trailer Details:
            </h2>

            <div className="space-y-4">
              <p className="text-[0.95rem] text-black/50">
                <span className="font-bold text-black">MC Number: </span>
                {booking.trailerDetails.mcNumber}
              </p>

              <p className="text-[0.95rem] text-black/50">
                <span className="font-bold text-black">Dot Number: </span>
                {booking.trailerDetails.dotNumber}
              </p>

              <p className="text-[0.95rem] text-black/50">
                <span className="font-bold text-black">
                  License Plate Number:{" "}
                </span>
                {booking.trailerDetails.licensePlateNumber}
              </p>

              <p className="text-[0.95rem] text-black/50">
                <span className="font-bold text-black">
                  Registration Number:{" "}
                </span>
                {booking.trailerDetails.registrationNumber}
              </p>

              <p className="text-[0.95rem] text-black/50">
                <span className="font-bold text-black">Vin Number: </span>
                {booking.trailerDetails.vinNumber}
              </p>

              <p className="text-[0.95rem] leading-snug text-black/50">
                <span className="font-bold text-black">Description: </span>
                {booking.trailerDetails.description}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <img
                src={booking.escortCompany.logoUrl}
                alt={booking.escortCompany.name}
                className="h-11 w-11 rounded-full border border-gray-200 object-cover"
              />

              <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-black">
                {booking.escortCompany.name}
              </h2>
            </div>

            <div className="ml-14 mt-1">
              <RatingRow
                rating={booking.escortCompany.rating}
                reviewCount={booking.escortCompany.reviewCount}
              />
            </div>
              {booking.escortCompany.drivers &&
            <h3 className="mt-8 text-[1.25rem] font-bold tracking-tight text-black">
              Drivers:
            </h3>
}
                          {booking.reason &&
                          <>
            <h3 className="mt-8 text-[1.25rem] font-bold tracking-tight text-black">
              Reason:
            </h3>
            <p className="text-[0.95rem] text-black/50">
                {booking.reason}
              </p>
              </>
}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
              {booking.escortCompany.drivers && booking.escortCompany.drivers.map((driver) => (
                <div
                  key={driver.name}
                  className="flex items-center gap-4 rounded-3xl bg-white px-6 py-4 shadow-xl shadow-black/5"
                >
                  <img
                    src={driver.imageUrl}
                    alt={driver.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div className="min-w-0">
                    <h4 className="truncate text-[1rem] font-bold tracking-tight text-black">
                      {driver.name}
                    </h4>

                    <p className="mt-1 text-[0.75rem] font-medium text-brand">
                      {driver.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          
        {booking.routeImageUrl && (
        <div className="w-[40rem] max-w-full aspect-square  items-center overflow-hidden rounded-2xl">
          <img
            src={booking.routeImageUrl}
            alt="Route"
            className="w-[40rem] aspect-square rounded-2xl object-cover"
          />
        </div>
        )}
    
      </div>
    </div>
  );
}