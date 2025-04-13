"use client"

import Carousel from "@/app/components/generator/carousel"
import { GetChatbotListResponse } from "@/app/lib/generated/models/GetChatbotListResponse"
import Anime from "@/components/icons/generated/Anime"
import Girls from "@/components/icons/generated/Girls"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import GeneratorActions from "../../components/generator/generator-actions"
import React, { useEffect, useRef } from "react"
import { ListChatbotItem } from "@/app/lib/generated"
import { useUser } from "@/app/context/user"
import { Trans } from "@lingui/react/macro"
import { getGenerationTags } from "@/app/lib/server/actions/actions"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Image from "next/image"
import CarouselSkeleton from "@/app/components/skeletons/carousel"
import { isInitialized } from "@/app/lib/user-guard"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { Preference } from "@/app/lib/preferences"

export const TABS = {
  Girls: {
    value: Preference.girls,
    title: <Trans>Realistic</Trans>,
  },
  Anime: {
    value: Preference.anime,
    title: <Trans>Anime</Trans>,
  },
}

function reorderArray<T>(
  array: T[],
  selectedID: string,
  idKey: keyof T,
): T[] | undefined {
  const newArray = array.slice() // Create a shallow copy of the array
  const currentIndex = newArray.findIndex((item) => item[idKey] === selectedID)

  if (currentIndex === -1) {
    return
  }
  const [selectedItem] = newArray.splice(currentIndex, 1)
  newArray.splice(2, 0, selectedItem)

  return newArray
}

export default function GeneratorTabs({
  chatbots,
}: {
  chatbots: GetChatbotListResponse
}) {
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedChatbot, setSelectedChatbot] = React.useState<ListChatbotItem>(
    chatbots.girls[2], // select middle chatbot from carousel by default
  )
  const [girls, setGirls] = React.useState<ListChatbotItem[]>(chatbots.girls)
  const [anime, setAnime] = React.useState<ListChatbotItem[]>(chatbots.anime)
  const [tab, setTab] = React.useState<string>(
    (searchParams.get("tab") as string) || "anime",
  )
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const [remixImage, setRemixImage] = React.useState<string>()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const chatbotID = searchParams.get("character") ?? undefined
    const imageName = searchParams.get("imageName") ?? undefined

    if (!loading || remixImage) {
      return
    }

    const findChatbot = (id: string) => {
      if (chatbots.anime.find((chatbot) => chatbot.id === id)) {
        return chatbots.anime.find((chatbot) => chatbot.id === id)
      }
      return chatbots.girls.find((chatbot) => chatbot.id === id)
    }

    const fetchTagsAndSetState = async (
      chatbotID: string,
      imageName: string,
    ) => {
      const tagsResponse = await getGenerationTags(chatbotID, imageName)
      const { tags, downloadUrl } = tagsResponse.data ?? {}

      if (promptRef.current && tags) {
        promptRef.current.value = tags
      }
      setRemixImage(downloadUrl)
      setLoading(false)
    }

    const updateChatbotSelection = (chatbot?: ListChatbotItem) => {
      if (!chatbot) {
        return
      }

      setSelectedChatbot(chatbot)

      if (imageName) {
        fetchTagsAndSetState(chatbot.id, imageName)
        return
      }

      // Reorder chatbot lists based on selection
      const updatedGirls = reorderArray(chatbots.girls, chatbot.id, "id")
      const updatedAnime = reorderArray(chatbots.anime, chatbot.id, "id")

      if (updatedGirls) {
        setGirls(updatedGirls)
        setTab(TABS.Girls.value)
      }

      if (updatedAnime) {
        setAnime(updatedAnime)
        setTab(TABS.Anime.value)
      }
      setLoading(false)
    }

    if (chatbotID) {
      updateChatbotSelection(findChatbot(chatbotID))
    } else {
      if (!isInitialized(user)) return
      if (searchParams.get("tab")) return
      if (user?.mainPreference === Preference.anime) {
        setTab(TABS.Anime.value)
        setLoading(false)
      } else if (user?.mainPreference === Preference.girls) {
        setTab(TABS.Girls.value)
        setLoading(false)
      }
    }
  }, [chatbots, searchParams, remixImage, user, loading])

  useEffect(() => {
    if (loading) return
    if (!isInitialized(user)) return
    if (user?.mainPreference === Preference.anime) setTab(TABS.Anime.value)
    else if (user?.mainPreference === Preference.girls) setTab(TABS.Girls.value)
  }, [user, loading])

  const getIcon = (tab: string) => {
    switch (tab) {
      case TABS.Girls.value:
        return <Girls height={20} width={20} />
      case TABS.Anime.value:
        return <Anime height={20} width={20} />
    }
  }

  return (
    <div
      className={`
        w-full

        md:max-w-xl
      `}
    >
      {loading ? (
        <CarouselSkeleton />
      ) : remixImage ? (
        <div className="flex justify-center py-3">
          <Image
            src={remixImage}
            alt="Loading..."
            width={200}
            height={300}
            className="rounded-lg object-cover object-center"
          />
        </div>
      ) : (
        <TabsContentContainer
          tab={tab}
          setTab={setTab}
          searchParams={searchParams}
          router={router}
          pathname={pathname as string}
          girls={girls}
          setSelectedChatbot={setSelectedChatbot}
          anime={anime}
          getIcon={getIcon}
        />
      )}

      <GeneratorActions
        selectedChatbot={selectedChatbot}
        promptRef={promptRef}
      />
    </div>
  )
}

function TabsContentContainer({
  tab,
  setTab,
  girls,
  setSelectedChatbot,
  anime,
  getIcon,
}: {
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  searchParams: URLSearchParams
  router: AppRouterInstance
  pathname: string
  girls: ListChatbotItem[]
  setSelectedChatbot: React.Dispatch<React.SetStateAction<ListChatbotItem>>
  anime: ListChatbotItem[]
  getIcon: (tab: string) => React.JSX.Element | undefined
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <Tabs
      className={`w-full items-center space-y-2 px-2`}
      value={tab}
      onValueChange={(value) => {
        setTab(value)
      }}
    >
      <TabsContent value={TABS.Girls.value}>
        <Carousel
          height={isDesktop ? 350 : 250}
          characters={girls}
          setSelected={setSelectedChatbot}
        />
      </TabsContent>

      <TabsContent value={TABS.Anime.value}>
        <Carousel
          height={isDesktop ? 350 : 250}
          characters={anime}
          setSelected={setSelectedChatbot}
        />
      </TabsContent>

      <TabsList className="md:hidden">
        {Object.values(TABS).map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`group h-full w-full flex-col !p-0`}
          >
            <div
              className={`
                relative flex h-full w-full flex-col items-center justify-center
              `}
            >
              <div className={`inline-flex items-center justify-center gap-2`}>
                <div>{getIcon(tab.value)}</div>
                <p
                  className={`
                    text-center font-bold capitalize

                    md:text-lg
                  `}
                >
                  {tab.title}
                </p>
              </div>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
