"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getConversation } from "@/app/lib/server/actions/actions"
import { ChatMessage } from "@/app/lib/generated"
import Chat from "@/app/components/messages/chat"

export default function ChatRoomPage() {
  const [profilePicture, setProfilePicture] = useState<string>("")
  const [profileVideo, setProfileVideo] = useState<string>("")
  const [chatbotName, setChatbotName] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatbotAge, setChatbotAge] = useState<number>(0)
  const [chatbotBio, setChatbotBio] = useState<string>("")
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const params = useParams()
  const chatbotID = params.chatbotID as string

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getConversation(chatbotID)
        if (response.ok && response.data) {
          setChatMessages(response.data.messages)
          setProfilePicture(response.data.chatbotProfilePicture)
          setProfileVideo(response.data.chatbotProfileVideo)
          setChatbotName(response.data.chatbotName)
          setChatbotAge(response.data.chatbotAge)
          setChatbotBio(response.data.chatbotBio)
          setIsPublic(response.data.isPublic)
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error)
      }
    }

    fetchMessages()
  }, [chatbotID])

  return (
    <Chat
      chatbotID={chatbotID}
      profilePicture={profilePicture}
      profilePictureVideo={profileVideo ? profileVideo : profilePicture}
      chatbotName={chatbotName}
      chatbotAge={chatbotAge}
      chatbotBio={chatbotBio}
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
      isPublic={isPublic}
    />
  )
}
