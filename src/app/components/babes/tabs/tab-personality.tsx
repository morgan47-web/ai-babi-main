import { TabsContent } from "@/components/ui/tabs"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Personality } from "@/app/lib/generated/models/Personality"
import { personalityGuard } from "./tab-guards"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Trans } from "@lingui/react/macro"

export const personalitySelections: Record<
  Personality,
  { title: ReactNode; description: ReactNode; emoji: string }
> = {
  [Personality.Caregiver]: {
    title: <Trans>Caregiver</Trans>,
    description: (
      <Trans>
        She is warm, nurturing, and deeply empathetic, always attuned to the
        needs of others and ready to provide comfort and support.
      </Trans>
    ),
    emoji: "🥰",
  },
  [Personality.Mean]: {
    title: <Trans>Mean</Trans>,
    description: (
      <Trans>
        She is cold, critical, and often dismissive, using sharp words and
        actions to belittle others and assert her superiority.
      </Trans>
    ),
    emoji: "😡",
  },
  [Personality.Dominant]: {
    title: <Trans>Dominant</Trans>,
    description: (
      <Trans>
        She is confident, assertive, and naturally takes charge, exuding
        authority and control in her actions and demeanor.
      </Trans>
    ),
    emoji: "👠",
  },
  [Personality.Submissive]: {
    title: <Trans>Submissive</Trans>,
    description: (
      <Trans>
        She is gentle, accommodating, and eager to please, finding comfort and
        fulfillment in yielding to the desires and guidance of others.
      </Trans>
    ),
    emoji: "🙏",
  },
  [Personality.Shy]: {
    title: <Trans>Shy</Trans>,
    description: (
      <Trans>
        She is reserved and introverted, often blushing at attention, yet her
        quiet charm and vulnerability make her irresistibly endearing.
      </Trans>
    ),
    emoji: "🫣",
  },
  [Personality.Flirty]: {
    title: <Trans>Flirty</Trans>,
    description: (
      <Trans>
        She is playful, outgoing, and effortlessly captivating, using teasing
        smiles and clever banter to draw people into her orbit.
      </Trans>
    ),
    emoji: "😉",
  },
  [Personality.Lover]: {
    title: <Trans>Lover</Trans>,
    description: (
      <Trans>
        She is playful, outgoing, and effortlessly captivating, using teasing
        smiles and clever banter to draw people into her orbit.
      </Trans>
    ),
    emoji: "👰‍♀️",
  },
  [Personality.Nympho]: {
    title: <Trans>Nympho</Trans>,
    description: (
      <Trans>
        She is playful, outgoing, and effortlessly captivating, using teasing
        smiles and clever banter to draw people into her orbit.
      </Trans>
    ),
    emoji: "😈",
  },
}

export default function TabPersonality() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  if (!personalityGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Personality}
      className={`relative grid w-full flex-1 grid-rows-[auto_1fr]`}
    >
      <FormHeading
        text={<Trans>Choose Personality</Trans>}
        className={
          missingInputs && !request.personality ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn("flex w-full flex-1 pb-2", {
          "animate-shake": missingInputs && !request.personality,
        })}
        type="single"
        value={request.personality}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            personality: value as Personality,
          }))
        }}
      >
        <div
          className={`
            grid grid-cols-2 gap-2

            md:gap-4
          `}
        >
          {Object.entries(personalitySelections).map(([key, selection]) => (
            <ToggleGroupItem
              variant={"secondary-text-card"}
              value={key}
              key={key}
              className={"flex flex-col items-start justify-start"}
            >
              <p className="md:space-x-2">
                <span className="text-2xl">{selection.emoji}</span>
                <br className={`md:hidden`} />
                <span
                  className={`
                    text-xs font-[700]

                    md:text-2xl
                  `}
                >
                  {" "}
                  {selection.title}
                </span>
              </p>
              <p
                className={`
                  text-[10px] font-light leading-[15px]

                  md:text-sm
                `}
              >
                {selection.description}
              </p>
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
    </TabsContent>
  )
}
