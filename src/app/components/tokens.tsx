import { CoinIcon } from "@/components/icons/generated"
import { displayTokenAmount } from "../lib/tokens"

type Props = {
  amount: number
  size: number
  amountFirst?: boolean
  className?: string
}

export default function Tokens({
  amount,
  size,
  amountFirst = false,
  className,
}: Props) {
  return (
    <div className="flex items-center gap-1 leading-none">
      {amountFirst ? (
        <>
          <span className={className}>{displayTokenAmount(amount)}</span>
          <CoinIcon width={size} height={size} />
        </>
      ) : (
        <>
          <CoinIcon width={size} height={size} />
          <span className={className}>{displayTokenAmount(amount)}</span>
        </>
      )}
    </div>
  )
}
