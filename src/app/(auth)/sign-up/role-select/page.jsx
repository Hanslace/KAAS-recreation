"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import BackButton from "@/components/ui/BackButton";
import BrandButton from "@/components/ui/BrandButton";

const roleOptions = [
  { id: "company", label: "Company", icon: "solar:buildings-2-bold" },
  { id: "individual", label: "Individual", icon: "solar:user-bold" },
];

export default function RoleSelectPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="gap-[2em] flex flex-col justify-center h-full min-h-fit">
      <BackButton>Back</BackButton>

      <div className="text-center">
        <h1 className="auth-heading">Select One</h1>
        <p className="auth-sub-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </p>
      </div>

      <div className="flex items-center justify-center gap-6">
        {roleOptions.map((option) => {
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className="flex flex-col items-center gap-2 auth-h2"
              role="radio"
              aria-checked={isSelected}
            >
              <span
                className={`flex h-[7em] w-[7em] items-center justify-center rounded-2xl border transition-all ${
                  isSelected
                    ? "border-brand bg-brand-gradient shadow-lg"
                    : "border-black/10 bg-white"
                }`}
              >
                <Icon
                  icon={option.icon}
                  className={`h-[3.5em] w-[3.5em] ${
                    isSelected ? "text-white" : "text-brand/15"
                  }`}
                />
              </span>

              <span className={`font-bold ${isSelected ? "text-black" : "text-black/20"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <BrandButton to="/sign-up/create-profile" disabled={!selected} className="w-full">
        Continue
      </BrandButton>
    </div>
  );
}
