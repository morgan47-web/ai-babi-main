"use client";

import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GetTokensDesktop from "./get-tokens-desktop";
import GetTokensMobile from "./get-tokens-mobile";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { Trans } from "@lingui/react/macro";
import EarnTokens from "./earn-tokens";
import SubscriptionDesktop from "./subscription-desktop";
import SubscriptionMobile from "./subscription-mobile";
import { Badge } from "@/components/ui/badge";

export const TABS = {
  monthlySubscription: {
    value: "monthly",
    title: <Trans>Monthly</Trans>,
  },
  yearlySubscription: {
    value: "yearly",
    title: <Trans>Quartely</Trans>,
  },
  onetimeSubscription: {
    value: "one-time",
    title: <Trans>One-Time</Trans>,
  },
};

interface SubscriptionTabsProps {
  defaultTab: string;
}

export default function SubscriptionTabs({
  defaultTab,
}: SubscriptionTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Get the current tab from search parameters or use the defaultTab
  const tab = (searchParams.get("tab") as string) || defaultTab;

  if (isDesktop === undefined) {
    return null;
  }

  return (
    <main className={`flex h-full w-full`}>
      <Tabs
        className={`flex h-full w-full flex-col items-center p-2`}
        value={tab}
        defaultValue={defaultTab}
        onValueChange={(value) => {
          const params = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          params.set("tab", value);
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        <TabsList
          className={`
            relative flex w-full max-w-[700px] h-[8vh] items-center justify-between
            gap-1 rounded-full border border-divider bg-menu p-1

            md:w-[438px]
            sm:w-auto
          `}
        >
          <Badge
            className="absolute -top-1   p-1 py-0.5 text-[10px]
            md:left-56
            sm:left-40
            "
            variant="secondary"
          >
            <Trans>40% OFF</Trans>
          </Badge>
          {Object.values(TABS).map((tab) => (
            <TabsTrigger
              variant={"pill"}
              key={tab.value}
              value={tab.value}
              style={{ fontSize: "14px" }}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value={TABS.monthlySubscription.value}
          className="flex flex-1 overflow-auto"
        >
          {isDesktop ? (
            <SubscriptionDesktop selectedPackage="monthly" />
          ) : (
            <SubscriptionMobile selectedPackage="monthly" />
          )}
        </TabsContent>
        <TabsContent
          value={TABS.yearlySubscription.value}
          className="flex flex-1 overflow-auto"
        >
          {isDesktop ? (
            <SubscriptionDesktop selectedPackage="yearly" />
          ) : (
            <SubscriptionMobile selectedPackage="yearly" />
          )}
        </TabsContent>
        <TabsContent
          value={TABS.onetimeSubscription.value}
          className="flex flex-1 overflow-auto"
        >
          {isDesktop ? (
            <SubscriptionDesktop selectedPackage="one-time" />
          ) : (
            <SubscriptionMobile selectedPackage="one-time" />
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
