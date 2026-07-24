import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useNavigate, useLocation } from "react-router";
import BackButton from "@/components/ui/BackButton";
import NotFound from "@/components/ui/NotFound";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/BrandButton";
import data from "@/data/plan.json";
import SuccessModal from "@/components/shared/modals/SuccessModal";

const paymentSchema = z.object({
  cardHolder: z
    .string()
    .min(1, "Card holder name is required")
    .regex(/^[A-Za-z\s'-]+$/, "Enter a valid name"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .transform((v) => v.replace(/\s/g, ""))
    .pipe(z.string().regex(/^\d{13,19}$/, "Enter a valid card number")),
  expiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format")
    .refine((val) => {
      const [mm, yy] = val.split("/").map(Number);
      const now = new Date();
      const curYear = now.getFullYear() % 100;
      const curMonth = now.getMonth() + 1;
      return yy > curYear || (yy === curYear && mm >= curMonth);
    }, "Card has expired"),
  cvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^\d{3,4}$/, "Enter a valid CVC"),
});

export default function PaymentPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showSuccess, setShowSuccess] = useState(false);

  const plan = data.subscriptions.find((p) => String(p.id) === planId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    // resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  if (!plan) return <NotFound />;

  const onSubmit = async (formData) => {
    try {
      console.log("Payment data:", formData, "Plan:", plan.id);
      // await api.pay(formData) ...
      setShowSuccess(true);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="gap-6 flex flex-col justify-center h-full min-h-fit">
      <BackButton>Buy Subscription</BackButton>
      <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:-m-5 md:p-5">
      <div className="plan-page gap-8 flex flex-wrap">
        {/* Summary card */}
        <div className="rounded-2xl md:max-w-[20rem] xl:max-w-[25rem] 2xl:max-w-[35rem] bg-white p-6 h-fit shadow-md space-y-6">
          <div className="space-y-2">
            <h2 className="heading font-bold text-brand">{plan.title} {plan.billingPeriod} Membership</h2>
            <p className="text-black/50 ">{plan.description}</p>
          </div>

          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, #C4A46E, transparent)",
            }}
          />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-black">Price</span>
              <span className="font-bold">${Number(plan.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t  border-black/10 pt-3">
              <span className="text-black">Tax</span>
              <span className="font-bold">${Number(plan.tax).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-dashed border-black/10 pt-3">
              <span className="text-black">Subtotal (Incl. VAT)</span>
              <span className="font-bold">${Number(plan.subtotal).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment method */}
        

        {/* Card form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:max-w-[20rem] xl:max-w-[25rem] 2xl:max-w-[35rem] w-full">
          <div className="space-y-4">
            <h3 className=" sub-heading font-bold">Payment Method</h3>
            <div className="flex items-center gap-3">
              <span className="font-bold">Credit or Debit Card</span>
            </div>
          </div>
          <Input
            label="Card Holder Name"
            placeholder="Enter Name"
            type="text"
            error={errors.cardHolder?.message}
            {...register("cardHolder")}
          />

          <Input
            label="Card Number"
            placeholder="Enter Card Number"
            type="text"
            inputMode="numeric"
            error={errors.cardNumber?.message}
            {...register("cardNumber", {
              onChange: (e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
                e.target.value = digits.replace(/(.{4})/g, "$1 ").trim();
              },
            })}
          />

          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            type="text"
            inputMode="numeric"
            error={errors.expiry?.message}
            {...register("expiry", {
              onChange: (e) => {
                let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                e.target.value = v;
              },
            })}
          />

          <Input
            label="CVC"
            placeholder="Enter CVC"
            type="text"
            inputMode="numeric"
            error={errors.cvc?.message}
            {...register("cvc", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
              },
            })}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </div>
      </div>

      <SuccessModal
        open={showSuccess}
        title="Successfully!"
        description={`Your plan has been successfully purchased.\nEnjoy your ${plan.billingPeriod.toLowerCase()} subscription!`}
        buttonText="Done"
        onDone={() => {
          setShowSuccess(false);
          if (pathname.startsWith("/sign-up")) {
            navigate("/sign-up/add-vehicles");
          } else {
            navigate(-1);
          }
        }}
      />
    </div>
  );
}