import BrandButton from "@/components/ui/BrandButton";
import PlanCard from './_components/PlanCard';
import data from '@/data/plan.json';



export default function Page() {
  return(
  <div className="w-full">
    <div className="w-full flex flex-col sm:flex-row gap-10 justify-between">
      <h2 className="text-[2.5rem] font-bold tracking-tight text-black">
          Subscription
      </h2>

      <div className="flex ml-auto w-fit gap-5">
            <BrandButton href="/subscriptions/earning" >
              Subscription Earning
            </BrandButton>
      </div>

    </div>

    <div className="mt-[1rem] grid w-full grid-cols-1 gap-6 md:grid-cols-2 overflow-y-auto">
        {data.plans.map((plan) => (
          <PlanCard
            key={plan.id}
            title={plan.title}
            billingPeriod={plan.billingPeriod}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            href={plan.href}
            buttonText="Edit Now"
          />
        ))}
      </div>
  </div>);
}