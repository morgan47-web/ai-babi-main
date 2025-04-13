"use client"

import React, { createContext, useContext } from "react"
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast"
import { Toast, ToastHandle, ToastVariant } from "@/components/ui/toast"

export interface ToasterContextValue {
  addMessage: (
    id: string,
    variant: ToastVariant,
    title: string,
    message: string,
    action?: React.ReactNode,
  ) => void
}

const ToasterContext = createContext<ToasterContextValue>({
  addMessage: () => {},
})

export function useToaster() {
  return useContext(ToasterContext)
}

export default function ToasterProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const toastRef = React.useRef<ToastHandle>(null)

  return (
    <ToasterContext.Provider
      value={{
        addMessage: (id, variant, title, message, action) => {
          toastRef.current?.publish(id, variant, title, message, action)
        },
      }}
    >
      <ToastProvider swipeDirection="right">
        {children}
        <Toast duration={15000} ref={toastRef}></Toast>
        <ToastViewport className="fixed right-[20px] top-[40px] z-50" />
      </ToastProvider>
    </ToasterContext.Provider>
  )
}
