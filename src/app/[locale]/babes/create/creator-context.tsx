"use client"
import { createContext, useContext, useEffect, useState } from "react"
import {
  BabeCreationStorageKey,
  PostCustomChatBotPayloadOptional,
} from "./creator-tabs"
import { useWebSocket } from "@/app/context/websocket"

interface CreatorContextType {
  request: PostCustomChatBotPayloadOptional
  setRequest: React.Dispatch<
    React.SetStateAction<PostCustomChatBotPayloadOptional>
  >
  newRequest: PostCustomChatBotPayloadOptional
  missingInputs: boolean
  setMissingInputs: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreatorContext = createContext<CreatorContextType>({
  request: {
    age: 18,
    specialFeatures: [],
  },
  setRequest: () => {},
  newRequest: {
    age: 18,
    specialFeatures: [],
  },
  missingInputs: false,
  setMissingInputs: () => {},
})

export const useCreatorContext = () => {
  return useContext(CreatorContext)
}

export const CreatorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [request, setRequest] = useState<PostCustomChatBotPayloadOptional>({})
  const [missingInputs, setMissingInputs] = useState<boolean>(false)
  const { clientID } = useWebSocket()

  useEffect(() => {
    if (typeof window === "undefined" || !clientID) return

    const savedRequest = localStorage.getItem(BabeCreationStorageKey)
    setRequest(
      savedRequest
        ? JSON.parse(savedRequest)
        : { clientId: clientID, age: 18, specialFeatures: [] },
    )
  }, [clientID])

  const newRequest = {
    clientId: clientID,
    age: 18,
    specialFeatures: [],
  }

  return (
    <CreatorContext.Provider
      value={{
        request,
        setRequest,
        newRequest,
        missingInputs,
        setMissingInputs,
      }}
    >
      {children}
    </CreatorContext.Provider>
  )
}
