import { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import BrandButton from "@/components/ui/BrandButton";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router";

const service = {
  id: 1,
  companyName: "Patriot Escort Services",
  companyLogoUrl: "/images/company-logo-2.jpg",
  rating: 4.8,
  reviewCount: 124,
  distanceAway: "2.5 km away",
  description:
    "Patriot Escort Services is a U.S.-based company that provides professional pilot car and escort vehicle services for oversize and over-dimensional freight shipments. The firm supports trucking and logistics companies by ensuring compliance with state and federal transport regulations and promoting roadway safety during the movement of heavy or wide loads.",
  fares: { perDay: "$600", perMile: "$2.50", overnight: "$800" },
  paymentMethod: "Cash",
  images: ["/images/car.jpg", "/images/car.jpg", "/images/car.jpg", "/images/car.jpg"],
};

export default function Page() {
  const [activeImage, setActiveImage] = useState(service.images[0]);
  const path = useLocation().pathname

  return (
    <div className="space-y-6">
      <BackButton>Back</BackButton>

      <div className="flex flex-col flex-1 sm:flex-row gap-6 escort-booking-detail">
        {/* Left: image gallery */}
        <div className="w-full sm:w-1/2 px-10 sm:px-0 space-y-4">
          <img
            src={activeImage}
            alt={service.companyName}
            className="w-full aspect-[9/5] object-cover rounded-xl"
          />

          <div className="grid grid-cols-3 gap-4  sm:px-10">
            {service.images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(img)}
                className="overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <img
                  src={img}
                  alt={`${service.companyName} view ${i + 1}`}
                  className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                />
              </button>
            ))}
          </div>
          
        </div>

        {/* Right: details */}
        <div className="w-full sm:w-1/2 sm:px-[1.5rem] space-y-[0.8em]">
          {/* Company + logo */}
          <div className="gap-[0.75rem] flex items-center">
            <img
              src={service.companyLogoUrl}
              alt={service.companyName}
              className="h-[3em] w-[3em] rounded-full border border-gray-200 object-cover shrink-0"
            />
            <h3 className="main-heading font-bold leading-tight tracking-tight text-black">
              {service.companyName}
            </h3>
          </div>

          {/* Rating + distance */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-[0.75rem]">
              <div className="flex items-center gap-0.5 text-yellow-400">
                {[...Array(Math.round(service.rating))].map((_, index) => (
                  <Icon key={index} icon="solar:star-bold" className="h-[1.25em] w-[1.25em]" />
                ))}
              </div>
              <div className="flex gap-[0.5rem] items-center">
                <span className="font-bold text-black">{service.rating} |</span>
                <span className="text-brand underline">{service.reviewCount} Reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-black">
              <Icon icon="boxicons:location-filled" className="w-[1.25em] h-[1.25em] text-brand" />
              <span>{service.distanceAway}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-black/50 leading-relaxed">{service.description}</p>

          {/* Fares */}
          
            <div className="flex items-start gap-2">
              <Icon icon="solar:wallet-bold" className="w-[1.25em] h-[1.25em] mt-1 text-brand" />
              <div className="space-y-1">
                <span className="font-bold text-black">Fares Info:</span>
                <div className="flex flex-wrap gap-x-6 gap-y-1  text-black/70">
                  <span><span className="font-bold text-black">Per Day:</span> {service.fares.perDay}</span>
                  <span><span className="font-bold text-black">Per Mile:</span> {service.fares.perMile}</span>
                  <span><span className="font-bold text-black">Overnight:</span> {service.fares.overnight}</span>
                </div>
              </div>
            </div>
            

          {/* Payment method */}
          <div className="flex items-center gap-2">
            <Icon icon="solar:card-bold" className="w-[1.25em] h-[1.25em] text-brand" />
            <span className="font-bold text-black">Payment Method:</span>
            <span className="text-black/70">{service.paymentMethod}</span>
          </div>

          {/* Book Now */}
          <BrandButton type="button" to={`${path}/book`} className="px-20  w-[20em]">
            Book Now
          </BrandButton>
        </div>
      </div>

      
    </div>
  );
}