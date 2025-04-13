import { TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ChatbotType } from "@/app/lib/generated/models/ChatbotType"
import { Badge } from "@/components/ui/badge"
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Trans } from "@lingui/react/macro"

export type StyleType = (typeof ChatbotType)[keyof Omit<
  typeof ChatbotType,
  "Boys" | "Internal"
>]

export const styleSelections: Record<
  StyleType,
  { src: string; title: ReactNode }
> = {
  [ChatbotType.Fantasy]: {
    src: "/images/babes/fantasy/style_2.jpg",
    title: <Trans>Fantasy</Trans>,
  },
  [ChatbotType.Anime]: {
    src: "/images/babes/anime/style/style.jpg",
    title: <Trans>Anime</Trans>,
  },
  [ChatbotType.Girls]: {
    src: "/images/babes/realistic/style/style.jpg",
    title: <Trans>Realistic</Trans>,
  },
}

export default function TabStyles() {
  const { request, setRequest, newRequest, missingInputs } = useCreatorContext()

  return (
    <TabsContent
      value={TABS.Style}
      className="relative flex w-full flex-1 flex-col items-center"
    >
      <FormHeading
        text={<Trans>Choose a style</Trans>}
        className={
          missingInputs && !request.looks?.bodyType ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn(
          `
            grid h-full w-full flex-1 grid-cols-2 gap-2 pb-2

            md:grid-cols-3
          `,
          {
            "animate-shake": missingInputs && !request.type,
          },
        )}
        type="single"
        value={request.type as ChatbotType}
        onValueChange={(value) => {
          if (!value) return
          setRequest({
            ...newRequest,
            type: value as ChatbotType,
          })
        }}
      >
        {Object.entries(styleSelections).map(([key, selection]) => (
          <ToggleGroupItem
            variant={"secondary-image-card"}
            value={key}
            badgeText={selection.title}
            key={key}
          >
            <Image
              src={selection.src}
              fill
              sizes="40vw"
              className="rounded-lg object-cover object-center"
              alt={key}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className={`flex w-full flex-col items-center justify-center p-2`}>
        <Badge
          variant={"secondary"}
          className={`
            h-8 rounded-full

            md:text-md
          `}
        >
          <Trans>{request.age} years old</Trans>
        </Badge>
        <div
          className={`
            flex w-full items-center justify-center gap-4 px-2

            md:px-[10%] md:py-4
          `}
        >
          <p>18+</p>
          <Slider
            defaultValue={[18]}
            max={55}
            min={18}
            step={1}
            onValueChange={(val) => {
              setRequest((prev) => ({
                ...prev,
                age: val[0],
              }))
            }}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <p>55+</p>
        </div>
      </div>
    </TabsContent>
  )
}
