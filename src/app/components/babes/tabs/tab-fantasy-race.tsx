import { TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { FantasyRace } from "@/app/lib/generated"
import { ethnicityGuard } from "./tab-guards"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"
import { ReactNode } from "react"

export const raceSelections: Record<
  FantasyRace,
  { src: string; title: ReactNode }
> = {
  [FantasyRace.Elf]: {
    src: "/images/babes/fantasy/race/elf.jpg",
    title: <Trans>Elf</Trans>,
  },
  [FantasyRace.Succubus]: {
    src: "/images/babes/fantasy/race/succubus2.jpg",
    title: <Trans>Succubus</Trans>,
  },
  [FantasyRace.Orc]: {
    src: "/images/babes/fantasy/race/orc.jpg",
    title: <Trans>Orc</Trans>,
  },
  [FantasyRace.Mage]: {
    src: "/images/babes/fantasy/race/mage.jpg",
    title: <Trans>Mage</Trans>,
  },
  [FantasyRace.Tentacle]: {
    src: "/images/babes/fantasy/race/tentacle_monster.jpg",
    title: <Trans>Tentacle Monster</Trans>,
  },
  [FantasyRace.Valkyrie]: {
    src: "/images/babes/fantasy/race/valkyrie.jpg",
    title: <Trans>Valkyrie</Trans>,
  },
  [FantasyRace.Dryad]: {
    src: "/images/babes/fantasy/race/dryad.jpg",
    title: <Trans>Dryad</Trans>,
  },
  [FantasyRace.Barbarian]: {
    src: "/images/babes/fantasy/race/barbarian.jpg",
    title: <Trans>Barbarian</Trans>,
  },
  [FantasyRace.Superhero]: {
    src: "/images/babes/fantasy/race/superhero.jpg",
    title: <Trans>Superhero</Trans>,
  },
  [FantasyRace.DarkElf]: {
    src: "/images/babes/fantasy/race/dark_elf.jpg",
    title: <Trans>Dark Elf</Trans>,
  },
  [FantasyRace.Android]: {
    src: "/images/babes/fantasy/race/android.jpg",
    title: <Trans>Android</Trans>,
  },
  [FantasyRace.Fairy]: {
    src: "/images/babes/fantasy/race/fairy.jpg",
    title: <Trans>Fairy</Trans>,
  },
  [FantasyRace.Alien]: {
    src: "/images/babes/fantasy/race/alien.jpg",
    title: <Trans>Alien</Trans>,
  },
  [FantasyRace.DragonQueen]: {
    src: "/images/babes/fantasy/race/dragon_queen.jpg",
    title: <Trans>Dragon Queen</Trans>,
  },
  [FantasyRace.ElfPriestess]: {
    src: "/images/babes/fantasy/race/elf_priestess.jpg",
    title: <Trans>Elf Priestess</Trans>,
  },
  [FantasyRace.ForestNymph]: {
    src: "/images/babes/fantasy/race/forest_nymph.jpg",
    title: <Trans>Forest Nymph</Trans>,
  },
  [FantasyRace.Goddess]: {
    src: "/images/babes/fantasy/race/celestial_goddess.jpg",
    title: <Trans>Celestial Goddess</Trans>,
  },
  [FantasyRace.Ghost]: {
    src: "/images/babes/fantasy/race/ghost.jpg",
    title: <Trans>Ghost</Trans>,
  },
  [FantasyRace.Cyborg]: {
    src: "/images/babes/fantasy/race/cyborg.jpg",
    title: <Trans>Cyborg</Trans>,
  },
  [FantasyRace.Mermaid]: {
    src: "/images/babes/fantasy/race/mermaid.jpg",
    title: <Trans>Mermaid</Trans>,
  },
  [FantasyRace.Witch]: {
    src: "/images/babes/fantasy/race/witch.jpg",
    title: <Trans>Witch</Trans>,
  },
  [FantasyRace.Human]: {
    src: "/images/babes/fantasy/race/human.jpg",
    title: <Trans>Human</Trans>,
  },
}

export default function TabFantasyRace() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  if (!ethnicityGuard(request)) return null

  return (
    <TabsContent
      value={TABS.FantasyRace}
      className={`
        relative flex w-full flex-1 flex-col items-center

        data-[state=inactive]:hidden
      `}
    >
      <FormHeading
        text={<Trans>Choose Race</Trans>}
        className={
          missingInputs && !request.fantasyRace ? "text-secondary" : ""
        }
      />
      <ToggleGroup
        className={cn(
          `
            grid h-full w-full flex-1 grid-cols-2 gap-2 pb-2

            md:grid-cols-3
          `,
          {
            "animate-shake": missingInputs && !request.fantasyRace,
          },
        )}
        type="single"
        value={request.fantasyRace as FantasyRace}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            fantasyRace: value as FantasyRace,
          }))
        }}
      >
        {Object.entries(raceSelections).map(([key, selection]) => (
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
              sizes="50vw"
              className="rounded-lg object-cover object-top"
              alt={key}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </TabsContent>
  )
}
