import { TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ChatbotType } from "@/app/lib/generated/models/ChatbotType"
import {
  BodyType,
  BreastSize,
  ButtSize,
  SpecialFeatures,
} from "@/app/lib/generated"
import { StyleType } from "./tab-style"
import { bodyGuard } from "./tab-guards"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect } from "react"
import { Trans } from "@lingui/react/macro"

const realisticBodyTypeSelections: Record<
  BodyType,
  { src: string; title: ReactNode }
> = {
  [BodyType.Slim]: {
    src: "/images/babes/realistic/body_type/slim.jpg",
    title: <Trans>Slim</Trans>,
  },
  [BodyType.Athletic]: {
    src: "/images/babes/realistic/body_type/athletic.jpg",
    title: <Trans>Athletic</Trans>,
  },
  [BodyType.Voluptuous]: {
    src: "/images/babes/realistic/body_type/voluptuous.jpg",
    title: <Trans>Voluptuous</Trans>,
  },
  [BodyType.Curvy]: {
    src: "/images/babes/realistic/body_type/curvy.jpg",
    title: <Trans>Curvy</Trans>,
  },
}

const animeBodyTypeSelections: Record<
  BodyType,
  { src: string; title: ReactNode }
> = {
  [BodyType.Slim]: {
    src: "/images/babes/anime/body_type/slim.jpg",
    title: <Trans>Slim</Trans>,
  },
  [BodyType.Athletic]: {
    src: "/images/babes/anime/body_type/athletic.jpg",
    title: <Trans>Athletic</Trans>,
  },
  [BodyType.Voluptuous]: {
    src: "/images/babes/anime/body_type/voluptuous.jpg",
    title: <Trans>Voluptuous</Trans>,
  },
  [BodyType.Curvy]: {
    src: "/images/babes/anime/body_type/curvy.jpg",
    title: <Trans>Curvy</Trans>,
  },
}

export const bodyTypeSelections: Record<
  StyleType,
  Record<BodyType, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticBodyTypeSelections,
  [ChatbotType.Fantasy]: animeBodyTypeSelections,
  [ChatbotType.Anime]: animeBodyTypeSelections,
}

const realisticBreastSizeSelections: Record<
  BreastSize,
  { src: string; title: ReactNode }
> = {
  [BreastSize.Small]: {
    src: "/images/babes/realistic/breast_size/small.jpg",
    title: <Trans>Small</Trans>,
  },
  [BreastSize.Medium]: {
    src: "/images/babes/realistic/breast_size/medium.jpg",
    title: <Trans>Medium</Trans>,
  },
  [BreastSize.Large]: {
    src: "/images/babes/realistic/breast_size/large.jpg",
    title: <Trans>Large</Trans>,
  },
  [BreastSize.Huge]: {
    src: "/images/babes/realistic/breast_size/huge.jpg",
    title: <Trans>Huge</Trans>,
  },
}

const animeBreastSizeSelections: Record<
  BreastSize,
  { src: string; title: ReactNode }
> = {
  [BreastSize.Small]: {
    src: "/images/babes/anime/breast_size/small.jpg",
    title: <Trans>Small</Trans>,
  },
  [BreastSize.Medium]: {
    src: "/images/babes/anime/breast_size/medium.jpg",
    title: <Trans>Medium</Trans>,
  },
  [BreastSize.Large]: {
    src: "/images/babes/anime/breast_size/large.jpg",
    title: <Trans>Large</Trans>,
  },
  [BreastSize.Huge]: {
    src: "/images/babes/anime/breast_size/huge.jpg",
    title: <Trans>Huge</Trans>,
  },
}

export const breastSizeSelections: Record<
  StyleType,
  Record<BreastSize, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticBreastSizeSelections,
  [ChatbotType.Fantasy]: animeBreastSizeSelections,
  [ChatbotType.Anime]: animeBreastSizeSelections,
}

const realisticButtSizeSelections: Record<
  ButtSize,
  { src: string; title: ReactNode }
> = {
  [ButtSize.Small]: {
    src: "/images/babes/realistic/butt_size/small.jpg",
    title: <Trans>Small</Trans>,
  },
  [ButtSize.Medium]: {
    src: "/images/babes/realistic/butt_size/medium.jpg",
    title: <Trans>Medium</Trans>,
  },
  [ButtSize.Large]: {
    src: "/images/babes/realistic/butt_size/large.jpg",
    title: <Trans>Large</Trans>,
  },
  [ButtSize.Huge]: {
    src: "/images/babes/realistic/butt_size/huge.jpg",
    title: <Trans>Huge</Trans>,
  },
}

const animeButtSizeSelections: Record<
  ButtSize,
  { src: string; title: ReactNode }
> = {
  [ButtSize.Small]: {
    src: "/images/babes/anime/butt_size/small.jpg",
    title: <Trans>Small</Trans>,
  },
  [ButtSize.Medium]: {
    src: "/images/babes/anime/butt_size/medium.jpg",
    title: <Trans>Medium</Trans>,
  },
  [ButtSize.Large]: {
    src: "/images/babes/anime/butt_size/large.jpg",
    title: <Trans>Large</Trans>,
  },
  [ButtSize.Huge]: {
    src: "/images/babes/anime/butt_size/huge.jpg",
    title: <Trans>Huge</Trans>,
  },
}

