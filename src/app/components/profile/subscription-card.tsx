import { CheckmarkCircle, CoinIcon } from "@/components/icons/generated"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"

interface SubscriptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  discount: string
  displayPrice: string
  tokens: string
  selected: boolean
  currentPlan?: boolean
  originalPrice?: string
}

export default function SubscriptionCard({
  title,
  discount,
  displayPrice,
  tokens,
  currentPlan,
  selected,
  onClick,
  originalPrice = "19.99",
}: SubscriptionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        `
          relative flex h-16 justify-between gap-2 rounded-[16px] border-none
          bg-trigger px-4 py-2 outline outline-[1px] outline-divider
          transition-transform
        `,
        currentPlan
          ? "shadow-selected-subscription outline-primary"
          : "outline-divider",
        selected && `shadow-selected-subscription outline-primary`,
      )}
    >
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
        <div className="flex flex-col items-center gap-px">
          <div className="flex items-center gap-2">
            <p className="font-extrabold">{title}</p>
            <p className="rounded-lg bg-secondary p-[4px] text-[10px]">
              <Trans>{discount} OFF</Trans>
            </p>
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            <Trans>Was ${originalPrice}/month</Trans>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <CoinIcon width={16} height={16} />
          <p>{tokens}</p>
        </div>
        <p className="text-xs">
          <Trans>monthly</Trans>
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-extrabold">${displayPrice}</p>
        <p className="text-xs">
          <Trans>per month</Trans>
        </p>
      </div>
    </div>
  )
}
