"use client"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import Image from "next/image"

interface Props {
  onclick?: () => void
}
export default function BecomePremiumHeading({ onclick }: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <>
      {isDesktop ? (
        <Image
          src={"/images/get-60-percent-off.jpg"}
          alt="Become Premium"
          fill
          sizes="80vw"
          className={`
            cursor-pointer border border-divider object-cover

            md:rounded-[16px]
          `}
          onClick={onclick}
        />
      ) : (
        <Image
          src={"/images/get-60-percent-off-mobile.jpg"}
          alt="Become Premium"
          fill
          sizes="100vw"
          className={`
            cursor-pointer border border-divider object-cover

            md:rounded-[16px]
          `}
          onClick={onclick}
        />
      )}
    </>
  )
}
