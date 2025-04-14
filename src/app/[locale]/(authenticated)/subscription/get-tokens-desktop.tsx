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
  const [selected, setSelected] = useState("1");

  return (
    <main
      className={cn(
        `
          flex w-full flex-1 flex-col items-center justify-top space-y-2 p-4
          px-5
        `
      )}
    >
      <div className={`space-y-2 text-center`}>
        <h1 className={`text-[40px] text-[#D9D9D9]`}>
          <Trans>Get tokens</Trans>
        </h1>
        <h3 className={`text-border/60`}>
          <Trans>
            Buy tokens as a one-off purchase. Enjoy full premium features with
            no <br /> commitment, no strings attached and no expiration date.
          </Trans>
        </h3>
      </div>
      <Card
        className={`
          grid grid-cols-2 grid-cols-[350px_350px] rounded-[40px] border
          border-divider bg-[#111115] p-10
        `}
      >
        <div className="space-y-2 pr-10">
          <h3 className="text-[12px]">
            <Trans>Get anything you need to get started.</Trans>
          </h3>
          <SubscriptionBenefits type={BenefitsType.trial} hideButton />
        </div>
        <div className={`flex flex-col justify-top space-y-2`}>
          {pricing?.state.addons.map((plan, i) => (
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
      <PaymentAssurance />
      <SubscriptionFooter />
    </main>
  );
}
