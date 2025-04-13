import { TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import { TABS } from "../../../[locale]/babes/create/creator-tabs"
import { AnimeLora } from "@/app/lib/generated"
import { artStyleGuard } from "./tab-guards"
import FormHeading from "@/app/components/babes/form-heading"
import { useCreatorContext } from "../../../[locale]/babes/create/creator-context"
import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"
import { ReactNode } from "react"

export const artStyleSelections: Record<
  AnimeLora,
  { src: string; title: ReactNode }
> = {
  [AnimeLora.Hentai]: {
    src: "/images/babes/anime/art/hentai.png",
    title: <Trans>Anime</Trans>,
  },
  [AnimeLora.Disney3d]: {
    src: "/images/babes/anime/art/3d.png",
    title: <Trans>3D Anime</Trans>,
  },
  [AnimeLora.Cartoon]: {
    src: "/images/babes/anime/art/cartoon.png",
    title: <Trans>Cartoon</Trans>,
  },
}

export default function TabArtStyle() {
  const { request, setRequest, missingInputs } = useCreatorContext()

  if (!artStyleGuard(request)) return null

  return (
    <TabsContent
      value={TABS.ArtStyle}
      className={`
        relative flex w-full flex-1 flex-col items-center

        data-[state=inactive]:hidden
      `}
    >
      <FormHeading
        text={<Trans>Choose Art Style</Trans>}
        className={missingInputs && !request.animeLora ? "text-secondary" : ""}
      />
      <ToggleGroup
        className={cn(
          `
            grid h-full w-full flex-1 grid-cols-2 gap-2 pb-2

            md:grid-cols-3
          `,
          {
            "animate-shake": missingInputs && !request.animeLora,
          },
        )}
        type="single"
        value={request.animeLora as AnimeLora}
        onValueChange={(value) => {
          if (!value) return
          setRequest((prev) => ({
            ...prev,
            animeLora: value as AnimeLora,
          }))
        }}
      >
        {Object.entries(artStyleSelections).map(([key, selection]) => (
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
        ))}
      </ToggleGroup>
    </TabsContent>
  )
}
