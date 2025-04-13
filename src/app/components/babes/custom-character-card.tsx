"use client"

import { ListCustomChatbotItem } from "@/app/lib/generated/models/ListCustomChatbotItem"
import { Eyebrow } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CustomCharacterCardActions from "./custom-character-card-actions"
import DeleteChatbotDialog from "./custom-chatbot-delete-dialog"

export default function CustomCharacterCard({
  chatbot,
}: {
  chatbot: ListCustomChatbotItem
}) {
  const { push } = useRouter()

  return (
    <Card
      className={`
        flex h-full w-full items-center rounded-2 justify-center bg-transparent
      `}
    >
      <div
        className={`
          relative aspect-[10/16] max-h-[800px] w-full rounded-2 max-w-[500px]
          bg-trigger p-2
        `}
      >
        <Image
          src={chatbot.profilePicture}
          fill
          sizes="100vw"
          className="rounded-lg object-cover object-center"
          alt={chatbot.displayName}
        />
        <div className={`absolute right-0 top-0 flex flex-col gap-2 p-2`}>
          <DeleteChatbotDialog
            chatbotID={chatbot.id}
            chatbotName={chatbot.displayName}
          />
          <Button
            variant={"toggle"}
            className="h-[42px] w-[42px] bg-trigger-border !p-0"
            onClick={() => {
              push(`/babes/${chatbot.id}`)
            }}
          >
            <Eyebrow width={24} height={24} />
          </Button>
        </div>
        <CustomCharacterCardActions chatbot={chatbot} />
      </div>
    </Card>
  )
}
