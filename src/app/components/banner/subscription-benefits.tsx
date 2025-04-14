"use client";

import Checkmark from "@/components/icons/generated/Checkmark";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BenefitsType } from "./benefit-types";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useEffect } from "react";
import { Trans } from "@lingui/react/macro";

const headingMap = {
  [BenefitsType.subscription]: "",
  [BenefitsType.trial]: "",
  [BenefitsType.reels]: (
    <Trans>
      Want unlimited access to all content and exclusive perks? Unlock it now!
    </Trans>
  ),
  [BenefitsType.chat]: undefined,

  [BenefitsType.generator]: (
    <Trans>
      Want to skip the queue and unlock exclusive perks? Get priority access
      now!
    </Trans>
  ),
  [BenefitsType.babes]: (
    <Trans>Want to create unlimited babes and unlock exclusive perks?</Trans>
  ),
  [BenefitsType.premium_babes]: (
    <Trans>
      This babe is for premium users only! Subscribe to unlock her and more
    </Trans>
  ),
};

export const perksMap = {
  [BenefitsType.trial]: [
    <Trans key="trial-1">Create Unlimited AI Babes</Trans>,
    <Trans key="trial-2">Tokens never expires</Trans>,
    <Trans key="trial-3">Generate AI NSFW pictures</Trans>,
    <Trans key="trial-4">More chat with AI babes</Trans>,
    <Trans key="trial-5">Skip the queues</Trans>,
  ],
  [BenefitsType.subscription]: [
    <Trans key="subscription-1">Create Unlimited AI Babes</Trans>,
    <Trans key="subscription-5">200 tokens/month + 10 daily bonus</Trans>,
    <Trans key="subscription-2">Unlock ALL NSFW Reels</Trans>,
    <Trans key="subscription-3">Enjoy Unlimited Chat</Trans>,
    <Trans key="subscription-4">Generate Up to 500 Images</Trans>,
  ],
  [BenefitsType.reels]: [
    <Trans key="reels-1">Unlock ALL NSFW reels</Trans>,
    <Trans key="reels-2">Generate naked pictures without waiting</Trans>,
    <Trans key="reels-3">Skip waiting in queues</Trans>,
    <Trans key="reels-5">Open storytelling</Trans>,
  ],
  [BenefitsType.chat]: [
    <Trans key="chat-5">
      Limited offer with <span className="font-bold">60% discount</span>
    </Trans>,
    <Trans key="chat-6">Create Unlimited AI Babes</Trans>,
    <Trans key="chat-3">Enjoy Unlimited Chat</Trans>,
    <Trans key="chat-5">Generate Up to 500 Images Monthly</Trans>,
  ],
  [BenefitsType.generator]: [
    <Trans key="generator-2">No queue in picture generator</Trans>,
    <Trans key="generator-3">Create your own AI babes</Trans>,
    <Trans key="generator-5">Faster chat</Trans>,
    <Trans key="generator-6">Create as many babes as you want</Trans>,

    // <Trans>Generate pictures in chat</Trans>,
  ],
  [BenefitsType.babes]: [
    <Trans key="babes-1">Create as many babes as you want</Trans>,
    <Trans key="babes-2">Generate Up to 500 Images Monthly</Trans>,
    <Trans key="babes-4">Skip waiting in queues</Trans>,
    <Trans key="babes-3">Enjoy Unlimited Chat</Trans>,
    <Trans key="babes-5">Unlock ALL NSFW reels</Trans>,
  ],
  [BenefitsType.premium_babes]: [
    <Trans key="premium-babes-1">
      Unlock chat and generation with premium babes
    </Trans>,
    <Trans key="premium-babes-2">Generate Up to 500 Images Monthly</Trans>,
    <Trans key="premium-babes-4">Skip waiting in queues</Trans>,
    <Trans key="premium-babes-3">Enjoy Unlimited Chat</Trans>,
    <Trans key="premium-babes-5">Unlock ALL NSFW reels</Trans>,
  ],
};

export default function SubscriptionBenefits({
  type,
  onButtonClick,
  hideButton,
  className,
}: {
  type: BenefitsType;
  onButtonClick?: () => void;
  hideButton?: boolean;
  className?: string;
}) {
  const { push } = useRouter();
  const isSmallPhone = useMediaQuery("(max-height: 768px)");

  useEffect(() => {
    if (!type) return; // prevent multiple calls

    gtag("event", "view_item", {
      items: [
        {
          item_id: "subscription_" + type,
          item_name: "Subscription - " + type,
        },
      ],
    });
  }, [type]);

  return (
    <div
      className={cn(
        `
          flex flex-col items-start justify-center gap-2 text-shadow-lg

          md:gap-4
        `,
        {
          "gap-1": isSmallPhone,
        },
        className
      )}
    >
      {headingMap[type] && (
        <h1
          className={`
            text-start text-[12px] font-bold text-white

            md:text-center
          `}
        >
          {headingMap[type]}
        </h1>
      )}

      {perksMap[type] &&
        perksMap[type].map((perk, index) => (
          <div
            className={cn(
              `
                grid grid-cols-2 grid-cols-[30px_1fr] items-center
                justify-center
              `,
              {
                "pb-0 text-xs": isSmallPhone,
              }
            )}
            key={index}
          >
            <Checkmark className="text-primary" />
            <p className="text-[14px]">{perk}</p>
          </div>
        ))}
      {!hideButton && (
        <Button
          id="become-premium-button"
          variant={"secondary"}
          className="h-10 w-full rounded-full"
          onClick={async () => {
            gtag("event", "add_to_cart", {
              value: 1,
              currency: "USD",
              items: [
                {
                  item_id: "subscription_" + type,
                  item_name: "Subscription - " + type,
                },
              ],
            });
            if (onButtonClick) {
              onButtonClick();
            }
            push("/subscription");
          }}
        >
          <Trans>Become PREMIUM</Trans>
        </Button>
      )}
    </div>
  );
}
