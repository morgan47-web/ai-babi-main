import { CoinIcon } from "@/components/icons/generated"

export default function DiamondPile() {
  return (
    <div className="relative m-2 h-[44px] w-[81px]">
      <CoinIcon
        height={35}
        width={35}
        className="absolute left-0 top-[50%] -translate-y-1/2 transform"
      />
      <CoinIcon
        height={44}
        width={44}
        className={`
          absolute bottom-0 left-[50%] top-0 z-[2] -translate-x-1/2 transform
        `}
      />
      <CoinIcon
        height={35}
        width={35}
        className="absolute bottom-0 right-0 top-0 top-[50%] -translate-y-1/2"
      />
    </div>
  )
}
