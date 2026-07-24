import AttachmentImage from "@/components/ui/AttachmentImage";
import BackButton from "@/components/ui/BackButton";
import BrandPill from "@/components/ui/BrandPill";
import NotFound from "@/components/ui/NotFound";
import data from "@/data/bookings.json"
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router';
import ReviewCard from "@/components/shared/cards/ReviewCard";
import BookingLocationMap from "@/components/ui/BookingLocationMap";
import BrandButton from "@/components/ui/BrandButton";
import Input from "@/components/ui/Input";
import InputModal from "@/components/shared/modals/InputModal";
import FeedbackModal from "@/components/shared/modals/FeedbackModal";
import SuccessModal from "@/components/shared/modals/SuccessModal";
import ConfirmationModal from "@/components/shared/modals/ConfirmationModal";
import DriverAssignmentModal from "@/components/shared/modals/DriverAssignmentModal";
import PaymentModal from "@/components/shared/modals/PaymentModal";


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

export default  function EarningDetailPage() {
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const booking = data.bookingDetails.find((item) => item.slug === bookingId);

  if (!booking) {
    return (
      <NotFound/>
    );
  }



  return (
    <div className=" booking-detail space-y-6">
      <div className="flex flex-wrap justify-between gap-3">
        <BackButton>Details</BackButton>
        {!booking.paid && (
          <BrandButton className="w-[25ch] px-5" onClick={() => setPaymentModalOpen(true)}>
              Mark as Paid
          </BrandButton>

        )}
        
    </div>
      
      <div className=" rounded-[20px]   items-center lg:items-stretch p-[0.75rem] gap-[0.75rem] w-full shadow-lg flex flex-col lg:flex-row">
        <div className="w-[27rem] max-w-full aspect-square overflow-hidden items-center rounded-2xl">
          <img
            src={booking.imageUrl}
            alt={booking.companyName}
            className="w-[25rem] aspect-square rounded-2xl object-cover"
          />
        </div>
       

        <div className="w-full space-y-3 ">
          <div className="flex flex-col sm:flex-row-reverse items-start justify-between gap-5">

            <div className="shrink-0 w-full sm:w-auto flex items-center gap-0.5 justify-between flex-row-reverse sm:flex-col text-right">
              <BrandPill>{booking.status}</BrandPill>
              { booking.status !== 'Pending' && (  
              <h2 className=" price font-black tracking-tight text-black">
                {booking.price}
              </h2>
              )}
            </div>

            <div>
              {role === 'carrier' ? (
                <Link
                  to={`/profile/${bookingId}`}
                  className="flex items-center gap-1"
                >
                  <img
                    src={booking.companyLogoUrl}
                    alt={booking.companyName}
                    className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover"
                  />
                  <div className="mt-2">
                    <h1 className=" font-bold leading-tight tracking-tight text-black">
                      {booking.companyName}
                    </h1>
                    <RatingRow
                      rating={booking.rating}
                      reviewCount={booking.reviewCount}
                    />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-1">
                  <img
                    src={booking.companyLogoUrl}
                    alt={booking.companyName}
                    className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover"
                  />
                  <div className="mt-2">
                    <h1 className=" font-bold leading-tight tracking-tight text-black">
                      {booking.companyName}
                    </h1>
                    <RatingRow
                      rating={booking.rating}
                      reviewCount={booking.reviewCount}
                    />
                  </div>
                </div>
              )}
            </div>

            
          </div>

          <div className="">
            {booking.status === "Reschedule" 
            ?
            <h2 className="mb-5  font-bold tracking-tight text-black">
              
                Reschedule Details
            </h2>
            : null}

            <div className="space-y-2 xl:space-y-3">
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

          <div className="space-y-2">
            <h2 className="mb-4  font-bold tracking-tight text-black">
              Permit:
            </h2>

            <div className="flex flex-wrap gap-5">
              {booking.permitImages.map((permit, index) => (
                <AttachmentImage
                  key={index}
                  src={permit}
                  alt={`Permit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="  font-bold tracking-tight text-black">
              Trailer Details:
            </h2>

            <div className="space-y-2">
              <p className="text-black/50">
                <span className="font-bold text-black">MC Number: </span>
                {booking.trailerDetails.mcNumber}
              </p>

              <p className="text-black/50">
                <span className="font-bold text-black">Dot Number: </span>
                {booking.trailerDetails.dotNumber}
              </p>

              <p className="text-black/50">
                <span className="font-bold text-black">
                  License Plate Number:{" "}
                </span>
                {booking.trailerDetails.licensePlateNumber}
              </p>

              <p className="text-black/50">
                <span className="font-bold text-black">
                  Registration Number:{" "}
                </span>
                {booking.trailerDetails.registrationNumber}
              </p>

              <p className="text-black/50">
                <span className="font-bold text-black">Vin Number: </span>
                {booking.trailerDetails.vinNumber}
              </p>

              <p className="leading-snug text-black/50">
                <span className="font-bold text-black">Description: </span>
                {booking.trailerDetails.description}
              </p>
            </div>
          </div>

          <div className="mt-8">
            { role === 'admin' && booking.escortCompany && (
                <div className="flex items-center gap-3">
                <img
                    src={booking.escortCompany.logoUrl}
                    alt={booking.escortCompany.name}
                    className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover"
                />
                <div className="mt-3">
                    <h1 className=" font-bold leading-tight tracking-tight text-black">
                    {booking.escortCompany.name}
                    </h1>
                    <RatingRow
                    rating={booking.escortCompany.rating}
                    reviewCount={booking.escortCompany.reviewCount}
                    />
                </div>
                </div>
            )}

            {role === 'admin' && !booking.escortCompany && (
              <BrandButton onClick={() => setAssignDriverOpen(true)}>
                Assign Driver
              </BrandButton>
            )}

              {booking.escortCompany?.drivers &&
            <h2 className="mt-8 font-bold tracking-tight text-black">
              Drivers:
            </h2>
                }
            {booking.reason &&
            <>
            <h2 className="mt-8 font-bold tracking-tight text-black">
              Reason:
            </h2>
            <p className=" text-black/50">
                {booking.reason}
              </p>
              </>
              }
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {booking.escortCompany?.drivers && booking.escortCompany.drivers.map((driver) => (
                <div
                  key={driver.name}
                  className="flex items-center gap-4 rounded-xl bg-white px-3 py-2 shadow-xl shadow-black/5"
                >
                  <img
                    src={driver.imageUrl}
                    alt={driver.name}
                    className="h-[4em] w-[4em] rounded-full object-cover"
                  />

                  <div className="min-w-0">
                    <h4 className="truncate  font-bold tracking-tight text-black">
                      {driver.name}
                    </h4>

                    <p className="  font-medium text-brand">
                      {driver.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        
          
          
        {booking.routeImageUrl && (
          <img
            src={booking.routeImageUrl}
            alt="Route"
            className="w-[40rem] aspect-square rounded-2xl object-cover"
          />
        )}

        {booking.latitude && booking.longitude && (
        <div className="w-[30rem] max-w-full aspect-square  items-center overflow-hidden rounded-2xl">

          <BookingLocationMap
          
            latitude={booking.latitude}
            longitude={booking.longitude}
            locationUrl={booking.locationUrl}
            title="Booking route location"
          />

        </div>
        )}
      </div>

      


      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        originalFare={booking.price}
        onSubmit={({ option, fare }) => {
          console.log("Marked as paid:", { option, fare });
          
          setPaymentModalOpen(false);
          navigate(`/earnings/${bookingId}`)
        }}
      />


    </div>
  );
}