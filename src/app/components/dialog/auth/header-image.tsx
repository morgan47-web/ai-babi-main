"use client"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Trans } from "@lingui/react/macro"

export const HeaderImageType = {
  login: {
    title: <Trans>Welcome back!</Trans>,
    subtitle: <Trans>Chat, create, have fun.</Trans>,
    image: "/images/signup-image.jpg",
  },
  signup: {
    title: <Trans>Join our community.</Trans>,
    subtitle: <Trans>Chat, create, have fun.</Trans>,
    image: "/images/signup-image.jpg",
  },
}

export default function HeaderImage({
  type,
}: {
  type: keyof typeof HeaderImageType
}) {
  const isSmallPhone = useMediaQuery("(max-height: 768px)")

  return (
    <div
      className={cn(
        `relative h-[300px] w-full flex-1 items-center justify-center`,
        { hidden: isSmallPhone },
      )}
    >
      <div
        className={`
          absolute relative left-0 top-0 z-50 h-[80%] w-full rounded-lg
          bg-gradient-to-b from-[rgba(0,0,0,0.98)] from-[6.23%]
          to-[rgba(11,12,20,0)]
        `}
      >
        <div
          className={`
            relative left-6 top-[20%] flex flex-col justify-center space-y-2
          `}
        >
          <h1
            className={`
              w-full text-[36px] font-bold leading-[40px] text-shadow-md
            `}
          >
            {HeaderImageType[type].title}
          </h1>
          <p className="w-[200px] font-bold leading-[24px] text-shadow-md">
            {HeaderImageType[type].subtitle}
          </p>
        </div>
      </div>
      <Image
        src={HeaderImageType[type].image}
        alt="Signup Image"
        fill
        sizes="100vw"
        className="rounded-t-lg object-cover"
      />
    </div>
  )
}
