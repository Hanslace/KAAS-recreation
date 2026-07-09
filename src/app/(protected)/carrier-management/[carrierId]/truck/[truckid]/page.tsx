import BackButton from "@/components/ui/BackButton"
import BrandButton from "@/components/ui/BrandButton";
import BrandPill from "@/components/ui/BrandPill";
import Image from "next/image";
import VehicleCard from "@/components/shared/VehicleCard"; 
import vehicles from '@/data/trucks.json';
import bookings from '@/data/data.json'
import carrierData from "@/data/carriers.json";
import { notFound } from "next/navigation";
import BookingsGrid from "@/components/shared/BookingsGrid";

// Assuming VehicleCard is stored here

interface PageProps {
  params: Promise<{ carrierId: string }>;
}

export default async function Page({ params }: PageProps) {
  // Correctly await the params promise to extract your ID
  const { carrierId } = await params;
  
  const currentCarrier = carrierData.tableData.find(
    (item) => item.slug === carrierId
  );

  // 3. Fallback to 404 page if someone enters an invalid URL slug
  if (!currentCarrier) {
    notFound();
  }

  const status = currentCarrier.status;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-10 justify-between">
        <BackButton href="/carrier-management">
        Details 
        </BackButton>
        
      </div>
      <div className=" xl:h-[calc(80vh-11rem)] overflow-y-auto rounded-2xl mt-[1.5rem]  p-[1.5rem] gap-[2rem] w-full h-full shadow-lg ">
        
            <h2 className="text-[1.75rem] font-bold text-black tracking-tight">
              Truck Info
            </h2>
       

        <div className="flex gap-3 py-[1.5rem] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-100">
     
          <div className="flex flex-col items-center justify-center ">
            <Image
              src="/images/company-logo.png"
              alt="ABC Logistics LLC"
              width={520}
              height={220}
              priority
              className="h-auto w-full rounded-full max-h-[6rem] object-contain"
            />
        </div>

          <div className="flex flex-col gap-2">
              <h3 className="text-[1.75rem] font-bold text-black tracking-tight">
                ABC Logistics LLC
              </h3>
              <p className="tracking-tight text-black/50"> 
                abcllogisticsas@gmail.com
              </p>
              <p className="tracking-tight text-black/50"> 
                0321 3213233
              </p>

          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          <div className=" py-[1.5rem] px-[0.5rem]  relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-100">
              <p className="tracking-tight text-black font-bold"> 
                Address
              </p>
              <p className="tracking-tight text-brand"> 
                53C, 14th street, emire state USA
              </p>
          </div>
        </div>

 

      </div>
    </>
  );
}

