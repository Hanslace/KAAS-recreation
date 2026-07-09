import BackButton from "@/components/ui/BackButton"
import BrandButton from "@/components/ui/BrandButton";

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
      <div className=" xl:h-[calc(80vh-11rem)] rounded-2xl mt-[1.5rem]  p-[1.25rem] gap-[2rem] w-full h-full shadow-lg ">

      </div>
    </>
  );
}