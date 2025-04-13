"use client"

import { useDialogs } from "@/app/context/dialog"
import { useToaster } from "@/app/context/toaster"
import { useUser } from "@/app/context/user"
import {
  eventCustomChatbotStatusChange,
  eventGeneratorStatusChange,
  eventRemainingTokens,
  useWebSocket,
  WebSocketMessage,
} from "@/app/context/websocket"
import { buttonVariants } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { Trans, useLingui } from "@lingui/react/macro"
import { formatDistanceToNow } from "date-fns"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export default function GeneratorNotifications() {
  const { t } = useLingui()
  const { addMessage } = useToaster()
  const { subscribe, unsubscribe } = useWebSocket()
  const dialogs = useDialogs()
  const pathname = usePathname()
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    const onGenerationStatusChange = (data: WebSocketMessage) => {
      switch (data.status) {
        case "queued": {
          const message = data.eta
            ? t`Estimated time: ` + formatDistanceToNow(data.eta)
            : t`Generation in progress`
          addMessage(uuidv4(), "info", t`Generation in progress`, message)
          break
        }
        case "finished":
          user?.setUser((state) => ({
            ...state,
            hasUnseenImages: true,
          }))
          addMessage(
            "id",
            "success",
            t`Your image is ready!`,
            "",
            <ToastAction
              onClick={() => {
                router.push("/gallery?tab=Generated")
              }}
              altText="action"
              className={cn(
                buttonVariants({
                  variant: "toggle",
                  className: `rounded-md bg-trigger`,
                }),
              )}
            >
              <Trans>View</Trans>
            </ToastAction>,
          )
          break
        case "failed":
          addMessage(
            "id",
            "error",
            "Error",
            t`Something went wrong. Please try again`,
          )
          break
        case "moderation_exception":
          addMessage("id", "error", "Error", t`Please try different prompt!`)
          break
        case "not_enough_tokens":
          addMessage(
            "id",
            "error",
            t`You're out of tokens`,
            "",
            <ToastAction
              onClick={() => {
                dialogs.setBuyTokensOpen(true)
              }}
              altText="Buy tokens"
              className={cn(
                buttonVariants({
                  variant: "toggle",
                  className: `rounded-md bg-trigger`,
                }),
              )}
            >
              <Trans>Buy Tokens</Trans>
            </ToastAction>,
          )
          break
        case "max_concurency_reached":
          addMessage(
            "id",
            "error",
            "Error",
            t`Free users can only generate one image at a time`,
          )
          break
      }
    }

    const onCustomChatbotGenerationStatusChange = (data: WebSocketMessage) => {
      switch (data.status) {
        case "finished":
          if (pathname.includes("/babes/queue"))
            router.push(`/babes/${data.chatbot_id}`)
          else {
            addMessage(
              "id",
              "success",
              t`Your babe is ready!`,
              "",
              <ToastAction
                altText="action"
                onClick={() => {
                  router.push(`/babes/${data.chatbot_id}`)
                }}
                className={cn(
                  buttonVariants({
                    variant: "toggle",
                    className: `rounded-md bg-trigger`,
                  }),
                )}
              >
                View
              </ToastAction>,
            )
          }
          break
        case "failed":
          addMessage(
            "id",
            "error",
            "Error",
            t`Something went wrong. Please try again`,
          )
          break
      }
    }

    const onRemainingTokens = (message: WebSocketMessage) => {
      user?.setUser((prev) => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          tokens: parseInt(message.remaining_tokens),
        },
      }))
    }

    subscribe(eventRemainingTokens, onRemainingTokens)
    subscribe(eventGeneratorStatusChange, onGenerationStatusChange)
    subscribe(
      eventCustomChatbotStatusChange,
      onCustomChatbotGenerationStatusChange,
    )

    return () => {
      unsubscribe(eventRemainingTokens, onRemainingTokens)
      unsubscribe(eventGeneratorStatusChange, onGenerationStatusChange)
      unsubscribe(
        eventCustomChatbotStatusChange,
        onCustomChatbotGenerationStatusChange,
      )
    }
  })

  return null
}
