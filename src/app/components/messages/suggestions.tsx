"use client"

import { Trans } from "@lingui/react/macro"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

export const chatSuggestions: React.ReactNode[] = [
  // Rolepaying
  <Trans key="trans1">Describe how you would have your way with me</Trans>,
  <Trans key="trans2">What would you do if i was naked right now</Trans>,
  <Trans key="trans3">Do you love being in control?</Trans>,
  <Trans key="trans4">What’s your secret fantasy?</Trans>,

  // Flirty
  <Trans key="trans5">What always makes you cum</Trans>,
  <Trans key="trans6">Do you prefer rough or gentle love?</Trans>,
  <Trans key="trans7">Do you have a dirty secret?</Trans>,

  //Sex
  <Trans key="trans8">Show me how you&apos;d fuck me!</Trans>,

  // Breasts
  <Trans key="trans9">Send me your boobs</Trans>,
  <Trans key="trans10">Let me see your tits.</Trans>,
  <Trans key="trans11">I wanna play with your boobs.</Trans>,

  // Toys
  <Trans key="trans12">Finger yourself</Trans>,
  <Trans key="trans13">Show me your secret toys!</Trans>,
  <Trans key="trans14">Play with yourself!</Trans>,

  // Ass
  <Trans key="trans15">Show me dat ass!</Trans>,
  <Trans key="trans16">Bend over so I can check that ass.</Trans>,
  <Trans key="trans17">Send me your ass</Trans>,

  // Pussy
  <Trans key="trans18">Show me your pussy</Trans>,
  <Trans key="trans19">I wanna see your peach</Trans>,
]

// export interface ChatSuggestionsProps {
//   // handleTrigger: (suggestion: string) => void
// }

export default function ChatSuggestions() {
  const [suggestion, setSuggestion] = useState<React.ReactNode>("")

  const getRandomSuggestion = (): React.ReactNode => {
    const randomIndex = Math.floor(Math.random() * chatSuggestions.length)
    return chatSuggestions[randomIndex]
  }

  useEffect(() => {
    setSuggestion(getRandomSuggestion())
  }, [])

  if (!suggestion) return null

  return (
    <div
      className={`
        sticky bottom-0 box-border grid w-full grid-cols-2 grid-cols-[auto_32px]
        justify-between gap-2 items-between
      `}
    >
      <div
        className={`
          grid min-w-0 grid-cols-2 grid-cols-[20px_1fr] rounded-2xl border
          border-primary bg-card px-2 py-1
        `}
        // onClick={() => handleTrigger(suggestion)}
      >
        <Plus size={20} />
        <span className={`truncate text-sm text-foreground`}>{suggestion}</span>
      </div>
      <div
        className={`
          flex h-[32px] w-[32px] items-center justify-center rounded-full border
          border-primary bg-card
        `}
        onClick={() => setSuggestion(getRandomSuggestion())}
      >
        🎲
      </div>
    </div>
  )
}
