import PlanCard from "@/app/admin/(protected)/subscriptions/_components/PlanCard";
import BackButton from "@/components/ui/BackButton";
import data from "@/data/plan.json";

export default function PaymentPlanPage() {
  return (
    <div className="space-y-6 md:w-screen md:max-w-[40vw] md:relative md:left-1/2 md:right-1/2 md:-translate-x-1/2">
      <BackButton>Subscription</BackButton>
      <div className="flex flex-wrap w-full   gap-6 md:overflow-y-auto md:max-h-[60vh] custom-scrollbar md:pl-6 md:pb-6 ">
        {data.subscriptions
          .filter((plan) => plan.title === "Truck")
          .map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              billingPeriod={plan.billingPeriod}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              href={`/payment-plan/${plan.id}`}
              buttonText="Buy Now"
            />
          ))}
      </div>
    </div>
  );
}