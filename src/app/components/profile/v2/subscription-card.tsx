import { CheckmarkCircle } from "@/components/icons/generated"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"
import SubscriptionBenefits from "../../banner/subscription-benefits"
import { BenefitsType } from "../../banner/benefit-types"
import DiamondPile from "./diamond-pile"
import { SubscriptionPrice } from "@/app/lib/generated/models/SubscriptionPrice"

interface SubscriptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: SubscriptionPrice
  selected: boolean
  currentPlan?: boolean
  onClick?: () => void
}

export default function SubscriptionCard({
  plan,
  selected,
  currentPlan,
  onClick,
}: SubscriptionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        `
          relative flex flex-col gap-2 rounded-[16px] border-none bg-card p-4
          outline outline-[1px] outline-divider transition-transform
        `,
        currentPlan
          ? "shadow-selected-subscription outline-primary"
          : "outline-divider",
        selected && `shadow-selected-subscription outline-primary`,
      )}
    >
      <div className="flex h-8 items-center justify-between">
        {(currentPlan || selected) && (
          <div
            className={`
              absolute right-0 top-0 flex -translate-y-1/3 translate-x-1/3
              transform items-center justify-center
            `}
          >
            <CheckmarkCircle width={24} height={24} className="text-primary" />
          </div>
        )}
        <div className="flex items-center">
          <div className="flex flex-col gap-px">
            <div className="flex items-center gap-2">
              <p className="font-extrabold">{plan.displayName}</p>
              <p className="rounded-lg bg-secondary p-[4px] text-[10px]">
                <Trans>{plan.discount} OFF</Trans>
              </p>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              <Trans>Was $19.99/month</Trans>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl font-extrabold">${plan.displayPrice}</p>
          <p className="text-xs">
            <Trans>per month</Trans>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_100px] items-center justify-between">
        <SubscriptionBenefits
          type={BenefitsType.subscription}
          hideButton={true}
          className={`
            text-xs

            md:test-sm md:gap-3
          `}
        />
        <div className="flex flex-col items-center justify-center">
          <DiamondPile />
          <span className="text-center text-xs font-[600] font-medium">
            <Trans>
              {"Up to "}
              <span className="text-secondary">{"500 Free "}</span>
              {"Tokens  Monthly"}
            </Trans>
          </span>
        </div>
      </div>
      {plan.billingPeriod === "quarterly" && (
        <p className="h-4 text-center text-xs text-muted-foreground">
          <Trans>The 3-month plan costs $23.97 per quarter.</Trans>
        </p>
      )}
    </div>
  )
}
