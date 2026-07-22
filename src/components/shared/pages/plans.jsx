import { useState } from "react";
import PlanCard from "@/components/shared/cards/PlanCard";
import BackButton from "@/components/ui/BackButton";
import ConfirmationModal from "@/components/shared/modals/ConfirmationModal";
import data from "@/data/plan.json";
import { useLocation } from "react-router";

export default function PlansPage({ mine = false }) {
  const path = useLocation().pathname;
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const plans = data.subscriptions.filter((plan) => plan.title === "Truck");

  const handleCancelConfirm = () => {
    setCancelModalOpen(false);
  };

  return (
    <div className="gap-6 flex flex-col justify-center h-full min-h-fit ">
      <BackButton>Subscription</BackButton>
      <div className="flex flex-wrap  w-full   gap-6  ">
        {plans.map((plan, index) => {
          const isCancelCard = mine && index === 0;

          return (
            <PlanCard
              key={plan.id}
              title={plan.title}
              billingPeriod={plan.billingPeriod}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              href={`${path}/${plan.id}`}
              buttonText={isCancelCard ? "Cancel" : "Buy Now"}
              onButtonClick={isCancelCard ? () => setCancelModalOpen(true) : undefined}
            />
          );
        })}
      </div>

      <ConfirmationModal
        open={cancelModalOpen}
        icon="lucide:trash-2"
        title="Cancel!"
        description="Are you sure you want to cancel this subscription?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}
