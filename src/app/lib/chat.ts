import { useEffect } from "react"
import { ChatMessage } from "./generated/models"

export function scrollToBottom(ref: React.RefObject<HTMLDivElement>) {
  if (ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight
  }
}

export function useScrollToBottom(
  ref: React.RefObject<HTMLDivElement>,
  messages: ChatMessage[],
) {
  useEffect(() => {
    scrollToBottom(ref)
  }, [ref, messages])
}

export function formatMessageTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}
