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

export default  function BookingDetailPage() {
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [reasonAction, setReasonAction] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [feedbackSuccessOpen, setFeedbackSuccessOpen] = useState(false);
  const [deleteReviewOpen, setDeleteReviewOpen] = useState(false);
  const [myReviewDeleted, setMyReviewDeleted] = useState(false);
  const [fare, setFare] = useState("");
  const [fareSuccessOpen, setFareSuccessOpen] = useState(false);
  const [assignDriverOpen, setAssignDriverOpen] = useState(false);
  const [driverAssignSuccessOpen, setDriverAssignSuccessOpen] = useState(false);

  const booking = data.bookingDetails.find((item) => item.slug === bookingId);

  if (!booking) {
    return (
      <NotFound/>
    );
  }

  const handleReasonSubmit = async () => {
    setReasonAction(null);
    navigate("/bookings?tab=cancelled");
  };

  const handleFeedbackSubmit = async () => {
    setFeedbackOpen(false);
    setFeedbackSuccessOpen(true);
  };

  const handleDeleteReviewConfirm = async () => {
    setMyReviewDeleted(true);
    setDeleteReviewOpen(false);
  };

  return (
    <div className=" booking-detail space-y-6">
      <div className="flex flex-wrap justify-between gap-3">
        <BackButton>Details</BackButton>
        {role !== 'admin' && (
            <BrandButton onClick={() => window.location.href = `tel:${booking.phone}`}>
                Call Now
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
                  to={`/bookings/profile/${bookingId}`}
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
          {role === 'carrier' && (
 
            <div className="py-3">
                {booking.status === 'Pending' && (
                <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
                    <BrandButton onClick={() => navigate("/bookings?tab=upcoming")} className="w-[25ch]">
                    Accept for {booking.price}
                    </BrandButton>

                    <BrandButton
                    type="button"
                    onClick={() => navigate(-1)}
                    className="bg-black w-[25ch]"
                    >
                    Reject
                    </BrandButton>
                </div>
                )}

              
                {booking.status === 'Upcoming' && (
                <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
                    <BrandButton onClick={() => setReasonAction('cancel')} className="w-[25ch]">
                    Cancel Booking
                    </BrandButton>

                    <BrandButton
                    type="button"
                    onClick={() => navigate(`/bookings/reschedule/${bookingId}`)}
                    className="bg-black w-[25ch]"
                    >
                    Reschedule Booking
                    </BrandButton>
                </div>
                )}

                {booking.status === 'Completed' && (
                <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
                    <BrandButton onClick={() => { setIsEditingReview(false); setFeedbackOpen(true); }} className="w-[25ch]">
                    Write a Review
                    </BrandButton>

                </div>
                )}
             
            </div>
          )}

          {role === 'pilot-car-manager' && (
 
            <div className="py-3">
                {booking.status === 'Pending' && (
                <div className="min-[26.56rem]:mx-0 mx-auto max-w-[50ch] w-full  flex flex-col gap-6">
                    <h2 className="font-bold tracking-tight text-black">Fare:</h2>

                    <Input
                      label="Set Fare"
                      placeholder="$550"
                      type="number"
                      value={fare}
                      onChange={(event) => setFare(event.target.value)}
                    />

                    <BrandButton onClick={() => setFareSuccessOpen(true)} className="w-full">
                      Submit
                    </BrandButton>
                </div>
                )}

                {booking.status === 'Unassigned' && (
                <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
                    <BrandButton
                    type="button"
                    onClick={() => setAssignDriverOpen(true)}
                    className="max-w-[50ch] w-full "
                    >
                    Assign Driver
                    </BrandButton>
                </div>
                )}

                {booking.status === 'Upcoming' && (
                <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
                    <BrandButton onClick={() => setReasonAction('cancel')} className="w-[25ch]">
                    Cancel Booking
                    </BrandButton>

                    <BrandButton
                    type="button"
                    onClick={() => navigate(`/bookings/reschedule/${bookingId}`)}
                    className="bg-black w-[25ch]"
                    >
                    Reschedule Booking
                    </BrandButton>
                </div>
                )}

                {booking.status === 'Completed' && (
                <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
                    <BrandButton onClick={() => { setIsEditingReview(false); setFeedbackOpen(true); }} className="w-[25ch]">
                    Write a Review
                    </BrandButton>

                </div>
                )}
             
            </div>
          )}
          
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

      {booking.status === "Completed" && (
        <div className="space-y-3">
          <h2 className="font-bold text-black tracking-tight">Rating and Reviews</h2>

          {!myReviewDeleted && (
            <ReviewCard
              logoUrl={booking.companyLogoUrl}
              companyName="Patriot Escort Services"
              rating={5}
              mine
              title="Great Work"
              review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              onEdit={() => { setIsEditingReview(true); setFeedbackOpen(true); }}
              onDelete={() => setDeleteReviewOpen(true)}
            />
          )}

          <ReviewCard
            logoUrl={booking.companyLogoUrl}
            companyName="Fast Track Transport Inc."
            rating={5}
            title="Great Work"
            review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      )}

      <InputModal
        open={reasonAction !== null}
        onClose={() => setReasonAction(null)}
        onSubmit={handleReasonSubmit}
        inputProps={{ as: "textarea", maxLength: 500, label: "Reason", className: "h-[12rem]" }}
      />

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
        title="Write a Review"
        placeholder="Write your review"
        buttonText="Submit"
      />

      <SuccessModal
        open={feedbackSuccessOpen}
        title="Successfully!"
        description={
          isEditingReview
            ? "Your rating & reviews has been updated successfully."
            : "Your rating & reviews has been submitted successfully."
        }
        buttonText="Done"
        onDone={() => setFeedbackSuccessOpen(false)}
      />

      <SuccessModal
        open={fareSuccessOpen}
        title="Successfully!"
        description="Your payment has been successfully submitted for this booking."
        buttonText="Done"
        onDone={() => navigate("/bookings?tab=unassigned")}
      />

      <DriverAssignmentModal
        open={assignDriverOpen}
        onClose={() => setAssignDriverOpen(false)}
        onAssign={(assignments) => {
          console.log("Assigned drivers:", assignments);
          setDriverAssignSuccessOpen(true);
        }}
      />

      <SuccessModal
        open={driverAssignSuccessOpen}
        title="Successfully!"
        description="You have successfully assigned a driver."
        buttonText="Done"
        onDone={() => setDriverAssignSuccessOpen(false)}
      />

      <ConfirmationModal
        open={deleteReviewOpen}
        icon="lucide:trash-2"
        title="Delete!"
        description="Are you sure you want to delete your review?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setDeleteReviewOpen(false)}
        onConfirm={handleDeleteReviewConfirm}
      />
    </div>
  );
}