"use client"

import { ChatMessage } from "@/app/lib/generated"
import ChatbotMessage from "./chatbot-message"
import UserMessage from "./user-message"
import { ReactElement, useEffect, useState } from "react"
import { MessageLoader } from "../loader/message-loader"

interface Props {
  message: ChatMessage
  avatarURL: string
  chatbotName: string
  chatbotID: string
  messageDelay?: number
  loadingDelay?: number
  isPublicChatbot: boolean
}

export function BaseMessage({
  message,
  avatarURL,
  chatbotName,
  chatbotID,
  messageDelay,
  loadingDelay,
  isPublicChatbot,
}: Props) {
  const [node, setNode] = useState<ReactElement | null>(null)

  useEffect(() => {
    const getMessage = () => {
      switch (message.role) {
        case "user":
          return <UserMessage key={message.requestId} message={message} />
        case "assistant":
          return (
            <ChatbotMessage
              key={message.requestId}
              message={message}
              avatarURL={avatarURL}
              chatbotName={chatbotName}
              chatbotID={chatbotID}
              isPublicChatbot={isPublicChatbot}
            />
          )
        default:
          return null
      }
    }

    const setMessageLoader = (delay: number) => {
      setNode(<MessageLoader sender={chatbotName} avatarURL={avatarURL} />)
      setTimeout(() => {
        setNode(getMessage())
      }, delay)
    }

    if (messageDelay && loadingDelay && loadingDelay > 0) {
      setTimeout(() => {
        setMessageLoader(messageDelay - loadingDelay)
      }, loadingDelay)
    } else if (messageDelay) {
      setMessageLoader(messageDelay)
    } else {
      setNode(getMessage())
    }
  }, [
    loadingDelay,
    messageDelay,
    avatarURL,
    chatbotName,
    chatbotID,
    message,
    isPublicChatbot,
  ])

  return node
}

export default BaseMessage
