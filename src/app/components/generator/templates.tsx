import { Trans } from "@lingui/react/macro"
import { ReactNode } from "react"

export interface PromptTemplate {
  name: ReactNode
  prompt: string
  imageSrc: string
}

const pathPrefix = "/images/generator/templates"

export const templates: Array<PromptTemplate> = [
  {
    name: <Trans>Sex</Trans>,
    prompt:
      "solo, sex, intercourse, pussy, dick, pussy, tits, naked, cute, masterpiece, detailed, dynamic, action",
    imageSrc: pathPrefix + "/sex.jpg",
  },
  {
    name: <Trans>Oral</Trans>,
    prompt: "oral, 1 girl, 1 guy, dick, horny, pussy, naked",
    imageSrc: pathPrefix + "/oral.jpg",
  },
  {
    name: <Trans>Anal</Trans>,
    prompt:
      "1 girl, naked, anal, anal sex, ass hole, big dick, dynamic, action, masterpiece, orgasmic face, boobs, horny",
    imageSrc: pathPrefix + "/anal.jpg",
  },
  {
    name: <Trans>Bondage</Trans>,
    prompt:
      "bondage,sex dungeon,naked,full body view,  ropes, fuck, pussy, orgasmic face, knots",
    imageSrc: pathPrefix + "/bondage.jpg",
  },
  {
    name: <Trans>Gangbang</Trans>,
    prompt:
      "1girl, gangbang, gagging, assfuck, oral, deepthroat, foursome, from side, penetration, anal, pussy, 3 guys",
    imageSrc: pathPrefix + "/gangbang.jpg",
  },
  {
    name: <Trans>Pissing</Trans>,
    prompt:
      "girl,naked, pissing,pussy focus, urinal, liquid from pussy, fetish, detailed,",
    imageSrc: pathPrefix + "/pissing.jpg",
  },
  {
    name: <Trans>Squirt</Trans>,
    prompt:
      "huge squirt, a lot of liquid,naked, orgasm, home, liquid from pussy, extasy, pussy view, detailed, a lot of squirt",
    imageSrc: pathPrefix + "/squirt.jpg",
  },
  {
    name: <Trans>Two girls</Trans>,
    prompt:
      "sex,naked,lesbian, 2 girls, intercourse, pussy, oral, tits, naked, cute, masterpiece, detailed, dynamic, action",
    imageSrc: pathPrefix + "/lesbian.jpg",
  },
  {
    name: <Trans>Toys</Trans>,
    prompt:
      "solo,naked, toys, sex toys, 1 girl, masturbating, pussy, anal, horny",
    imageSrc: pathPrefix + "/toys.jpg",
  },
  {
    name: <Trans>Solo</Trans>,
    prompt:
      "solo, 1 girl, tits, naked, cute, no bra, panties, horny, detail on boobs, soft brest",
    imageSrc: pathPrefix + "/solo.jpg",
  },
  {
    name: <Trans>Feets</Trans>,
    prompt:
      "solo, 1 girl, feets, panties, no bra, footfetish, foot detail, flirty face",
    imageSrc: pathPrefix + "/feets.jpg",
  },
  {
    name: <Trans>Cosplay</Trans>,
    prompt: "solo, 1 girl, cosplay, Catwoman ,bare pussy, standing",
    imageSrc: pathPrefix + "/cosplay.jpg",
  },
]

const presetsPathPrefix = "/images/generator/presets"

export const presets = {
  accessories: [
    {
      name: <Trans>Choker</Trans>,
      prompt: "choker",
      imageSrc: presetsPathPrefix + "/accessiories/choker.jpg",
    },
    {
      name: <Trans>Glasses</Trans>,
      prompt: "glasses",
      imageSrc: presetsPathPrefix + "/accessiories/glasses.jpg",
    },
    {
      name: <Trans>Handcuffs</Trans>,
      prompt: "handcuffs",
      imageSrc: presetsPathPrefix + "/accessiories/handcuffs.jpg",
    },
    {
      name: <Trans>Piercing</Trans>,
      prompt: "piercing",
      imageSrc: presetsPathPrefix + "/accessiories/piercing.jpg",
    },
    {
      name: <Trans>Tattoos</Trans>,
      prompt: "tattoos",
      imageSrc: presetsPathPrefix + "/accessiories/tattoos.jpg",
    },
    {
      name: <Trans>Whip</Trans>,
      prompt: "whip",
      imageSrc: presetsPathPrefix + "/accessiories/whip.jpg",
    },
  ],
}
