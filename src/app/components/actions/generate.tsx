import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import Wand from "@/components/icons/generated/Wand"
import { Trans } from "@lingui/react/macro"

export default function Generate({ chatbotID }: { chatbotID: string }) {
  const MotionButton = motion(Button)

  return (
    <Link id="reels-generate-button" href={`/generator?character=${chatbotID}`}>
      <MotionButton
        variant={"secondary"}
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
          <Trans>Generate</Trans>
        </motion.span>
        <Wand className="absolute right-2 text-white" height={22} width={22} />
      </MotionButton>
    </Link>
  )
}
