import BackButton from "@/components/ui/BackButton"
import BrandButton from "@/components/ui/BrandButton";
import BrandPill from "@/components/ui/BrandPill";
import Image from "next/image";


export default function Page() {
  return (
    <>
      <div className="flex justify-between">
        <BackButton href="/carrier-management">
        Details 
        </BackButton>
        <div className="flex w-fit gap-5">
            <BrandButton href="/carrier-management" >
              Approve
            </BrandButton>
            <a href="/carrier-management" className="px-[4rem] py-[1.5rem] font-bold rounded-xl text-[1rem] bg-black text-white">
              Cancel
            </a>
            
        </div>
      </div>
      <div className=" xl:h-[calc(80vh-11rem)] rounded-2xl mt-[1.5rem]  p-[1.5rem] gap-[2rem] w-full h-full shadow-lg ">
        <div className="flex justify-between">
            <h2 className="text-[1.75rem] font-bold text-black tracking-tight">
              Personal Info
            </h2>
            
            <BrandPill>
              Pending
            </BrandPill>
        </div>

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

        <div className="flex">
          <div className="flex py-[1.5rem] px-[0.5rem] flex-col relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-100">
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