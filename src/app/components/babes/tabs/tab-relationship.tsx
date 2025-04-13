import { TabsContent } from "@/components/ui/tabs"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RelationshipStatus } from "@/app/lib/generated"
import { relationshipGuard } from "./tab-guards"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import FormHeading from "@/app/components/babes/form-heading"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Trans } from "@lingui/react/macro"

export const relationshipSelections: Record<
  RelationshipStatus,
  { title: ReactNode; emoji: string }
> = {
  [RelationshipStatus.Girlfriend]: {
    title: <Trans>Girlfriend</Trans>,
    emoji: "👩‍❤️‍💋‍👨",
  },
  [RelationshipStatus.Sexfriend]: {
    title: <Trans>Sexfriend</Trans>,
    emoji: "🤝",
  },
  [RelationshipStatus.Stepmom]: {
    title: <Trans>Stepmom</Trans>,
    emoji: "🤱",
  },
  [RelationshipStatus.Stepsister]: {
    title: <Trans>Stepsister</Trans>,
    emoji: "👫",
  },
  [RelationshipStatus.Colleague]: {
    title: <Trans>Colleague</Trans>,
    emoji: "👩‍💻",
  },

  [RelationshipStatus.SchoolMate]: {
    title: <Trans>School Mate</Trans>,
    emoji: "👩‍🏫",
  },
  [RelationshipStatus.Wife]: {
    title: <Trans>Wife</Trans>,
    emoji: "👰‍♀️",
  },
  [RelationshipStatus.Mistress]: {
    title: <Trans>Mistress</Trans>,
    emoji: "🥷",
  },
  [RelationshipStatus.Stranger]: {
    title: <Trans>Stranger</Trans>,
    emoji: "🦸‍♀️",
  },
  [RelationshipStatus.Friend]: {
    title: <Trans>Friend</Trans>,
    emoji: "🤘",
  },
}

export default function TabRelationship() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  if (!relationshipGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Relationship}
      className={`relative flex w-full flex-col items-center`}
    >
      <FormHeading
        text={<Trans>Choose Relationship</Trans>}
        className={
          missingInputs && !request.relationshipStatus ? "text-secondary" : ""
        }
      />
      <h3 className="pb-2 text-xs font-light leading-[20px] text-border">
        <Trans>What is your babe’s relationship status to you?</Trans>
      </h3>
      <ToggleGroup
        className={cn(
          `
            grid h-full w-full flex-1 grid-cols-2 gap-2 pb-2

            md:grid-cols-3
          `,
          {
            "animate-shake": missingInputs && !request.relationshipStatus,
          },
        )}
        type="single"
        value={request.relationshipStatus}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            relationshipStatus: value as RelationshipStatus,
          }))
        }}
      >
        {Object.entries(relationshipSelections).map(([key, selection]) => (
          <ToggleGroupItem
            variant={"secondary-text-card"}
            value={key}
            key={key}
            onClick={() => {}}
            className={"flex min-h-16 flex-col items-start justify-center"}
          >
            <p className="text-3xl">
              {selection.emoji}{" "}
              <span className="text-lg font-[700]">{selection.title}</span>
            </p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </TabsContent>
  )
}
