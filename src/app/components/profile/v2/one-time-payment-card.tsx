import { CoinIcon } from "@/components/icons/generated"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"

interface OneTimePaymentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  diamonds: number
  displayPrice: string
  tokens: string
  selected: boolean
  discount?: string
}

function Diamonds({ count }: { count: number }) {
  return (
    <div className="grid h-auto grid-cols-4 gap-[4px]">
      {Array.from({ length: count }).map((_, index) => (
        <CoinIcon key={"diamond" + index} />
      ))}
      {Array.from({ length: 4 - count }).map((_, index) => (
        <EmptyDiamond key={"diamond" + index} />
      ))}
    </div>
  )
}

function EmptyDiamond() {
  return (
    <div
      className={`
        h-[12px] w-[12px] translate-x-[2px] translate-y-[2px] rotate-[45deg]
        transform bg-[#020202]
        shadow-[0px_0px_13px_0px_#0079ff80,0px_1px_10px_0px_#0079ff80]
      `}
    />
  )
}

export default function OneTimePaymentCard({
  diamonds,
  discount,
  displayPrice,
  tokens,
  selected,
  onClick,
}: OneTimePaymentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        `
          flex h-16 w-full items-center justify-between rounded-[16px] bg-card
          px-4 py-2 outline outline-[1px] outline-divider transition-transform
        `,
        selected && `outline-[2px] outline-trigger-border`,
      )}
    >
      <div className="flex items-center gap-1">
        <Diamonds count={diamonds} />
        <p className="pl-1 font-bold">{tokens}</p>
        <p className="text-xs">
          <Trans>tokens</Trans>
        </p>
      </div>
      <div className="flex flex-col items-center">
        {discount && (
          <span className="text-sm font-bold text-[#FFA31A]">
            <Trans>+{discount} bonus</Trans>
          </span>
        )}
        <p className="font-extrabold">€ {displayPrice}</p>
        <p className="text-xs">
          <Trans>one-time payment</Trans>
        </p>
      </div>
    </div>
  )
}
