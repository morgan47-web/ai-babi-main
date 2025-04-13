/* eslint-disable readable-tailwind/sort-classes */
import { Button } from "@/components/ui/button"
import { ReactNode, useState } from "react"
import SubscriptionBenefits from "../banner/subscription-benefits"
import { BenefitsType } from "../banner/benefit-types"
import SubscriptionCountdown from "../banner/countdown"
import { X } from "lucide-react"
export default function ChatLimitNotification({
  content,
  heading,
  displayBenefits,
  displayCountdown,
  isClosable,
  buttonContent,
  onClick,
}: {
  content: ReactNode
  heading?: ReactNode
  displayBenefits: boolean
  displayCountdown: boolean
  buttonContent: ReactNode
  isClosable: boolean
  onClick: () => void
}) {
  const [isClosed, setIsClosed] = useState(false)
  if (isClosed) return null
  return (
    <>
      <div
        className={`
          relative flex mb-[15px] min-h-[90px] w-full flex-col gap-2 rounded-xl
          bg-[#1B1B1D] px-[20px] py-[16px] text-sm
        `}
      >
        {isClosable && (
          <Button
            className="absolute top-0 right-0 p-1"
            variant={"ghost"}
            onClick={() => setIsClosed(true)}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
        {heading && (
          <div className="text-white leading-[20px] text-lg">{heading}</div>
        )}
        <div className={`text-start w-full text-tertiary-text`}>{content}</div>
        {displayBenefits && (
          <SubscriptionBenefits
            type={BenefitsType.chat}
            hideButton={true}
            className="w-full pb-2"
          />
        )}
        <div className={`flex flex-col flex-1 items-center`}>
          <Button
            className={`
              h-7 rounded-full border border-trigger-border bg-trigger font-bold
              w-full

              md:w-1/2
            `}
            onClick={onClick}
          >
            <p className="text-l/8 p-3">{buttonContent}</p>
          </Button>
          {displayCountdown && <SubscriptionCountdown />}
        </div>
      </div>
    </>
  )
}
