"use client"
import { occupationSelections } from "@/app/components/babes/tabs/tab-occupation"
import { relationshipSelections } from "@/app/components/babes/tabs/tab-relationship"
import { ListCustomChatbotItem } from "@/app/lib/generated/models/ListCustomChatbotItem"
import Wand from "@/components/icons/generated/Wand"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Trans } from "@lingui/react/macro" // Added import
import { raceSelections } from "./tabs/tab-fantasy-race"

export default function CustomCharacterCardActions({
  chatbot,
}: {
  chatbot: ListCustomChatbotItem
}) {
  const { push } = useRouter()

  return (
    <div
      className={`
        absolute bottom-0 left-0 right-0 flex flex-col items-start gap-2 p-2
        pt-6
      `}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.7) 80%)",
      }}
    >
      <p className="leading-[16px]">{chatbot.displayName}</p>
      <span className="text-xs leading-[16px]">
        {`${chatbot.characterAge} years, `}
        {chatbot.occupation && occupationSelections[chatbot.occupation]}
        {chatbot.fantasyRace && raceSelections[chatbot.fantasyRace].title}
        {" - "}
        {relationshipSelections[chatbot.relationshipStatus].title}
      </span>
      <div className="flex w-full gap-2">
        <Button
          variant={"secondary"}
          className="h-8 flex-1 gap-2 p-2"
          onClick={() => push(`/generator?character=${chatbot.id}`)}
        >
          <Trans>Generate</Trans>
          <Wand width={20} height={20} />
        </Button>
        <Button
          className="h-8 flex-1 gap-2 p-2"
          onClick={() => push(`/messages/${chatbot.id}`)}
        >
          <Trans>Chat</Trans>
          <MessageCircle width={20} height={20} />
        </Button>
      </div>
    </div>
  )
}
