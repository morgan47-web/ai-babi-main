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
      description:
        "Get a taste of what mybabes has to offer with access to immersive AI chat models, image generation and custom character creation.",
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
      description:
        "The best mybabes has to offer. Unlimited messages and access to our Ultimate AI Engines for the most immersive AI chat experience.",
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
    <main className="flex w-full flex-1 flex-col items-center justify-top gap-2 p-4 px-3">
      <div className="  text-center">
        <h1 className="text-[20px] text-[#FAFCFF] font-semibold s">
          <Trans>Choose your plan</Trans>
        </h1>
        <h3 className="text-[12px] text-border/60 text-[#9B9FA4]">
          <Trans>100% anonymous. You can cancel anytime.</Trans>
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
                  ` w-[90vw] rounded-3xl  border-[3px] p-[20px]  cursor-pointer transition-all ${plan.name == "Premium" ? "bg-premium-gradient" : "bg-deluxe-gradient"} `,
                  isSelected
                    ? "border-[#ff5c5c] "
                    : "border-[#333]  hover:border-[#444]"
                )}
                onClick={() => setSelected(plan.id)}
              >
                <div className="gap-[10px] border-b-[1px] border-[#242529]">
                  <div className="flex items-center text-xl font-semibold text-white">
                    {plan.icon}
                    <span>{plan.name}</span>
                  </div>

                  <p className="text-[24px]  font-extrabold ">
                    {plan.displayPrice}
                    <span className="text-sm text-white/70 font-normal ml-1">
                      / {plan.billingInterval}
                    </span>
                  </p>
                  <div className="text-[10px] text-[#9B9FA4] mb-[10px]">
                    <p>{plan.description}</p>
                  </div>
                </div>
                <div className="my-[10px] text-[12px]">
                  <h3>Get anything you need to get started.</h3>
                </div>
                <ul className="mt-[10px] space-y-[10px] text-white text-[10px]">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <Checkmark className={`${tickColor}  `} />
                      <span className="font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`${plan.name == "Premium" ? "border-[#242529]" : "border-[#ff5c5c]"} mt-[10px] w-full h-[45px] rounded-[30px] border-[1px]  p-[25px]  py-[14px] font-500 text-[14px]  transition-colors`}
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
