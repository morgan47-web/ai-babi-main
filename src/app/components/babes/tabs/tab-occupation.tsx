import { TabsContent } from "@/components/ui/tabs"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Occupation } from "@/app/lib/generated/models/Occupation"
import { Hobby } from "@/app/lib/generated"
import { occupationGuard } from "./tab-guards"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import FormHeading from "@/app/components/babes/form-heading"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Trans } from "@lingui/react/macro"

export const occupationSelections: Record<Occupation, ReactNode> = {
  [Occupation.Teacher]: <Trans>Teacher</Trans>,
  [Occupation.Doctor]: <Trans>Doctor</Trans>,
  [Occupation.Soldier]: <Trans>Soldier</Trans>,
  [Occupation.Student]: <Trans>Student</Trans>,
  [Occupation.Nurse]: <Trans>Nurse</Trans>,
  [Occupation.Therapist]: <Trans>Therapist</Trans>,
  [Occupation.Model]: <Trans>Model</Trans>,
  [Occupation.Policeman]: <Trans>Policeman</Trans>,
  [Occupation.Domina]: <Trans>Domina</Trans>,
  [Occupation.YogaInstruction]: <Trans>Yoga Instructor</Trans>,
  [Occupation.Lawyer]: <Trans>Lawyer</Trans>,
  [Occupation.Stewardess]: <Trans>Stewardess</Trans>,
  [Occupation.BusinessOwner]: <Trans>Business Owner</Trans>,
  [Occupation.Dj]: <Trans>DJ</Trans>,
  [Occupation.Housewife]: <Trans>Housewife</Trans>,
}

export const hobbiesSelections: Record<Hobby, ReactNode> = {
  [Hobby.Reading]: <Trans>Reading</Trans>,
  [Hobby.Writing]: <Trans>Writing</Trans>,
  [Hobby.Youtube]: <Trans>Youtube</Trans>,
  [Hobby.TvSeries]: <Trans>TV Series</Trans>,
  [Hobby.Anime]: <Trans>Anime</Trans>,
  [Hobby.Cosplay]: <Trans>Cosplay</Trans>,
  [Hobby.Hiking]: <Trans>Hiking</Trans>,
  [Hobby.Manga]: <Trans>Manga</Trans>,
  [Hobby.Streaming]: <Trans>Streaming</Trans>,
  [Hobby.Yoga]: <Trans>Yoga</Trans>,
  [Hobby.TikTok]: <Trans>TikTok</Trans>,
  [Hobby.Photography]: <Trans>Photography</Trans>,
  [Hobby.Traveling]: <Trans>Traveling</Trans>,
  [Hobby.Dancing]: <Trans>Dancing</Trans>,
  [Hobby.VideoGames]: <Trans>Video Games</Trans>,
  [Hobby.Memes]: <Trans>Memes</Trans>,
  [Hobby.Podcasts]: <Trans>Podcasts</Trans>,
  [Hobby.DigitalArt]: <Trans>Digital Art</Trans>,
  [Hobby.Movies]: <Trans>Movies</Trans>,
  [Hobby.Fitness]: <Trans>Fitness</Trans>,
  [Hobby.Cooking]: <Trans>Cooking</Trans>,
  [Hobby.Fishing]: <Trans>Fishing</Trans>,
  [Hobby.Camping]: <Trans>Camping</Trans>,
  [Hobby.Chess]: <Trans>Chess</Trans>,
  [Hobby.BoardGames]: <Trans>Board Games</Trans>,
  [Hobby.Vlogging]: <Trans>Vlogging</Trans>,
  [Hobby.Sports]: <Trans>Sports</Trans>,
  [Hobby.Puzzles]: <Trans>Puzzles</Trans>,
}

export default function TabOccupation() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  if (!occupationGuard(request)) return null

  return (
    <TabsContent
      value={TABS.Occupation}
      className={`relative flex w-full flex-1 flex-col items-center`}
    >
      <FormHeading
        text={<Trans>Choose Occupation</Trans>}
        className={missingInputs && !request.occupation ? "text-secondary" : ""}
      />
      <h3 className="pb-2 text-xs font-light leading-[20px] text-border">
        <Trans>What does your girlfriend do for living?</Trans>
      </h3>
      <ToggleGroup
        className={cn("flex w-full flex-wrap justify-start gap-2 pb-2", {
          "animate-shake": missingInputs && !request.occupation,
        })}
        type="single"
        value={request.occupation as Occupation}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            occupation: value as Occupation,
          }))
        }}
      >
        {Object.entries(occupationSelections).map(([key, selection]) => (
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
      <FormHeading
        text={<Trans>Choose Hobbies</Trans>}
        className={missingInputs && !request.hobbies ? "text-secondary" : ""}
      />
      <h3 className="pb-2 text-xs font-light leading-[20px] text-border">
        <Trans>
          What does your girlfriend do for fun? Select up to 3 hobbies
        </Trans>
      </h3>
      <ToggleGroup
        className={cn("flex w-full flex-wrap justify-start gap-2 pb-2", {
          "animate-shake": missingInputs && !request.hobbies,
        })}
        type="multiple"
        value={request.hobbies?.map((hobby) => hobby as string) || []}
        onValueChange={(value) => {
          if (value.length > 3 || !value) return
          setRequest((prev) => ({
            ...prev,
            hobbies: value as Hobby[],
          }))
        }}
      >
        {Object.entries(hobbiesSelections).map(([key, selection]) => (
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
