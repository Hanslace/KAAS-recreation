import PlanCard from "@/app/admin/(protected)/subscriptions/_components/PlanCard";
import BackButton from "@/components/ui/BackButton";
import data from "@/data/plan.json";

export default function PaymentPlanPage() {
  return (
    <div className="space-y-6 ">
      <BackButton>Subscription</BackButton>
      <div className="flex flex-wrap w-full   gap-6  ">
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