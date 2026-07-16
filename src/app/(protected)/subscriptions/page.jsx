import BrandButton from "@/components/ui/BrandButton";
import PlanCard from './_components/PlanCard';
import data from '@/data/plan.json';



export default function Page() {
  return(
  <div className="w-full space-y-[1em] lg:space-y-[1.5em]">
    <div className="w-full flex flex-row gap-5 justify-between">
      <h2 className="main-heading font-bold tracking-tight text-black">
          Subscription
      </h2>

            <BrandButton to="/subscriptions/earning" className="px-4" >
              Subscription Earning
            </BrandButton>

    </div>

    <div className="mt-[1rem] grid w-full grid-cols-1 gap-6 sm:grid-cols-2 min-[120rem]:grid-cols-3 min-[160rem]:grid-cols-4">
        {data.subscriptions.map((plan) => (
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