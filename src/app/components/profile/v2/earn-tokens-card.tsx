"use client"
import { useToaster } from "@/app/context/toaster"
import { useUser } from "@/app/context/user"
import { APIResponse } from "@/app/lib/server/actions/actions"
import { isSubscribedOrTrial } from "@/app/lib/user-guard"
import { CoinIcon } from "@/components/icons/generated"
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Trans } from "@lingui/react/macro"
import { Accordion, AccordionItem } from "@radix-ui/react-accordion"
import { CaretDownIcon } from "@radix-ui/react-icons"
import React from "react"

interface EarnTokensCardProps {
  title: React.ReactNode
  description: React.ReactNode
  tokens: string
  claimable: boolean
  claimed?: boolean
  link?: string
  onClaim?: () => Promise<APIResponse<void>>
  instructions?: React.ReactNode
}

export default function EarnTokensCard({
  title,
  description,
  tokens,
  claimable,
  claimed,
  link,
  instructions,
  onClaim,
}: EarnTokensCardProps) {
  const [loading, setLoading] = React.useState(false)
  const [isClaimed, setIsClaimed] = React.useState(claimed)
  const { user, setUser } = useUser()
  const toaster = useToaster()

  const handleClaim = async () => {
    if (!onClaim) return
    if (!isSubscribedOrTrial(user)) {
      toaster.addMessage(
        "claim-error",
        "error",
        "",
        "You need to be subscribed to claim this reward.",
      )
      return
    }

    setLoading(true)
    if (!isClaimed && link) {
      window.open(link, "_blank", "noreferrer")
    }
    onClaim()
      .then((resp) => {
        if (resp.ok) {
          setUser((user) => {
            if (user) {
              return {
                ...user,
                subscription: {
                  ...user.subscription,
                  tokens: user.subscription.tokens + 10 * parseInt(tokens),
                },
              }
            }
            return user
          })
          setIsClaimed(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div
      className={`
        grid w-full grid-cols-[1fr_auto] items-center gap-2 self-start
        justify-self-center rounded-[16px] bg-card px-4 py-2 outline
        outline-[1px] outline-divider transition-transform

        md:py-4
      `}
    >
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-lg font-bold text-white-secondary">{title}</p>
        <p className="text-sm text-border">{description}</p>
      </div>
      <div className="flex h-full flex-1 flex-col items-end justify-start gap-1">
        <div className="flex items-center gap-1 text-xl">
          <CoinIcon height={20} width={20} />
          {tokens}
        </div>
        {claimable && (
          <div className="flex flex-1 items-start gap-1">
            <Button
              variant={"toggle"}
              disabled={isClaimed}
              className={`
                h-7 bg-border/50 px-4 py-2

                disabled:bg-divider
              `}
              onClick={handleClaim}
            >
              {loading ? (
                <Spinner className="h-5 w-5" />
              ) : isClaimed ? (
                <Trans>Claimed</Trans>
              ) : (
                <Trans>Claim</Trans>
              )}
            </Button>
          </div>
        )}
      </div>
      {instructions && (
        <Accordion type="single" className="col-span-2" collapsible>
          <AccordionItem
            value="instructions"
            className="flex flex-col items-end text-border"
          >
            <AccordionTrigger className="flex items-center gap-2 p-2">
              Instructions
              <CaretDownIcon className="h-4 w-4" />
            </AccordionTrigger>
            <AccordionContent>{instructions}</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}
