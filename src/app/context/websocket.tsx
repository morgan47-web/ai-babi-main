"use client"

import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useCallback,
  useEffect,
} from "react"
import { useUser } from "./user"
import { v4 as uuidv4 } from "uuid"

export const eventChatMessage = "chat_message"
export const eventChatMessageFailed = "chat_message_failed"
export const eventChatImageGenerationStatus =
  "chat_image_generation_status_change"
export const eventRemainingTokens = "remaining_tokens"
export const eventSubscriptionPopup = "chat_subscription_popup"
export const eventChatFreemiumLimit = "chat_freemium_limit"
export const eventChatImageOutOfTokens = "chat_image_out_of_tokens"
export const eventChatOutOfTokens = "chat_out_of_tokens"
export const eventChatImageFreemiumLimit = "chat_image_freemium_limit"

export const eventGeneratorStatusChange = "image_generation_status_change"
export const eventCustomChatbotStatusChange =
  "custom_chatbot_generation_status_change"

export interface WebSocketMessage {
  event_name: string
  [key: string]: string
}

type ContextType = {
  clientID: string
  subscribe: (
    eventName: string,
    callback: (data: WebSocketMessage) => void,
  ) => void
  unsubscribe: (
    eventName: string,
    callback: (data: WebSocketMessage) => void,
  ) => void
}

const defaultValue: ContextType = {
  clientID: "",
  subscribe: () => {},
  unsubscribe: () => {},
}

const WebSocketContext = createContext<ContextType>(defaultValue)

export const useWebSocket = () => useContext(WebSocketContext)

interface ProviderProps {
  children: ReactNode
}

export const WebSocketProvider: React.FC<ProviderProps> = ({ children }) => {
  const user = useUser()
  const ws = useRef<WebSocket>()
  const [clientID, setClientID] = React.useState("")
  const eventMap = useRef<Map<string, Array<(data: WebSocketMessage) => void>>>(
    new Map(),
  )

  const subscribe = (
    eventName: string,
    callback: (data: WebSocketMessage) => void,
  ) => {
    eventMap.current.set(eventName, [
      ...(eventMap.current.get(eventName) ?? []),
      callback,
    ])
  }

  const unsubscribe = (
    eventName: string,
    callback: (data: WebSocketMessage) => void,
  ) => {
    const handlers = eventMap.current.get(eventName)
    if (!handlers) {
      return
    }
    eventMap.current.set(
      eventName,
      handlers.filter((handler) => handler !== callback),
    )
  }

  const getEventHandlers = (eventName: string) =>
    eventMap.current.get(eventName)

  const processMessage = useCallback((messageEvent: MessageEvent) => {
    try {
      const json = JSON.parse(messageEvent.data)
      const eventName = json.event_name
      if (!eventName) {
        console.log("WS: No event_name in message")
        return
      }
      const handlers = getEventHandlers(eventName)
      if (!handlers) {
        console.log(`WS: No callback registered for event ${eventName}`)
        return
      }
      for (const handler of handlers ?? []) {
        handler(json)
      }
    } catch {
      console.log("WS: Error parsing JSON")
    }
  }, [])

  const connectWebSocket = useCallback(() => {
    const baseURL = process.env.NEXT_PUBLIC_ZPPS_WS_URL
    const newClientID = uuidv4()
    setClientID(newClientID)
    const newWs = new WebSocket(`${baseURL}/v1/chat/ws/${newClientID}`)

    newWs.onopen = () => {
      console.log(`Internal WS open for ${newClientID}`)
    }
    newWs.onclose = () => {
      console.log(`Internal WS closed for ${newClientID}`)
      ws.current = undefined
      setTimeout(() => {
        console.log("Attempting to reconnect...")
        connectWebSocket()
      }, 2000)
    }
    newWs.onmessage = processMessage

    ws.current = newWs
  }, [processMessage])

  useEffect(() => {
    if (!user?.user?.initialized) {
      console.log("Cannot open ws: user not initialized")
      return
    }

    if (!ws.current) {
      connectWebSocket()
    }
  }, [user?.user?.initialized, processMessage, connectWebSocket])

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.onclose = () => {
          console.log(`Internal WS closed`)
        }
        ws.current.close()
        ws.current = undefined
      }
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{ subscribe, unsubscribe, clientID }}>
      {children}
    </WebSocketContext.Provider>
  )
}
