/* eslint-disable readable-tailwind/sort-classes */
import { Button } from "@/components/ui/button"
import { ReactNode, useEffect, useState } from "react"
import { X } from "lucide-react"
import Cookies from "js-cookie"

export default function ChatTopBanner({
  content,
  heading,
  buttonContent,
  onClick,
  closeAfterMs,
  showOnce,
}: {
  content: ReactNode
  heading?: ReactNode
  buttonContent: ReactNode
  onClick: () => void
  closeAfterMs?: number
  showOnce?: boolean
}) {
  const [isClosed, setIsClosed] = useState(false)
  const [alreadyShown, setAlreadyShown] = useState(false)

  useEffect(() => {
    if (closeAfterMs) {
      const timer = setTimeout(() => {
        setIsClosed(true)
      }, closeAfterMs)

      // Cleanup the timer when the component unmounts or `closeAfterMs` changes
      return () => clearTimeout(timer)
    }
  }, [closeAfterMs])
  // Check and set the cookie only once when the component mounts
  useEffect(() => {
    if (!showOnce) return
    const isAlreadyShown = Cookies.get(ChatTopBanner.name) === "true"
    setAlreadyShown(isAlreadyShown)
  }, [showOnce])

  useEffect(() => {
    if (isClosed) {
      Cookies.set(ChatTopBanner.name, "true")
      console.log("set alreadyShown to true")
    }
  }, [isClosed])

  if (isClosed || alreadyShown) return null

  return (
    <>
      <div
        className={`
          sticky top-0 z-20 flex mb-[15px] flex-col gap-2 rounded-xl px-[20px]
          py-[16px] text-sm max-w-[600px] m-2 transform 0.3s ease-out
          bg-[#1B1B1D]/80 backdrop-blur-md

          lg:mx-auto lg:max-w-[800px]
        `}
      >
        <Button
          className="absolute top-0 right-0 p-1"
          variant={"ghost"}
          onClick={() => setIsClosed(true)}
        >
          <X className="w-3 h-3" />
        </Button>

        {heading && (
          <div className="text-white leading-[20px] text-lg">{heading}</div>
        )}
        <div className={`text-start w-full text-tertiary-text`}>{content}</div>

        <div className={`flex flex-col flex-1 items-center`}>
          <Button
            className={`
              rounded-full border border-trigger-border bg-trigger font-bold
              w-full p-3

              md:w-1/2
            `}
            onClick={onClick}
          >
            <p className="text-l/8">{buttonContent}</p>
          </Button>
        </div>
      </div>
    </>
  )
}
