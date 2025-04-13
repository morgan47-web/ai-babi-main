import Image from "next/image"
import { styleSelections, StyleType } from "./tab-style"
import { ethnicitySelections } from "./tab-ethnicity"
import {
  ChatbotType,
  Ethnicity,
  FantasyRace,
  Occupation,
  Personality,
  RelationshipStatus,
} from "@/app/lib/generated"
import { TabsContent } from "@/components/ui/tabs"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  bodyTypeSelections,
  breastSizeSelections,
  buttSizeSelections,
} from "./tab-body"
import {
  eyeColorSelections,
  hairColorSelections,
  hairStyleSelections,
} from "./tab-hair"
import { personalitySelections } from "./tab-personality"
import { relationshipSelections } from "./tab-relationship"
import { occupationSelections } from "./tab-occupation"
import { summaryGuard } from "./tab-guards"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { ReactNode } from "react"
import { Trans } from "@lingui/react/macro"
import { raceSelections } from "./tab-fantasy-race"

function ImageSelection({
  src,
  text,
  className,
  imageClassName,
  sizes,
}: {
  src?: string
  text?: ReactNode
  className?: string
  imageClassName?: string
  sizes?: string
}) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src ?? ""}
        fill
        sizes={sizes ? sizes : "100vw"}
        className={cn("rounded-lg object-cover object-center", imageClassName)}
        alt={"style"}
      />
      <Badge
        variant={"image"}
        className={`
          absolute bottom-1 left-[50%] -translate-x-1/2 transform capitalize

          group-data-[state=on]:bg-secondary

          md:px-2 md:text-xl
        `}
      >
        {text}
      </Badge>
    </div>
  )
}

function TextSelection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        `
          relative flex flex-col items-center justify-center rounded-lg bg-card
          p-2 text-center text-sm font-bold capitalize
        `,
        className,
      )}
    >
      {children}
    </div>
  )
}

