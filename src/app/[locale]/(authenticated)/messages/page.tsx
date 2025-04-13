import CharacterAvatar from "@/app/components/character/character-avatar"
import { getConversations } from "@/app/lib/server/actions/actions"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import NoMessages from "./no-messages"
import { Trans } from "@lingui/react/macro"
import { initLingui } from "@/app/initLingui"

export const dynamic = "force-dynamic"

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale
  initLingui(locale)

  const response = await getConversations()
  if (response.code >= 400) {
    return (
      <>
        <div className="flex w-full items-center">
          <Trans>Failed to fetch conversations</Trans>
        </div>
      </>
    )
  }

  const conversations = response.data?.conversations ?? []
  if (!conversations || conversations.length === 0) {
    return <NoMessages />
  }

  return (
    <>
      <main
        className={`
          w-full flex-1 space-y-2 overflow-y-auto overflow-x-hidden p-2

          md:px-[20%]
        `}
      >
        {conversations.map((conversation) => (
          <Link
            href={`/messages/${conversation.chatbotId}`}
            key={conversation.chatbotId}
          >
            <Card
              className={cn(
                `
                  relative my-1 flex cursor-pointer items-center gap-x-3
                  border-0 p-2 transition

                  md:hover:bg-primary/30
                `,
                {
                  "bg-message": conversation.unread,
                  "bg-background": !conversation.unread,
                },
              )}
            >
              <CharacterAvatar
                variant="default"
                className="aspect-square"
                image={conversation.profilePicture}
                name={conversation.displayName}
                id={"avatar-" + conversation.chatbotId}
              />
              <div className="min-h-0 min-w-0">
                <div className="flex items-center justify-between gap-x-2">
                  <p className="font-semibold">{conversation.displayName}</p>
                  <div className="flex items-center gap-x-1">
                    {conversation.unread && (
                      <div className="h-[4px] w-[4px] rounded-full bg-secondary" />
                    )}
                  </div>
                </div>
                <span
                  className={`
                    box-border block truncate text-sm text-muted-foreground
                  `}
                >
                  {conversation.lastMessage || (
                    <Trans>No conversations yet</Trans>
                  )}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </main>
    </>
  )
}
