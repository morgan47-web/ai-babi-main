"use client"

import CharacterAvatar from "@/app/components/character/character-avatar"
import CharacterTabs from "@/app/components/character/character-tabs"
import React from "react"
import { getChatbot } from "@/app/lib/server/actions/actions"
import ChatbotActions from "@/app/components/character/chatbot-actions"
import StoriesContainer from "@/app/components/stories/stories-container"
import { GetChatbotResponse } from "@/app/lib/generated"
import { useParams } from "next/navigation"
import { Trans } from "@lingui/react/macro"

function Character({
  chatbotResponse,
}: {
  chatbotResponse: GetChatbotResponse
}) {
  const [chatbot, setChatbot] =
    React.useState<GetChatbotResponse>(chatbotResponse)
  const { chatbotID } = useParams<{ chatbotID: string }>()

  React.useEffect(() => {
    const fetchChatbot = async () => {
      const resp = await getChatbot(chatbotID)
      if (resp.ok && resp.data) {
        setChatbot(resp.data)
      }
    }

    fetchChatbot()
  }, [chatbotID])

  return (
    <>
      <div
        className={`
          mx-auto max-w-4xl

          md:w-[50%]
        `}
      >
        <div className="flex flex-col gap-2 px-3">
          <div className="flex items-center justify-between">
            <CharacterAvatar
              variant="active"
              size="xl"
              image={chatbot.profilePicture}
              name={chatbot.displayName}
            />

            {/* Stats */}
            <div className="text-center">
              <div className="font-bold">{chatbot.posts?.length}</div>
              <div className="text-muted-foreground">
                <Trans>posts</Trans>
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold">
                {chatbot.posts?.reduce((acc, post) => acc + post.likes, 0)}
              </div>
              <div className="text-muted-foreground">
                <Trans>likes</Trans>
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold">
                {chatbot.posts?.reduce(
                  (acc, post) => acc + ((post.price ?? 0) > 0 ? 1 : 0),
                  0,
                ) +
                  chatbot.galleries?.reduce(
                    (acc, gallery) => acc + gallery.imageCount,
                    0,
                  )}
              </div>
              <div className="text-muted-foreground">
                <Trans>NSFW</Trans>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="flex text-xl font-bold">{chatbot.displayName}</h1>
            </div>
            <p className="text-muted-foreground">
              {chatbot.characterAge} <Trans>years</Trans>
            </p>
            <p className="text-sm break-word whitespace-pre-wrap">
              {chatbot.fullBio}
            </p>
          </div>

          <ChatbotActions
            chatbotID={chatbotID}
            chatbotName={chatbot.displayName}
            unlockAllPrice={chatbot.unlockAllPrice}
          />
        </div>

        <StoriesContainer stories={chatbot.galleries} />

        <CharacterTabs chatbot={chatbot} />
      </div>
    </>
  )
}

export default Character
