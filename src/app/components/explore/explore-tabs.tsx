"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CharacterGrid from "../character/character-grid"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { GetChatbotListResponse } from "@/app/lib/generated"
import { Anime, Girls } from "@/components/icons/generated"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/user"
import { Trans } from "@lingui/react/macro"
import { isInitialized } from "@/app/lib/user-guard"
import { PostsGridSkeleton } from "../skeletons/posts"
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

interface ExploreTabsProps {
  chatbots: GetChatbotListResponse
}

export default function ExploreTabs({ chatbots }: ExploreTabsProps) {
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [tab, setTab] = useState<string>(
    (searchParams.get("tab") as string) || "anime",
  )

  useEffect(() => {
    if (!isInitialized(user)) return
    if (searchParams.get("tab")) return
    if (user?.mainPreference === Preference.anime) setTab(TABS.Anime.value)
    else if (user?.mainPreference === Preference.girls) setTab(TABS.Girls.value)
  }, [user, searchParams])

  const getIcon = (tab: string) => {
    switch (tab) {
      case TABS.Girls.value:
        return <Girls height={20} width={20} />
      case TABS.Anime.value:
        return <Anime height={20} width={20} />
    }
  }

  if (!isInitialized(user)) return <PostsGridSkeleton />

  return (
    <Tabs
      value={tab}
      className="mt-0 w-full pt-0"
      onValueChange={(value) => {
        setTab(value)
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        params.set("tab", value)
        router.push(`${pathname}?${params.toString()}`)
      }}
    >
      <div
        className={`
          z-30 bg-background pt-0

          md:hidden
        `}
      >
        <TabsList className={`h-12 p-2`}>
          {Object.values(TABS).map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`group h-full w-full flex-col !p-0`}
            >
              <div
                className={`
                  relative flex h-full w-full flex-col items-center
                  justify-center
                `}
              >
                <div
                  className={`inline-flex items-center justify-center gap-2`}
                >
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
      </div>

      <TabsContent value={TABS.Girls.value} className="mt-0.5">
        <CharacterGrid items={chatbots.girls} />
      </TabsContent>

      <TabsContent value={TABS.Anime.value} className="mt-0.5">
        <CharacterGrid items={chatbots.anime} />
      </TabsContent>
    </Tabs>
  )
}
