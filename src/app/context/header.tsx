"use client"

import React, { createContext, useContext, useState } from "react"

export interface Header {
  title: string
}

interface HeaderContextValue {
  historyOverride?: string
  setHistoryOverride: React.Dispatch<React.SetStateAction<string | undefined>>
}

const HeaderContext = createContext<HeaderContextValue>({
  historyOverride: undefined,
  setHistoryOverride: () => {},
})

export function useHeader() {
  return useContext(HeaderContext)
}

export default function HeaderProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [historyOverride, setHistoryOverride] = useState<string>()

  return (
    <HeaderContext.Provider value={{ historyOverride, setHistoryOverride }}>
      {children}
    </HeaderContext.Provider>
  )
}
