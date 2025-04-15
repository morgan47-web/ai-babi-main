"use client";

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";
import AddonTokens from "@/app/components/profile/addon-tokens";
import { Antivirus, BankPrivacy } from "@/components/icons/generated";
import { Trans } from "@lingui/react/macro";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BuyTokensDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="mx-2 flex w-full flex-col rounded-lg py-4">
          <div>
            <DialogTitle className="text-center text-md ">
              <Trans>Buy more tokens</Trans>
            </DialogTitle>
            <DialogDescription className="text-center text-xs">
              <Trans>Additional tokens never expire</Trans>
            </DialogDescription>
          </div>
          <AddonTokens />
          {/* Footer */}
          <div className="flex flex-col items-center gap-2">
            <span
              className={`
                flex items-center gap-2 text-sm font-extrabold
                text-muted-foreground
              `}
            >
              <BankPrivacy width={24} height={24} />
              No adult transactions in your bank statement
            </span>
            <span
              className={`
                flex items-center gap-2 text-sm font-extrabold
                text-muted-foreground
              `}
            >
              <Antivirus width={24} height={24} />
              No hidden fees & Cancel subscription at any time
            </span>
            <span className="text-[10px] text-muted-foreground">
              Your credit card statement will read UG*MemoraAI420777149679,
              Prague
            </span>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
