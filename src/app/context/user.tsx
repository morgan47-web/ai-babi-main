"use client"

import React, { createContext, useContext, useState } from "react"
import { uninitializedUser } from "./user-initializer"
import { PaymentProviderType } from "../lib/generated/models/PaymentProviderType"
import { Preference } from "../lib/preferences"

export interface UserState {
  initialized: boolean
  id: string
  role: "user" | "admin" | "editor"
  email: string
  oauth: boolean
  username: string
  isFirstLogin: boolean
  feedback_given: boolean
  subscription: {
    psp?: PaymentProviderType
    price?: number
    status: "inactive" | "trial" | "active" | "canceled" | null
    tokens: number
    termEnd?: Date
    externalId?: string
  }
  preferences: {
    displayGirls?: boolean | null
    displayAnime?: boolean | null
    displayUnlockWarning?: boolean | null
    usernameUpdated?: boolean | null
  }
  mainPreference: Preference
  hasUnseenImages: boolean
}

export interface UserContextValue {
  user: UserState
  setUser: React.Dispatch<React.SetStateAction<UserState>>
}

const UserContext = createContext<UserContextValue>({
  user: uninitializedUser,
  setUser: () => {},
})

export function useUser() {
  return useContext(UserContext)
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<UserState>(uninitializedUser)

  return (
    <UserContext.Provider value={{ user: state, setUser: setState }}>
      {children}
    </UserContext.Provider>
  )
}
