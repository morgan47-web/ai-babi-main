"use client";

import { BenefitsType } from "@/app/components/banner/benefit-types";
import SubscriptionBenefits from "@/app/components/banner/subscription-benefits";
import SubscriptionFooter, {
  PaymentAssurance,
} from "@/app/components/profile/subscription-footer";
import { cn } from "@/lib/utils";
import { Trans } from "@lingui/react/macro";
import { usePricing } from "@/app/context/pricing";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import OneTimePaymentCard from "@/app/components/profile/v2/one-time-payment-card";
import { displayTokenAmount } from "@/app/lib/tokens";
import BuyAddonsButton from "@/app/components/actions/truevo/buy-addons";

export default function GetTokensDesktop() {
  const pricing = usePricing();

  if (!pricing) return null;
  const [selected, setSelected] = useState("1");

  const tokenPlans: TokenPlan[] = [
    {
      id: "50-tokens",
      tokens: 50,
      price: "9.99",
      diamonds: 4,
    },
    {
      id: "200-tokens",
      tokens: 200,
      price: "14.99",
      diamonds: 4,
    },
    {
      id: "550-tokens",
      tokens: 550,
      price: "29.99",
      bonus: "10%",
      diamonds: 1,
    },
    {
      id: "1150-tokens",
      tokens: 1150,
      price: "54.99",
      bonus: "15%",
      diamonds: 2,
    },
  ];

  return (
    <main
      className={cn(
        `
          flex w-full  flex-1 flex-col items-center justify-top space-y-2 p-4
          px-5
        `
      )}
    >
      <div className="flex flex-col space-y-1 px-[10px] pt-4 text-center">
        <h1
          className={`
              w-full  text-[24px] leading-[30px] text-white-secondary font-semibold
            `}
        >
          <Trans>Get tokens</Trans>
        </h1>
        <h5 className="text-[12px] leading-[20px]  text-center text-[#9B9FA4]">
          <Trans>
            Buy Tokens as a one-off purchase. No commitment, no expiration date.
          </Trans>
        </h5>
      </div>
      <Card
        className={`
          grid grid-cols-2 grid-cols-[350px_350px] rounded-[40px] 
          border-divider  p-10 py-[10px]
          
        `}
      >
        <div className="space-y-2 pr-10">
          <h3 className="text-[12px]">
            <Trans>Get anything you need to get started.</Trans>
          </h3>
          <SubscriptionBenefits type={BenefitsType.trial} hideButton />
        </div>
        <div className={`flex flex-col justify-top space-y-2`}>
          {/* {pricing?.state.addons.map((plan, i) => (
            <OneTimePaymentCard
              key={"plan" + plan.id}
              diamonds={Math.min(4, i + 1)}
              tokens={displayTokenAmount(plan.tokens)}
              displayPrice={plan.displayPrice}
              selected={selected === plan.id}
              onClick={() => {
                setSelected(plan.id);
              }}
              discount={plan.discount ?? undefined}
            />
          ))} */}
          {pricing.state.addons.map((plan, i) => (
            <OneTimePaymentCard
              key={"plan" + plan.id}
              diamonds={Math.min(4, i + 1)}
              tokens={displayTokenAmount(plan.tokens)}
              displayPrice={plan.displayPrice}
              selected={selected === plan.id}
              onClick={() => {
                setSelected(plan.id);
              }}
              discount={plan.discount ?? undefined}
            />
          ))}
          {/* Payment Button */}
          <BuyAddonsButton
            price={
              pricing?.state.addons.find((p) => p.id === selected)
                ?.displayPrice ?? "0"
            }
            productName={
              pricing?.state.addons.find((p) => p.id === selected)
                ?.displayName ?? "UNKNOWN"
            }
            productID={
              pricing?.state.addons.find((p) => p.id === selected)?.id ?? ""
            }
          />
        </div>
      </Card>
      {/* <PaymentAssurance /> */}
      {/* <SubscriptionFooter /> */}
    </main>
  );
}
