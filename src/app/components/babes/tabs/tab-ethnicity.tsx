import { TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ChatbotType } from "@/app/lib/generated/models/ChatbotType"
import { Ethnicity } from "@/app/lib/generated"
import { StyleType } from "./tab-style"
import { ethnicityGuard } from "./tab-guards"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"
import { ReactNode } from "react"

const realisticEthnicitySelections: Record<
  Ethnicity,
  { src: string; title: ReactNode }
> = {
  [Ethnicity.Caucasian]: {
    src: "/images/babes/realistic/ethnicity/caucasian.png",
    title: <Trans>Caucasian</Trans>,
  },
  [Ethnicity.Asian]: {
    src: "/images/babes/realistic/ethnicity/asian.png",
    title: <Trans>Asian</Trans>,
  },
  [Ethnicity.Black]: {
    src: "/images/babes/realistic/ethnicity/black.png",
    title: <Trans>Black</Trans>,
  },
  [Ethnicity.Indian]: {
    src: "/images/babes/realistic/ethnicity/indian.png",
    title: <Trans>Indian</Trans>,
  },
  [Ethnicity.Arab]: {
    src: "/images/babes/realistic/ethnicity/arab.png",
    title: <Trans>Arab</Trans>,
  },
  [Ethnicity.Latina]: {
    src: "/images/babes/realistic/ethnicity/latina.png",
    title: <Trans>Latina</Trans>,
  },
}

const animeEthnicitySelections: Record<
  Ethnicity,
  { src: string; title: ReactNode }
> = {
  [Ethnicity.Caucasian]: {
    src: "/images/babes/anime/ethnicity/caucasian.png",
    title: <Trans>Caucasian</Trans>,
  },
  [Ethnicity.Asian]: {
    src: "/images/babes/anime/ethnicity/asian.png",
    title: <Trans>Asian</Trans>,
  },
  [Ethnicity.Black]: {
    src: "/images/babes/anime/ethnicity/black.png",
    title: <Trans>Black</Trans>,
  },
  [Ethnicity.Indian]: {
    src: "/images/babes/anime/ethnicity/indian.png",
    title: <Trans>Indian</Trans>,
  },
  [Ethnicity.Arab]: {
    src: "/images/babes/anime/ethnicity/arab.png",
    title: <Trans>Arab</Trans>,
  },
  [Ethnicity.Latina]: {
    src: "/images/babes/anime/ethnicity/latina.png",
    title: <Trans>Latina</Trans>,
  },
}

export const ethnicitySelections: Record<
  StyleType,
  Record<Ethnicity, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticEthnicitySelections,
  [ChatbotType.Fantasy]: realisticEthnicitySelections,
  [ChatbotType.Anime]: animeEthnicitySelections,
}

export default function TabStyles() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  if (!ethnicityGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Ethnicity}
      className={`
        relative flex w-full flex-1 flex-col items-center

        data-[state=inactive]:hidden
      `}
    >
      <FormHeading
        text={<Trans>Choose Ethnicity</Trans>}
        className={missingInputs && !request.ethnicity ? "text-secondary" : ""}
      />
      <ToggleGroup
        className={cn(
          `
            grid h-full w-full flex-1 grid-cols-2 gap-2 pb-2

            md:grid-cols-3
          `,
          {
            "animate-shake": missingInputs && !request.ethnicity,
          },
        )}
        type="single"
        value={request.ethnicity as Ethnicity}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            ethnicity: value as Ethnicity,
          }))
        }}
      >
        {Object.entries(ethnicitySelections[request.type as StyleType]).map(
          ([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-image-card"}
              badgeText={selection.title}
              value={key}
              key={key}
              className="aspect-square"
            >
              <Image
                src={selection.src}
                fill
                sizes="33vw"
                className="rounded-lg object-cover object-top"
                alt={key}
              />
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>
    </TabsContent>
  )
}
