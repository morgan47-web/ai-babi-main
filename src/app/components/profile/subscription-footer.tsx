import BankPrivacy from "@/components/icons/generated/BankPrivacy"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"

export function NoHiddenFees({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        `flex items-center gap-2 text-xs font-extrabold text-muted-foreground`,
        className,
      )}
    >
      <BankPrivacy width={24} height={24} />
      <Trans>No hidden fees & Cancel subscription at any time</Trans>
    </span>
  )
}

export function NoAdultsTransaction() {
  return (
    <span
      className={`
        flex items-center gap-2 text-xs font-extrabold text-muted-foreground
      `}
    >
      <BankPrivacy width={24} height={24} />
      <Trans>No adults transaction in your bank statement</Trans>
    </span>
  )
}

export function PaymentAssurance() {
  return (
    <div
      className={`
        flex flex-col items-start gap-2

        md:flex-row
      `}
    >
      <NoAdultsTransaction />
    </div>
  )
}

export function PatreonFooter() {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-center text-[10px] text-muted-foreground">
        <Trans>
          To unlock premium features in MyBabes.ai, complete your payment on
          Patreon. Once subscribed, your Patreon account will sync automatically
          with MyBabes, giving you instant access to premium tools. You can
          cancel anytime, and your subscription will be removed in the app.
        </Trans>
      </span>
    </div>
  )
}

export default function SubscriptionFooter() {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-center text-[10px] text-muted-foreground">
        <Trans>
          Memora AI s.r.o., Limited, Nr.CZ21595411, Písečná 451/6, Troja (Prague
          8), 182 00 Prague, Czech republic
        </Trans>
      </span>
    </div>
  )
}
