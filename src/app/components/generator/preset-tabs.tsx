import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PresetOption from "./preset"
import { presets } from "./presets"
import { PromptTemplate } from "./templates"
import React from "react"
import { Trans } from "@lingui/react/macro"

export const TABS = {
  Outfit: {
    title: <Trans>Outfit</Trans>,
    value: "Outfit",
  },
  Scene: {
    title: <Trans>Scene</Trans>,
    value: "Scene",
  },
  Pose: {
    title: <Trans>Pose</Trans>,
    value: "Pose",
  },
  Accessories: {
    title: <Trans>Accessories</Trans>,
    value: "Accessories",
  },
}

interface Props {
  onClick: (preset: PromptTemplate) => void
}

const presetBoxStyle = `
            flex space-x-1 overflow-x-auto p-[2px] scrollbar-thin
            scrollbar-thumb-primary/70 scrollbar-track-background
          `

export default function PresetTabs({ onClick }: Props) {
  return (
    <Tabs defaultValue={TABS.Outfit.value} className="">
      <TabsList className="space-x-4">
        {Object.values(TABS).map((tab) => (
          <TabsTrigger variant={"underline"} key={tab.value} value={tab.value}>
            <p className={`text-center font-bold`}>{tab.title}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={TABS.Outfit.value}>
        <div className={presetBoxStyle}>
          {presets.outfit.map((preset) => (
            <PresetOption
              key={preset.prompt}
              preset={preset}
              onClick={onClick}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value={TABS.Accessories.value}>
        <div className={presetBoxStyle}>
          {presets.accessories.map((preset) => (
            <PresetOption
              key={preset.prompt}
              preset={preset}
              onClick={onClick}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value={TABS.Scene.value}>
        <div className={presetBoxStyle}>
          {presets.scene.map((preset) => (
            <PresetOption
              key={preset.prompt}
              preset={preset}
              onClick={onClick}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value={TABS.Pose.value}>
        <div className={presetBoxStyle}>
          {presets.pose.map((preset) => (
            <PresetOption
              key={preset.prompt}
              preset={preset}
              onClick={onClick}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
