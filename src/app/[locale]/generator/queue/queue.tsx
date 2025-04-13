"use client"

import { PremiumDialogType } from "@/app/components/dialog/dialog-types"
import { useDialogs } from "@/app/context/dialog"
import {
  eventGeneratorStatusChange,
  useWebSocket,
  WebSocketMessage,
} from "@/app/context/websocket"
import { CheckmarkCircle, People } from "@/components/icons/generated"
import Brush from "@/components/icons/static/Brush"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Trans } from "@lingui/react/macro"

export default function Queue() {
  const dialogs = useDialogs()
  const router = useRouter()
  const [state, setState] = useState<"enqueued" | "running" | "finished">(
    "enqueued",
  )
  const [eta, setEta] = useState<string>("")
  const searchParams = useSearchParams()
  const { subscribe, unsubscribe } = useWebSocket()

  const formatToTime = (eta: string) => {
    return formatDistanceToNow(eta)
  }

  useEffect(() => {
    const onGenerationStatusChange = (message: WebSocketMessage) => {
      switch (message.status) {
        case "running":
          setState("running")
          break
        case "finished":
          setState("finished")
          break
      }
    }

    subscribe(eventGeneratorStatusChange, onGenerationStatusChange)

    return () => {
      unsubscribe(eventGeneratorStatusChange, onGenerationStatusChange)
    }
  })

  useEffect(() => {
    const eta = searchParams.get("eta")
    if (eta) {
      setEta(eta)
    }
  }, [searchParams])

  return (
    <div
      className={`
        flex h-full w-full flex-col items-center justify-center space-y-4
        bg-generator-queue bg-cover bg-center bg-no-repeat
      `}
    >
      <div
        className={`
          grid w-full max-w-[800px] grid-cols-5
          grid-cols-[40px_1fr_40px_1fr_40px] items-center gap-2 px-8

          md:gap-4
        `}
      >
        <People height={40} width={40} color={"hsl(var(--primary))"} />
        <div
          className={cn(`h-[6px] rounded-full transition-all`, {
            "animate-loading-horizontal": state === "enqueued",
            "bg-primary": state !== "enqueued",
          })}
        />
        <Brush
          height={40}
          width={40}
          color1={
            state !== "enqueued" ? "hsl(var(--primary))" : "hsl(var(--border))"
          }
        />
        <div
          className={cn("h-[6px] rounded-full transition-all", {
            "bg-border": state === "enqueued",
            "animate-loading-horizontal": state === "running",
            "bg-primary": state === "finished",
          })}
        />
        <CheckmarkCircle
          height={40}
          width={40}
          color={
            state === "finished" ? "hsl(var(--primary))" : "hsl(var(--border))"
          }
        />
      </div>
      <p className="text-center text-sm">
        <Trans>In the queue..</Trans> <br />{" "}
        <Trans>
          Estimated wait time: {eta ? formatToTime(eta) : "unknown"}
        </Trans>
      </p>
      <p
        className={`
          max-w-[300px] text-center text-sm font-light

          md:max-w-[600px]
        `}
      >
        <Trans>
          In the meantime you can chat with AI babes. Upgrade to Premium to skip
          queue and finish the generation process sooner.
        </Trans>
      </p>
      <Button
        className={`
          h-7 w-[180px] rounded-full bg-accent p-2

          hover:bg-accent/80
        `}
        onClick={() => {
          router.push("/reels")
        }}
      >
        <Trans>Explore babes</Trans>
      </Button>
      <Button
        className="h-7 w-[180px] rounded-full p-2"
        onClick={() => {
          dialogs.setPremiumOpen(true, PremiumDialogType.generator)
        }}
      >
        <Trans>Upgrade</Trans>
      </Button>
    </div>
  )
}
