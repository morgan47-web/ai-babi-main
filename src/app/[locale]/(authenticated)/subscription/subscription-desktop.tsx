"use client";

import SubscriptionFooter, {
  PaymentAssurance,
} from "@/app/components/profile/subscription-footer";
import { cn } from "@/lib/utils";
import { Trans } from "@lingui/react/macro";
import BuySubscriptionButton from "@/app/components/actions/truevo/buy-subscription";
import { useUser } from "@/app/context/user";
import { usePricing } from "@/app/context/pricing";
import { useState } from "react";
import Subscriptions from "@/app/components/profile/subscriptions";
import { isSubscribed } from "@/app/lib/user-guard";
import { Card } from "@/components/ui/card";

export default function SubscriptionDesktop() {
  const user = useUser();
  const pricing = usePricing();
  const [selected, setSelected] = useState(
    "28a14576-aacc-402d-b86d-fcbb834018b9"
  );

  return (
    <main
      className={cn(
        `flex w-full flex-1 flex-col items-center justify-top gap-4 p-4 px-5`
      )}
    >
      <div className={`gap-2 text-center`}>
        <h1 className={`text-[22px] text-[#D9D9D9] font-semibold`}>
          <Trans>Choose your plan</Trans>
        </h1>
        <h3 className={`text-[14px] text-border/60`}>
          <Trans>100% anonymous. You can cancel anytime.</Trans>
        </h3>
      </div>
      <Card
        className={`
          flex w-[900px] flex-col items-center gap-6 rounded-[40px] border
          border-divider bg-[#111115] p-10
        `}
      >
        <div className={`flex justify-top space-y-2`}>
          <Subscriptions selected={selected} setSelected={setSelected} />
          {/* Payment Button */}
        </div>
        <BuySubscriptionButton
          className="w-[350px]"
          price={
            pricing?.state.subscriptions.find((p) => p.id === selected)
              ?.displayPrice || "0"
          }
          disabled={isSubscribed(user?.user)}
          planID={
            pricing?.state.subscriptions.find((p) => p.id === selected)?.id ??
            ""
          }
        />
      </Card>
      <PaymentAssurance />
      <SubscriptionFooter />
    </main>
  );
}
