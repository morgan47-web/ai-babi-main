import { TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ChatbotType } from "@/app/lib/generated/models/ChatbotType"
import { EyeColor, HairColor, HairStyle } from "@/app/lib/generated"
import { StyleType } from "./tab-style"
import { hairGuard } from "./tab-guards"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect } from "react"
import { Trans } from "@lingui/react/macro"

const realisticHairStyleSelections: Record<
  HairStyle,
  { src: string; title: ReactNode }
> = {
  [HairStyle.Straight]: {
    src: "/images/babes/realistic/hair_style/straight.png",
    title: <Trans>Straight</Trans>,
  },
  [HairStyle.Short]: {
    src: "/images/babes/realistic/hair_style/short.png",
    title: <Trans>Short</Trans>,
  },
  [HairStyle.Braids]: {
    src: "/images/babes/realistic/hair_style/braids.png",
    title: <Trans>Braids</Trans>,
  },
  [HairStyle.Bun]: {
    src: "/images/babes/realistic/hair_style/bun.png",
    title: <Trans>Bun</Trans>,
  },
  [HairStyle.Curly]: {
    src: "/images/babes/realistic/hair_style/curly.png",
    title: <Trans>Curly</Trans>,
  },
  [HairStyle.Ponytail]: {
    src: "/images/babes/realistic/hair_style/ponytail.png",
    title: <Trans>Ponytail</Trans>,
  },
}

const animeHairStyleSelections: Record<
  HairStyle,
  { src: string; title: ReactNode }
> = {
  [HairStyle.Straight]: {
    src: "/images/babes/anime/hair_style/straight.png",
    title: <Trans>Straight</Trans>,
  },
  [HairStyle.Short]: {
    src: "/images/babes/anime/hair_style/short.png",
    title: <Trans>Short</Trans>,
  },
  [HairStyle.Braids]: {
    src: "/images/babes/anime/hair_style/braids.png",
    title: <Trans>Braids</Trans>,
  },
  [HairStyle.Bun]: {
    src: "/images/babes/anime/hair_style/bun.png",
    title: <Trans>Bun</Trans>,
  },
  [HairStyle.Curly]: {
    src: "/images/babes/anime/hair_style/curly.png",
    title: <Trans>Curly</Trans>,
  },
  [HairStyle.Ponytail]: {
    src: "/images/babes/anime/hair_style/ponytail.png",
    title: <Trans>Ponytail</Trans>,
  },
}

export const hairStyleSelections: Record<
  StyleType,
  Record<HairStyle, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticHairStyleSelections,
  [ChatbotType.Fantasy]: animeHairStyleSelections,
  [ChatbotType.Anime]: animeHairStyleSelections,
}

const realisticHairColorSelections: Record<
  HairColor,
  { src: string; title: ReactNode }
> = {
  [HairColor.Blonde]: {
    src: "/images/babes/realistic/hair_color/blonde.png",
    title: <Trans>Blonde Hair</Trans>,
  },
  [HairColor.Brunette]: {
    src: "/images/babes/realistic/hair_color/brunette.png",
    title: <Trans>Brunette Hair</Trans>,
  },
  [HairColor.Black]: {
    src: "/images/babes/realistic/hair_color/black.png",
    title: <Trans>Black Hair</Trans>,
  },
  [HairColor.Pink]: {
    src: "/images/babes/realistic/hair_color/pink.png",
    title: <Trans>Pink Hair</Trans>,
  },
  [HairColor.Redhead]: {
    src: "/images/babes/realistic/hair_color/redhead.png",
    title: <Trans>Redhead</Trans>,
  },
  [HairColor.Blue]: {
    src: "/images/babes/realistic/hair_color/blue.png",
    title: <Trans>Blue Hair</Trans>,
  },
}

const animeHairColorSelections: Record<
  HairColor,
  { src: string; title: ReactNode }
> = {
  [HairColor.Blonde]: {
    src: "/images/babes/anime/hair_color/blonde.png",
    title: <Trans>Blonde Hair</Trans>,
  },
  [HairColor.Brunette]: {
    src: "/images/babes/anime/hair_color/brunette.png",
    title: <Trans>Brunette Hair</Trans>,
  },
  [HairColor.Black]: {
    src: "/images/babes/anime/hair_color/black.png",
    title: <Trans>Black Hair</Trans>,
  },
  [HairColor.Pink]: {
    src: "/images/babes/anime/hair_color/pink.png",
    title: <Trans>Pink Hair</Trans>,
  },
  [HairColor.Redhead]: {
    src: "/images/babes/anime/hair_color/redhead.png",
    title: <Trans>Redhead</Trans>,
  },
  [HairColor.Blue]: {
    src: "/images/babes/anime/hair_color/blue.png",
    title: <Trans>Blue Hair</Trans>,
  },
}

