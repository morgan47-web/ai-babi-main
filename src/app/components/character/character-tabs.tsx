"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { AudioLines, ImageIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { GetChatbotResponse } from "@/app/lib/generated"
import PostTab from "./post-tab"
import { useState } from "react"

const characterTabs = [
  {
    title: "Posts",
    href: "",
    Icon: ImageIcon,
    soon: false,
  },
  {
    title: "Audio",
    href: "audio",
    Icon: AudioLines,
    soon: true,
  },
  {
    title: "Video",
    href: "video",
    Icon: VideoIcon,
    soon: true,
  },
]

interface CharacterTabsProps {
  chatbot: GetChatbotResponse
}

function CharacterTabs({ chatbot }: CharacterTabsProps) {
  const [activeTab, setActiveTab] = useState("Posts")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="pb-1">
      <TabsList>
        {characterTabs
          .filter((tab) => tab.href !== "saved")
          .map((tab) => {
            const isActive = tab.title === activeTab
            return (
              <TabsTrigger
                key={tab.href}
                value={tab.title}
                disabled={tab.soon}
                className={cn(
                  `
                    group relative mt-8 flex h-full w-full cursor-pointer
                    flex-col items-center justify-center gap-2 p-0
                  `,
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
                asChild
              >
                <div className="flex w-full flex-col items-center">
                  <div className="flex items-center gap-x-2">
                    <div className="relative">
                      <tab.Icon />
                      {tab.soon && (
                        <Badge
                          variant="secondary"
                          className={`
                            absolute -right-6 -top-3 rounded-full border-none
                            bg-orange-500 py-.5 text-[8px] text-white

                            md:-right-14
                          `}
                        >
                          Soon
                        </Badge>
                      )}
                    </div>
                    <p
                      className={`
                        hidden text-xs font-bold uppercase tracking-widest

                        md:block
                      `}
                    >
                      {tab.title}
                    </p>
                  </div>
                </div>
              </TabsTrigger>
            )
          })}
      </TabsList>

      <PostTab posts={chatbot.posts} />
    </Tabs>
  )
}

export default CharacterTabs
