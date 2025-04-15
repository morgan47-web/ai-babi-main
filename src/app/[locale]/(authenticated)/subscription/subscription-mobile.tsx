"use client";

import { Checkmark } from "@/components/icons/generated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trans } from "@lingui/react/macro";
import { Check, CheckCircle, Flame, Gem } from "lucide-react";

type SubscriptionsProps = {
  selected: string;
  setSelected: (id: string) => void;
  selectedPackage: string; // 'monthly', 'yearly', 'one-time'
};

export default function Subscriptions({
  selected,
  setSelected,
  selectedPackage,
}: SubscriptionsProps) {
  const plans = [
    {
      id: "premium-monthly",
      name: "Premium",
      icon: <Gem className="text-[#3B82F6] mr-2" size={22} />, // Blue
      tickColor: "text-[#3B82F6]", // Tailwind blue-500
      displayPrice: "€13.99",
      billingInterval: "monthly",
      features: [
        "200 tokens/month + 10 daily bonus",
        "4000 Messages a Month",
        "400 Generate Images a Month",
        "Create 5x AI babes a Month",
        "In-Chat Message Generation",
        "Unlock ALL NSFW Reels",
      ],
    },
    {
      id: "deluxe-monthly",
      name: "Deluxe",
      icon: <Flame className="text-[#F97316] mr-2" size={22} />, // Orange
      tickColor: "text-[#F97316]", // Tailwind orange-500
      displayPrice: "€29.99",
      billingInterval: "monthly",
      features: [
        "500 tokens/month + 10 daily bonus",
        "Unlimited Chat",
        "100 Audio Messages a Month",
        "800 Generate Images a Month",
        "Unlimited Babes Creation",
        "Skip Queues & Waiting",
        "Unlock ALL NSFW Reels",
      ],
    },
    {
      id: "premium-yearly",
      name: "Premium (Yearly)",
      tickColor: "text-white/40",
      displayPrice: "€139.99",
      billingInterval: "yearly",
      features: [
        "200 tokens/month + 10 daily bonus",
        "4000 Messages a Month",
        "400 Generate Images a Month",
        "Create 5x AI babes a Month",
        "In-Chat Message Generation",
        "Unlock ALL NSFW Reels",
      ],
    },
    {
      id: "one-time-pass",
      name: "One-Time Pass",
      tickColor: "text-white/40",
      displayPrice: "€9.99",
      billingInterval: "one-time",
      features: [
        "1000 Messages",
        "100 Image Generations",
        "3 AI Babes",
        "NSFW Content Access",
      ],
    },
  ];

  const filteredPlans = plans.filter(
    (plan) => plan.billingInterval === selectedPackage
  );

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-top gap-4 p-4 px-5">
      <div className="gap-2 text-center">
        <h1 className="text-[20px] text-[#D9D9D9]">
          <Trans>Choose your plan</Trans>
        </h1>
        <h3 className="text-[12px] text-border/60">
          <Trans>
            Get the best value—full premium features plus daily bonus tokens!
          </Trans>
        </h3>
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => {
            const isSelected = selected === plan.id;
            const tickColor =
              plan.name == "Premium"
                ? "text-[#3B82F6] font-bold"
                : "text-[#F97316]";

            return (
              <div
                key={plan.id}
                className={cn(
                  "w-[90vw] rounded-3xl border p-6 cursor-pointer transition-all",
                  isSelected
                    ? "border-[#ff5c5c] bg-[#1c1c1f]"
                    : "border-[#333] bg-[#111115] hover:border-[#444]"
                )}
                onClick={() => setSelected(plan.id)}
              >
                <div className="flex items-center text-xl font-semibold text-white">
                  {plan.icon}
                  <span>{plan.name}</span>
                </div>

                <p className="text-lg mt-2 font-bold ">
                  {plan.displayPrice}
                  <span className="text-sm text-white/70 font-normal ml-1">
                    / {plan.billingInterval}
                  </span>
                </p>

                <ul className="mt-4 space-y-2 text-white text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Checkmark className={`${tickColor} mt-1 `} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`${plan.name == "Premium" ? "border-white" : "border-[#ff5c5c]"} mt-6 w-full rounded-[30px] border  p-[25px] font-medium text-[14px]  transition-colors`}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                >
                  Subscribe Now
                </Button>
              </div>
            );
          })
        ) : (
          <p className="text-white text-sm">No plans found for this package.</p>
        )}
      </div>
    </main>
  );
}
