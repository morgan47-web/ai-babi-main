"use client"

import { Wand } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import { TextArea } from "@/components/ui/text-area"
import PresetTabs from "./preset-tabs"
import PromptTemplateDialog from "./template-dialog"
import Image from "next/image"
import React, { useEffect } from "react"
import { PromptTemplate } from "./templates"
import {
  isInitialized,
  isSubscribedOrTrial,
  signupGuard,
} from "@/app/lib/user-guard"
import { useUser } from "@/app/context/user"
import { useDialogs } from "@/app/context/dialog"
import { generateImage } from "@/app/lib/server/actions/actions"
import { v4 as uuidv4 } from "uuid"
import {
  eventGeneratorStatusChange,
  useWebSocket,
  WebSocketMessage,
} from "@/app/context/websocket"
import { useRouter } from "next/navigation"
import { useToaster } from "@/app/context/toaster"
import { Spinner } from "@/components/ui/spinner"
import ImageNumberToggle from "./image-number-toggle"
import { PremiumDialogType } from "../dialog/dialog-types"
import { Trans, useLingui } from "@lingui/react/macro"
import { ListChatbotItem } from "@/app/lib/generated/models/ListChatbotItem"

interface Props {
  selectedChatbot: ListChatbotItem
  promptRef: React.RefObject<HTMLTextAreaElement>
}

export default function GeneratorActions({
  selectedChatbot,
  promptRef,
}: Props) {
  const { t } = useLingui()
  const { user } = useUser()
  const dialogs = useDialogs()
  const { clientID } = useWebSocket()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [imageCount, setImageCount] = React.useState("1")
  const [loading, setLoading] = React.useState(false)
  const { subscribe, unsubscribe } = useWebSocket()
  const router = useRouter()
  const toaster = useToaster()

  const handlePromptReplace = (selected: PromptTemplate) => {
    if (!promptRef.current) return
    promptRef.current.value = selected.prompt
  }

  const handlePromptAppend = (selected: PromptTemplate) => {
    if (!promptRef.current) return
    if (promptRef.current.value.length > 0) {
      promptRef.current.value += `, ${selected.prompt}`
    } else {
      promptRef.current.value = selected.prompt
    }
  }

  const handleButtonClick = async () => {
    if (!promptRef.current || promptRef.current?.value == "") {
      toaster.addMessage(
        uuidv4(),
        "error",
        t`Try again!`,
        t`Prompt cannot be empty.`,
      )
      return
    }

    setLoading(true)
    console.log({
      query: promptRef.current?.value ?? "",
      numberOfImages: parseInt(imageCount),
      requestId: uuidv4(),
      clientId: clientID,
      style: "amateur",
    })
    await generateImage(selectedChatbot.id, {
      query: promptRef.current?.value ?? "",
      numberOfImages: parseInt(imageCount),
      requestId: uuidv4(),
      clientId: clientID,
      style: "amateur",
    })
    setLoading(false)
  }

  const storePromptText = () => {
    if (promptRef.current) {
      localStorage.setItem("savedPrompt", promptRef.current.value)
    }
  }

  useEffect(() => {
    const onGenerationStatusChange = (data: WebSocketMessage) => {
      switch (data.status) {
        case "queued": {
          setLoading(false)
          if (!isSubscribedOrTrial(user))
            router.push("/generator/queue?eta=" + encodeURIComponent(data.eta))
          break
        }
        case "daily_free_limit_reached":
          setLoading(false)
          dialogs.setPremiumOpen(true, PremiumDialogType.generator)
          break
        case "moderation_exception":
        case "failed":
        case "max_concurency_reached":
          setLoading(false)
          break
      }
    }

    subscribe(eventGeneratorStatusChange, onGenerationStatusChange)

    return () => {
      unsubscribe(eventGeneratorStatusChange, onGenerationStatusChange)
    }
  }, [subscribe, unsubscribe, toaster, router, user, dialogs])

  return (
    <>
      <div className="w-full space-y-2 px-2">
        <p className="px-2 font-bold">
          <Trans>Image generation prompt</Trans>
        </p>
        <div className="relative h-[160px]">
          <TextArea
            id="generator-prompt"
            ref={promptRef}
            onChange={storePromptText}
            defaultValue={
              localStorage.getItem("savedPrompt") ??
              "lying on bed with her legs spread legs and bare boobs with flirty smile."
            }
            className="h-full resize-none"
            placeholder={t`Type your prompt here...`}
          />
          <Button
            id="generator-templates-button"
            variant="ghost"
            className={`
              absolute bottom-1 right-1 h-8 rounded-full bg-trigger font-bold
              shadow-[0px_0px_8px_0px] shadow-secondary/60
            `}
            onClick={() => {
              if (!signupGuard(user, dialogs)) return
              setDialogOpen(true)
            }}
          >
            <Trans>Templates</Trans>
            <Image
              src={"/images/hot-pepper.png"}
              alt="hot pepper"
              height={20}
              width={20}
            />
          </Button>
          <PromptTemplateDialog
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
            onConfirm={(selected) => {
              handlePromptReplace(selected)
            }}
          />
        </div>

        <PresetTabs onClick={handlePromptAppend} />

        <p>
          <Trans>Number of images</Trans>
        </p>
        <ImageNumberToggle
          imageCount={imageCount}
          setImageCount={setImageCount}
        />
      </div>
      <div className="sticky bottom-0 w-full p-2 backdrop-blur-lg">
        <Button
          id="generator-generate-button"
          className={`
            h-10 w-full items-center justify-center gap-2 rounded-full
          `}
          onClick={(e) => {
            if (!signupGuard(user, dialogs)) e.preventDefault()
            if (!selectedChatbot.unlocked) {
              dialogs.setPremiumOpen(
                true,
                PremiumDialogType.premium_babes,
                selectedChatbot.profilePicture,
              )
              e.preventDefault()
              return
            }
            handleButtonClick()
          }}
          disabled={loading || !isInitialized(user)}
        >
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <>
              <Trans>Start generating</Trans>
              <Wand height={22} width={22} />
            </>
          )}
        </Button>
      </div>
    </>
  )
}