export const hairColorSelections: Record<
  StyleType,
  Record<HairColor, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticHairColorSelections,
  [ChatbotType.Fantasy]: animeHairColorSelections,
  [ChatbotType.Anime]: animeHairColorSelections,
}

const realisticEyeColorSelections: Record<
  EyeColor,
  { src: string; title: ReactNode }
> = {
  [EyeColor.Blue]: {
    src: "/images/babes/realistic/eye_color/blue.png",
    title: <Trans>Blue Eyes</Trans>,
  },
  [EyeColor.Brown]: {
    src: "/images/babes/realistic/eye_color/brown.png",
    title: <Trans>Brown Eyes</Trans>,
  },
  [EyeColor.Green]: {
    src: "/images/babes/realistic/eye_color/green.png",
    title: <Trans>Green Eyes</Trans>,
  },
}

const animeEyeColorSelections: Record<
  EyeColor,
  { src: string; title: ReactNode }
> = {
  [EyeColor.Blue]: {
    src: "/images/babes/anime/eye_color/blue.png",
    title: <Trans>Blue Eyes</Trans>,
  },
  [EyeColor.Brown]: {
    src: "/images/babes/anime/eye_color/brown.png",
    title: <Trans>Brown Eyes</Trans>,
  },
  [EyeColor.Green]: {
    src: "/images/babes/anime/eye_color/green.png",
    title: <Trans>Green Eyes</Trans>,
  },
}

export const eyeColorSelections: Record<
  StyleType,
  Record<EyeColor, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticEyeColorSelections,
  [ChatbotType.Fantasy]: animeEyeColorSelections,
  [ChatbotType.Anime]: animeEyeColorSelections,
}

export default function TabHair() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  useEffect(() => {
    // scroll to missing inputs
    if (missingInputs && !request.looks?.hairStyle) {
      document
        .getElementById("hair-style-toggle")
        ?.scrollIntoView({ behavior: "smooth" })
    } else if (missingInputs && !request.looks?.hairColor) {
      document
        .getElementById("hair-color-toggle")
        ?.scrollIntoView({ behavior: "smooth" })
    } else if (missingInputs && !request.looks?.eyeColor) {
      document
        .getElementById("eye-color-toggle")
        ?.scrollIntoView({ behavior: "smooth" })
    }
  }, [missingInputs, request])

  if (!hairGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Hair}
      className={`relative flex w-full flex-1 flex-col items-center`}
    >
      <FormHeading
        id="hair-style-toggle"
        text={<Trans>Choose Hair Style</Trans>}
        className={
          missingInputs && !request.looks?.hairStyle ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn("grid h-full w-full flex-1 grid-cols-3 gap-2 pb-2", {
          "animate-shake": missingInputs && !request.looks?.hairStyle,
        })}
        type="single"
        value={request.looks?.hairStyle}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            looks: {
              ...prev.looks,
              hairStyle: value as HairStyle,
            },
          }))
        }}
      >
        {Object.entries(hairStyleSelections[request.type as StyleType]).map(
          ([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-image-card"}
              value={key}
              badgeText={selection.title}
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

      <FormHeading
        id="hair-color-toggle"
        text={<Trans>Choose Hair Color</Trans>}
        className={
          missingInputs && !request.looks?.hairColor ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn(`grid w-full flex-1 grid-cols-3 gap-2 pb-2`, {
          "animate-shake": missingInputs && !request.looks?.hairColor,
        })}
        type="single"
        value={request.looks?.hairColor}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            looks: {
              ...prev.looks,
              hairColor: value as HairColor,
            },
          }))
        }}
      >
        {Object.entries(hairColorSelections[request.type as StyleType]).map(
          ([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-image-card"}
              badgeText={selection.title}
              value={key}
              key={key}
              className={`
                aspect-square

                md:h-auto
              `}
            >
              <Image
                src={selection.src}
                fill
                sizes="30vw"
                className="rounded-lg object-cover object-top"
                alt={key}
              />
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>

      <FormHeading
        id="eye-color-toggle"
        text={<Trans>Choose Eye Color</Trans>}
        className={
          missingInputs && !request.looks?.eyeColor ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn("grid w-full flex-1 grid-cols-3 gap-2 pb-2", {
          "animate-shake": missingInputs && !request.looks?.eyeColor,
        })}
        type="single"
        value={request.looks?.eyeColor}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            looks: {
              ...prev.looks,
              eyeColor: value as EyeColor,
            },
          }))
        }}
      >
        {Object.entries(eyeColorSelections[request.type as StyleType]).map(
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
                className="rounded-lg object-cover object-center"
                alt={key}
              />
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>
    </TabsContent>
  )
}
