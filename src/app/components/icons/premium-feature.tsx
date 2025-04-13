"use client"
import { useUser } from "@/app/context/user"
import { isSubscribedOrTrial } from "@/app/lib/user-guard"
import Crown from "@/components/icons/generated/Crown"

export default function PremiumFeature() {
  const user = useUser()
  return (
    <>
      {!isSubscribedOrTrial(user?.user) ? (
        <Crown
          height={14}
          width={14}
          className="absolute right-0 top-0 rotate-[30deg]"
        />
      ) : null}
    </>
  )
}
