import { Card } from "@/components/ui/card"
import CharacterAvatar from "@/app/components/character/character-avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ConversationListItem } from "@/app/lib/generated"

export function ConversationsList({
  conversations,
}: {
  conversations: ConversationListItem[]
}) {
  return (
    <div className="flex h-full flex-col border-r border-border/20">
      <main className="flex-1 space-y-2 overflow-y-auto p-2">
        {conversations.map((conversation) => (
          <Link
            href={`/messages/${conversation.chatbotId}`}
            key={conversation.chatbotId}
          >
            <Card
              className={cn(
                `
                  my-1 flex cursor-pointer items-center gap-x-3 border-0 p-2
                  transition
                `,
                {
                  "bg-conversation": conversation.unread,
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
              <div className="min-h-0 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-x-2">
                  <p className="font-semibold">{conversation.displayName}</p>
                  <div className="flex items-center gap-x-1">
                    {conversation.unread && (
                      <div className="h-[4px] w-[4px] rounded-full bg-secondary" />
                    )}
                  </div>
                </div>
                <span className="truncate text-sm text-muted-foreground">
                  {conversation.lastMessage || "No conversations yet"}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  )
}
