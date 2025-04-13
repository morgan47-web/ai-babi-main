"use client"

import GalleryGrid from "@/app/components/gallery/gallery-grid"
import { useUser } from "@/app/context/user"
import { GeneratedImages, LikedPostImage } from "@/app/lib/generated"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trans } from "@lingui/react/macro"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const TABS = {
  All: {
    value: "All",
    title: <Trans>All</Trans>,
  },
  Generated: {
    value: "Generated",
    title: <Trans>Generated</Trans>,
  },
  Liked: {
    value: "Liked",
    title: <Trans>Liked</Trans>,
  },
}

interface Props {
  liked: LikedPostImage[]
  generated: GeneratedImages[]
}

export default function GalleryTabs({ liked, generated }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user, setUser } = useUser()

  // Get the current tab from search parameters or use the defaultTab
  const tab = (searchParams.get("tab") as string) || "All"

  useEffect(() => {
    if (user.initialized) {
      setUser((prev) => {
        return { ...prev, hasUnseenImages: false }
      })
    }
  }, [user.initialized, setUser])

  return (
    <Tabs
      className="grid h-full w-full grid-rows-[1fr_50px] p-2"
      value={tab}
      onValueChange={(value) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        params.set("tab", value)
        router.push(`${pathname}?${params.toString()}`)
      }}
    >
      <TabsContent value={TABS.All.value} className="flex-1 flex-col">
        <GalleryGrid items={[...generated, ...liked]} />
      </TabsContent>

      <TabsContent value={TABS.Generated.value}>
        <GalleryGrid items={generated} />
      </TabsContent>

      <TabsContent value={TABS.Liked.value}>
        <GalleryGrid items={liked} />
      </TabsContent>

      <TabsList className="sticky bottom-0 bg-background">
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
