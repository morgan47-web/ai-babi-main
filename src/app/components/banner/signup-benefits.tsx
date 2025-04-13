"use client"
import { useDialogs } from "@/app/context/dialog"
import Checkmark from "@/components/icons/generated/Checkmark"
import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"

export default function SignupBenefits() {
  const dialogs = useDialogs()

  return (
    <div
      className={`
        absolute bottom-0 left-0 right-0 m-4 mb-10 flex flex-col items-start
        justify-center gap-4 text-shadow-lg

        md:items-center
      `}
    >
      <h1
        className={`
          text-start text-2xl font-bold text-white

          md:text-center md:text-5xl
        `}
      >
        <Trans>Do you want to unlock unlimited reels and much more?</Trans>
      </h1>
      <div
        className={`
          grid grid-cols-2 grid-cols-[30px_1fr] gap-2

          md:text-xl
        `}
      >
        <Checkmark className="text-primary" />
        <p>
          <Trans>Unlock unlimited reels</Trans>
        </p>
        <Checkmark className="text-primary" />
        <p>
          <Trans>Generate AI NSFW pictures</Trans>
        </p>
        <Checkmark className="text-primary" />
        <p>
          <Trans>Chat with AI babes</Trans>
        </p>
        <Checkmark className="text-primary" />
        <p>
          <Trans>Create your own babe</Trans>
        </p>
      </div>
      <Button
        variant={"secondary"}
        className="h-10 w-full rounded-full"
        onClick={() => dialogs.setSignupOpen(true)}
      >
        <Trans>SIGN UP FOR FREE</Trans>
      </Button>
    </div>
  )
}
