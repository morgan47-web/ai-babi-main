import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import React from "react";
import SubscriptionBenefits from "../banner/subscription-benefits";
import { BenefitsType } from "../banner/benefit-types";
import { PremiumDialogType } from "./dialog-types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Trans } from "@lingui/react/macro";

interface Props {
  open: boolean;
  setDialogOpen: (open: boolean) => void;
  type: PremiumDialogType;
  backgroundURL?: string;
}

const dialogBenefitsMap = {
  [PremiumDialogType.reels]: {
    title: (
      <Trans>
        Want unlimited access to all content and exclusive perks? Unlock it now!
      </Trans>
    ),
    benefits: BenefitsType.reels,
  },
  [PremiumDialogType.chat]: {
    title: (
      <Trans>Want to keep the conversation going and unlock even more? </Trans>
    ),
    benefits: BenefitsType.chat,
  },
  [PremiumDialogType.generator]: {
    title: (
      <Trans>
        Want to skip the queue and unlock exclusive perks? Get priority access
        now!
      </Trans>
    ),
    benefits: BenefitsType.generator,
  },
  [PremiumDialogType.babes]: {
    title: (
      <Trans>Want to create unlimited babes and unlock exclusive perks? </Trans>
    ),
    benefits: BenefitsType.babes,
  },
  [PremiumDialogType.premium_babes]: {
    title: <Trans>Want to unlock chat with premium babes?</Trans>,
    benefits: BenefitsType.premium_babes,
  },
};

export default function BecomePremiumDialog({
  open,
  setDialogOpen,
  type,
  backgroundURL,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={`
            flex h-[590px] w-full flex-col justify-end overflow-y-auto bg-cover
            bg-center bg-no-repeat p-4
          `}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(27, 27, 29, 0) 0%, #1B1B1D 75%), url(${backgroundURL ? backgroundURL : type})`,
            maxHeight: "100dvh",
          }}
        >
          <VisuallyHidden asChild>
            <DialogTitle className="mx-4 text-center text-xl font-bold">
              {dialogBenefitsMap[type].title}
            </DialogTitle>
          </VisuallyHidden>
          <SubscriptionBenefits
            type={dialogBenefitsMap[type].benefits}
            onButtonClick={() => setDialogOpen(false)}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
