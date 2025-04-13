"use client"
import { useEffect, useState } from "react"
import { ConversationsList } from "./conversations-list"
import { getConversations } from "@/app/lib/server/actions/actions"
import { ConversationListItem } from "@/app/lib/generated"

function ConversationsListWrapper() {
  const [conversations, setConversations] = useState<ConversationListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchConversations() {
      try {
        const response = await getConversations()
        if (mounted && response.code < 400 && response.data) {
          setConversations(response.data.conversations)
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchConversations()

    return () => {
      mounted = false
    }
  }, [])

  if (isLoading) {
    return null
  }

  return <ConversationsList conversations={conversations} />
}

export default ConversationsListWrapper
