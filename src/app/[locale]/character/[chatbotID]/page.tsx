import React from "react"
import { getChatbot } from "@/app/lib/server/actions/actions"
import { CharacterProfileSkeleton } from "@/app/components/skeletons/character"
import { initLingui } from "@/app/initLingui"
import Character from "./character"

async function CharacterPage({
  params,
}: {
  params: Promise<{ chatbotID: string; locale: string }>
}) {
  const { chatbotID, locale } = await params
  initLingui(locale)
  const response = await getChatbot(chatbotID)
  if (!response.ok || !response.data) {
    return <CharacterProfileSkeleton />
  }
  const chatbot = response.data!

  return <Character chatbotResponse={chatbot} />
}

export default CharacterPage