export default function TabSummary() {
  const { request } = useCreatorContext()

  if (!summaryGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Summary}
      className="relative flex w-full flex-1 flex-col items-center gap-2 p-2"
    >
      <h2 className="text-2xl font-bold">
        <Trans>Summary</Trans>
      </h2>
      <div
        className={`
          grid w-full flex-1 grid-cols-[1fr_1fr_80px] gap-2

          md:min-h-[40%] md:grid-cols-2
        `}
      >
        <ImageSelection
          src={styleSelections[request.type as StyleType].src}
          text={styleSelections[request.type as StyleType].title}
          imageClassName="object-top"
          sizes="(min-width: 768px) 25vw, 40vw"
        />
        {request.type === ChatbotType.Fantasy && (
          <ImageSelection
            src={raceSelections[request.fantasyRace as FantasyRace].src}
            text={raceSelections[request.fantasyRace as FantasyRace].title}
            imageClassName="object-top"
            sizes="(min-width: 768px) 25vw, 40vw"
          />
        )}
        {request.type !== ChatbotType.Fantasy && (
          <ImageSelection
            src={
              ethnicitySelections[request.type as StyleType][
                request.ethnicity as Ethnicity
              ].src
            }
            text={
              ethnicitySelections[request.type as StyleType][
                request.ethnicity as Ethnicity
              ].title
            }
            imageClassName="object-top"
            sizes="(min-width: 768px) 25vw, 40vw"
          />
        )}
        <div
          className={`
            flex flex-col gap-2

            md:hidden
          `}
        >
          <TextSelection className={`aspect-square flex-1`}>
            <div>
              {
                relationshipSelections[
                  request.relationshipStatus as RelationshipStatus
                ].emoji
              }
            </div>
            {
              relationshipSelections[
                request.relationshipStatus as RelationshipStatus
              ].title
            }
          </TextSelection>
          <TextSelection className={`aspect-square flex-1`}>
            <div>
              {personalitySelections[request.personality as Personality].emoji}
            </div>
            {request.personality}
          </TextSelection>
        </div>
      </div>
      <div
        className={`
          grid h-14 w-full grid-cols-2 gap-2

          md:grid-cols-4
        `}
      >
        <TextSelection
          className={request.type === ChatbotType.Fantasy ? "col-span-2" : ""}
        >
          {request.age}
          <p className="text-xs">
            <Trans>years old</Trans>
          </p>
        </TextSelection>
        {request.type !== ChatbotType.Fantasy && (
          <TextSelection className="text-md">
            {occupationSelections[request.occupation as Occupation]}
          </TextSelection>
        )}
        <TextSelection
          className={`
            hidden items-center justify-center

            md:flex
          `}
        >
          <div>
            {
              relationshipSelections[
                request.relationshipStatus as RelationshipStatus
              ].emoji
            }
          </div>
          {
            relationshipSelections[
              request.relationshipStatus as RelationshipStatus
            ].title
          }
        </TextSelection>
        <TextSelection
          className={`
            hidden items-center justify-center

            md:flex
          `}
        >
          <div>
            {personalitySelections[request.personality as Personality].emoji}
          </div>
          {request.personality}
        </TextSelection>
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        <ImageSelection
          src={
            request.looks?.bodyType
              ? bodyTypeSelections[request.type as StyleType][
                  request.looks.bodyType
                ].src
              : undefined
          }
          text={
            request.looks?.bodyType
              ? bodyTypeSelections[request.type as StyleType][
                  request.looks.bodyType
                ].title
              : undefined
          }
          className="aspect-square"
          sizes="(min-width: 768px) 20vw, 33vw"
        />
        <ImageSelection
          src={
            request.looks?.breastSize
              ? breastSizeSelections[request.type as StyleType][
                  request.looks.breastSize
                ].src
              : undefined
          }
          text={
            request.looks?.breastSize
              ? breastSizeSelections[request.type as StyleType][
                  request.looks.breastSize
                ].title
              : undefined
          }
          className="aspect-square"
          sizes="(min-width: 768px) 20vw, 33vw"
        />
        <ImageSelection
          src={
            request.looks?.buttSize
              ? buttSizeSelections[request.type as StyleType][
                  request.looks.buttSize
                ].src
              : undefined
          }
          text={
            request.looks?.buttSize
              ? buttSizeSelections[request.type as StyleType][
                  request.looks.buttSize
                ].title
              : undefined
          }
          className="aspect-square"
          sizes="(min-width: 768px) 20vw, 33vw"
        />
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        <ImageSelection
          src={
            request.looks?.hairStyle
              ? hairStyleSelections[request.type as StyleType][
                  request.looks.hairStyle
                ].src
              : undefined
          }
          text={
            request.looks?.hairStyle
              ? hairStyleSelections[request.type as StyleType][
                  request.looks.hairStyle
                ].title
              : undefined
          }
          className="aspect-square"
          sizes="(min-width: 768px) 20vw, 33vw"
        />
        <ImageSelection
          src={
            request.looks?.hairColor
              ? hairColorSelections[request.type as StyleType][
                  request.looks.hairColor
                ].src
              : undefined
          }
          text={
            request.looks?.hairColor
              ? hairColorSelections[request.type as StyleType][
                  request.looks.hairColor
                ].title
              : undefined
          }
          className="aspect-square"
          sizes="(min-width: 768px) 20vw, 33vw"
        />
        <ImageSelection
          src={
            request.looks?.eyeColor
              ? eyeColorSelections[request.type as StyleType][
                  request.looks.eyeColor
                ].src
              : undefined
          }
          text={
            request.looks?.eyeColor
              ? eyeColorSelections[request.type as StyleType][
                  request.looks.eyeColor
                ].title
              : undefined
          }
          className="aspect-square"
          sizes="(min-width: 768px) 20vw, 33vw"
        />
      </div>
    </TabsContent>
  )
}
