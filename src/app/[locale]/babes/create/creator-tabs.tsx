"use client"

import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import TabStyles from "../../../components/babes/tabs/tab-style"
import { PostCustomChatBotPayload } from "@/app/lib/generated/models/PostCustomChatBotPayload"
import TabEthnicity from "../../../components/babes/tabs/tab-ethnicity"
import TabBody from "../../../components/babes/tabs/tab-body"
import TabHair from "../../../components/babes/tabs/tab-hair"
import TabPersonality from "../../../components/babes/tabs/tab-personality"
import TabOccupation from "../../../components/babes/tabs/tab-occupation"
import TabRelationship from "../../../components/babes/tabs/tab-relationship"
import TabSummary from "../../../components/babes/tabs/tab-summary"
import { cn } from "@/lib/utils"
import {
  testNextTabGuard,
  testTabGuard,
} from "../../../components/babes/tabs/tab-guards"
import { useToaster } from "@/app/context/toaster"
import { v4 as uuidv4 } from "uuid"
import { createCustomChatbot } from "@/app/lib/server/actions/actions"
import { Spinner } from "@/components/ui/spinner"
import { signupGuard } from "@/app/lib/user-guard"
import { useDialogs } from "@/app/context/dialog"
import { useUser } from "@/app/context/user"
import { StatusCodes } from "http-status-codes"
import { PremiumDialogType } from "@/app/components/dialog/dialog-types"
import { useCreatorContext } from "./creator-context"
import { Trans } from "@lingui/react/macro"
import TabArtStyle from "@/app/components/babes/tabs/tab-art-style"
import { ChatbotType } from "@/app/lib/generated/models/ChatbotType"
import TabFantasyRace from "@/app/components/babes/tabs/tab-fantasy-race"
import CreatorTabList from "./creator-tab-list"
import { useWebSocket } from "@/app/context/websocket"

export const BabeCreationStorageKey = "babeCreation"

export type PostCustomChatBotPayloadOptional = Partial<
  Omit<PostCustomChatBotPayload, "looks"> & {
    looks?: Partial<PostCustomChatBotPayload["looks"]>
  }
>

export enum TABS {
  Style = "Style",
  ArtStyle = "ArtStyle",
  Ethnicity = "Ethnicity",
  FantasyRace = "FantasyRace",
  Body = "Body",
  Hair = "Hair",
  Personality = "Personality",
  Occupation = "Occupation",
  Relationship = "Relationship",
  Summary = "Summary",
}

export const tabFilter = (request: PostCustomChatBotPayloadOptional) => {
  return (tab: TABS) => {
    if (request.type === ChatbotType.Anime && tab === TABS.FantasyRace) {
      return
    }
    if (
      request.type === ChatbotType.Fantasy &&
      (tab === TABS.Occupation ||
        tab === TABS.Ethnicity ||
        tab === TABS.ArtStyle)
    ) {
      return
    }
    if (
      request.type === ChatbotType.Girls &&
      (tab === TABS.FantasyRace || tab === TABS.ArtStyle)
    ) {
      return
    }
    return tab
  }
}

export default function CreatorTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const toaster = useToaster()
  const { clientID } = useWebSocket()
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<TABS>(
    (searchParams.get("tab") as TABS) || TABS.Style,
  )
  const { user } = useUser()
  const dialogs = useDialogs()
  const { request, setMissingInputs } = useCreatorContext()
  const scrollRef = useRef<HTMLDivElement>(null)

  const getNewTab = (direction: "increase" | "decrease") => {
    const tabValues = Object.values(TABS).filter(tabFilter(request))
    const currentIndex = tabValues.indexOf(tab as TABS)
    const modifier = direction === "increase" ? 1 : -1
    const newIndex = currentIndex + modifier
    return tabValues[newIndex]
  }

  const changeTabValue = (direction: "increase" | "decrease") => {
    const newTab = getNewTab(direction)
    setTab(newTab)
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("tab", newTab)
    router.push(`${pathname}?${params.toString()}`)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  useEffect(() => {
    setTab((searchParams.get("tab") as TABS) || TABS.Style)
  }, [searchParams])

  useEffect(() => {
    if (Object.keys(request).length === 0) return
    if (!testTabGuard(tab, request)) setTab(TABS.Style)
  }, [tab, setTab, request])

  useEffect(() => {
    if (Object.keys(request).length !== 0 && typeof window !== "undefined") {
      localStorage.setItem(BabeCreationStorageKey, JSON.stringify(request))
    }
  }, [request])

  return (
    <div className={`relative h-full w-full`}>
      <Tabs
        className={`
          relative grid h-full w-full grid-cols-1 grid-rows-[auto_1fr_auto]
        `}
        value={tab}
        onValueChange={(value) => {
          setTab(value as TABS)
          const params = new URLSearchParams(Array.from(searchParams.entries()))
          params.set("tab", value)
          router.push(`${pathname}?${params.toString()}`)
        }}
      >
        <CreatorTabList request={request} />

        <div
          ref={scrollRef}
          className={`
            flex h-full flex-col items-center overflow-y-auto px-2

            2xl:px-[25%]

            md:px-[15%]
          `}
        >
          <TabStyles />
          <TabArtStyle />
          <TabFantasyRace />
          <TabEthnicity />
          <TabBody />
          <TabHair />
          <TabPersonality />
          <TabOccupation />
          <TabRelationship />
          <TabSummary />
        </div>

        <div
          className={`
            bottom-0 grid w-full grid-cols-5 items-center justify-center gap-2
            p-2 backdrop-blur-lg

            2xl:px-[35%]

            md:px-[15%]
          `}
        >
          {tab !== TABS.Style && (
            <Button
              onClick={() => changeTabValue("decrease")}
              variant={"toggle"}
              className={`
                col-span-2 h-10 w-full rounded-full bg-trigger-border

                hover:bg-trigger-border/80
              `}
            >
              <Trans>Previous</Trans>
            </Button>
          )}
          {tab !== TABS.Summary && (
            <Button
              onClick={() => {
                if (!testNextTabGuard(tab, request)) {
                  setMissingInputs(true)
                  // Reset missing inputs after 500ms to allow repeated css animation
                  setTimeout(() => setMissingInputs(false), 500)
                  return
                }
                changeTabValue("increase")
              }}
              variant={"secondary"}
              className={cn(
                `
                  col-span-3 h-10 w-full rounded-full

                  disabled:bg-trigger-border
                `,
                {
                  "col-span-5": tab === TABS.Style,
                },
              )}
            >
              <Trans>Next</Trans>
            </Button>
          )}
          {tab === TABS.Summary && (
            <Button
              variant={"secondary"}
              className="col-span-3 h-10 w-full rounded-full"
              onClick={async () => {
                if (!signupGuard(user, dialogs)) return
                request.clientId = clientID
                setLoading(true)
                await createCustomChatbot(request as PostCustomChatBotPayload)
                  .then((resp) => {
                    setLoading(false)
                    if (resp.error && resp.code === StatusCodes.CONFLICT) {
                      dialogs.setPremiumOpen(true, PremiumDialogType.babes)
                      return
                    }
                    if (resp.error) {
                      toaster.addMessage(uuidv4(), "error", "", resp.error)
                      return
                    }
                    toaster.addMessage(
                      uuidv4(),
                      "info",
                      "",
                      "Your babe will be ready soon",
                    )
                    router.push("/babes/queue")
                  })
                  .catch((err) => {
                    console.error(err)
                  })
              }}
            >
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                <Trans>Create for FREE</Trans>
              )}
            </Button>
          )}
        </div>
      </Tabs>
    </div>
  )
}
