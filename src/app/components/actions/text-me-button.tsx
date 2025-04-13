"use client"
import { useUser } from "@/app/context/user"
import { isSignedUp } from "@/app/lib/user-guard"
import { PaperPlaneUp } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "motion/react"
import { useDialogs } from "@/app/context/dialog"
import { Trans } from "@lingui/react/macro"

export default function TextMeButton({ chatbotID }: { chatbotID: string }) {
  const { user } = useUser()
  const MotionButton = motion(Button)
  const dialogs = useDialogs()

  return (
    <Link
      id="reels-text-me-button"
      href={isSignedUp(user) ? `/messages/${chatbotID}` : "#"}
      onClick={() => {
        if (!isSignedUp(user)) dialogs.setSignupOpen(true)
      }}
    >
      <MotionButton
        className={`relative flex h-8 items-center overflow-hidden rounded-full`}
        initial={{ width: 40 }}
        whileInView={{ width: 100 }}
        transition={{ delay: 3, duration: 0.5, ease: "easeInOut" }}
      >
        <motion.span
          className="pr-5"
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Trans>Text me!</Trans>
        </motion.span>
        <PaperPlaneUp
          className="absolute right-2 text-white"
          height={22}
          width={22}
        />
      </MotionButton>
    </Link>
  )
}
