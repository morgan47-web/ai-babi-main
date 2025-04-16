"use client";

import BuyAddonsButton from "@/app/components/actions/truevo/buy-addons";
import BuySubscriptionButton from "@/app/components/actions/truevo/buy-subscription";
import BuyTokensDialog from "@/app/components/dialog/buy-tokens";
import { NoAdultsTransaction } from "@/app/components/profile/subscription-footer";
import OneTimePaymentCard from "@/app/components/profile/v2/one-time-payment-card";
import { usePricing } from "@/app/context/pricing";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { displayTokenAmount } from "@/app/lib/tokens";
import { Diamond } from "@/components/icons/generated";
import { Trans } from "@lingui/react/macro";
import { useState } from "react";

export default function GetTokensMobile() {
  const pricing = usePricing();
  const [selected, setSelected] = useState("1");
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  if (isDesktop === undefined) {
    return null;
  }

  return (
    <div className={`grid h-full grid-cols-1 grid-rows-[1fr,auto]`}>
      <div
        className={`
          relative flex h-full  flex-col items-center justify-start gap-2
          space-y-1 overflow-auto
        `}
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
              Buy Tokens as a one-off purchase. No commitment, no expiration
              date.
            </Trans>
          </h5>
        </div>
        <div className="flex w-[60vw] max-sm:w-[90vw] flex-col items-center space-y-[10px] px-1 ">
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
          {tokenPlans.map((plan, i) => (
            <OneTimePaymentCard
              key={"plan" + plan.id}
              diamonds={Math.min(plan.diamonds, i + 1)}
              tokens={displayTokenAmount(plan.tokens)}
              displayPrice={plan.price}
              selected={selected === plan.id}
              onClick={() => {
                setSelected(plan.id);
              }}
              discount={plan.bonus ?? undefined}
            />
          ))}
        </div>
      </div>

      <div
        className={`
          flex w-full h-full flex-col items-center justify-center 
          px-[10px] py-[10px]
        `}
      >
        <BuyAddonsButton
          price={
            pricing?.state.addons.find((p) => p.id === selected)
              ?.displayPrice ?? "0"
          }
          productName={
            pricing?.state.addons.find((p) => p.id === selected)?.displayName ??
            "UNKNOWN"
          }
          productID={
            pricing?.state.addons.find((p) => p.id === selected)?.id ?? ""
          }
        />

        {/* <NoAdultsTransaction /> */}
      </div>
    </div>
  );
}