export const buttSizeSelections: Record<
  StyleType,
  Record<ButtSize, { src: string; title: ReactNode }>
> = {
  [ChatbotType.Girls]: realisticButtSizeSelections,
  [ChatbotType.Fantasy]: animeButtSizeSelections,
  [ChatbotType.Anime]: animeButtSizeSelections,
}

export const specialFeaturesSelections: Record<SpecialFeatures, ReactNode> = {
  [SpecialFeatures.Tattoos]: <Trans>Tattoos</Trans>,
  [SpecialFeatures.PubicHair]: <Trans>PubicHair</Trans>,
  [SpecialFeatures.Piercing]: <Trans>Piercings</Trans>,
  [SpecialFeatures.Freckles]: <Trans>Freckles</Trans>,
  [SpecialFeatures.Pregnant]: <Trans>Pregnant</Trans>,
}

export default function TabBody() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  useEffect(() => {
    // scroll to missing inputs
    if (missingInputs && !request.looks?.bodyType) {
      document
        .getElementById("body-type-toggle")
        ?.scrollIntoView({ behavior: "smooth" })
    } else if (missingInputs && !request.looks?.breastSize) {
      document
        .getElementById("breast-size-toggle")
        ?.scrollIntoView({ behavior: "smooth" })
    } else if (missingInputs && !request.looks?.buttSize) {
      document
        .getElementById("butt-size-toggle")
        ?.scrollIntoView({ behavior: "smooth" })
    }
  }, [missingInputs, request])

  if (!bodyGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Body}
      className={`relative flex w-full flex-1 flex-col items-center`}
    >
      <FormHeading
        id="body-type-toggle"
        text={<Trans>Choose Body Type</Trans>}
        className={
          missingInputs && !request.looks?.bodyType ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn(
          `
            grid h-[160px] w-full grid-cols-4 gap-2 pb-2

            md:h-full md:min-h-[40%]
          `,
          {
            "animate-shake": missingInputs && !request.looks?.bodyType,
          },
        )}
        type="single"
        value={request.looks?.bodyType}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            looks: {
              ...prev.looks,
              bodyType: value as BodyType,
            },
          }))
        }}
      >
        {Object.entries(bodyTypeSelections[request.type as StyleType]).map(
          ([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-image-card"}
              value={key}
              badgeText={selection.title}
              key={key}
            >
              <Image
                src={selection.src}
                fill
                sizes="25vw"
                className="rounded-lg object-cover object-top"
                alt={key}
              />
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>

      <FormHeading
        id="breast-size-toggle"
        text={<Trans>Choose Breast Size</Trans>}
        className={
          missingInputs && !request.looks?.breastSize ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn(
          `
            grid h-[160px] w-full grid-cols-4 gap-2 pb-2

            md:h-full md:min-h-[40%]
          `,
          {
            "animate-shake": missingInputs && !request.looks?.breastSize,
          },
        )}
        type="single"
        value={request.looks?.breastSize}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            looks: {
              ...prev.looks,
              breastSize: value as BreastSize,
            },
          }))
        }}
      >
        {Object.entries(breastSizeSelections[request.type as StyleType]).map(
          ([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-image-card"}
              badgeText={selection.title}
              value={key}
              key={key}
              onClick={() => {}}
            >
              <Image
                src={selection.src}
                fill
                sizes="25vw"
                className="rounded-lg object-cover object-center"
                alt={key}
              />
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>

      <FormHeading
        id="butt-size-toggle"
        text={<Trans>Choose Butt Size</Trans>}
        className={
          missingInputs && !request.looks?.buttSize ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn(
          `
            grid h-[160px] w-full grid-cols-4 gap-2 pb-2

            md:h-full md:min-h-[40%]
          `,
          {
            "animate-shake": missingInputs && !request.looks?.buttSize,
          },
        )}
        type="single"
        value={request.looks?.buttSize}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            looks: {
              ...prev.looks,
              buttSize: value as ButtSize,
            },
          }))
        }}
      >
        {Object.entries(buttSizeSelections[request.type as StyleType]).map(
          ([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-image-card"}
              badgeText={selection.title}
              value={key}
              key={key}
              onClick={() => {}}
            >
              <Image
                src={selection.src}
                fill
                sizes="25vw"
                className="rounded-lg object-cover object-top"
                alt={key}
              />
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>

      <FormHeading text={<Trans>Choose Special Features (optional)</Trans>} />
      <ToggleGroup
        className={"flex w-full flex-wrap justify-start gap-2 pb-2"}
        type="multiple"
        value={request.specialFeatures}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            specialFeatures: value as SpecialFeatures[],
          }))
        }}
      >
        {Object.entries(specialFeaturesSelections).map(([key, selection]) => (
          <ToggleGroupItem
            variant={"secondary-text-card"}
            value={key}
            key={key}
            className={`
              h-auto w-auto

              data-[state=on]:text-secondary
            `}
          >
            <p
              className={`
                text-xs font-bold uppercase leading-[15px]

                md:text-lg
              `}
            >
              {selection}
            </p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </TabsContent>
  )
}
