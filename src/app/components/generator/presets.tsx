import { Trans } from "@lingui/react/macro"

const presetsPathPrefix = "/images/generator/presets"

export const presets = {
  accessories: [
    {
      name: <Trans>Choker</Trans>,
      prompt: "choker",
      imageSrc: presetsPathPrefix + "/accessories/choker.jpg",
    },
    {
      name: <Trans>Glasses</Trans>,
      prompt: "glasses",
      imageSrc: presetsPathPrefix + "/accessories/glasses.jpg",
    },
    {
      name: <Trans>Handcuffs</Trans>,
      prompt: "handcuffs",
      imageSrc: presetsPathPrefix + "/accessories/handcuffs.jpg",
    },
    {
      name: <Trans>Piercing</Trans>,
      prompt: "piercing",
      imageSrc: presetsPathPrefix + "/accessories/piercing.jpg",
    },
    {
      name: <Trans>Tattoos</Trans>,
      prompt: "tattoos",
      imageSrc: presetsPathPrefix + "/accessories/tattoos.jpg",
    },
    {
      name: <Trans>Whip</Trans>,
      prompt: "whip",
      imageSrc: presetsPathPrefix + "/accessories/whip.jpg",
    },
  ],
  outfit: [
    {
      name: <Trans>Bikini </Trans>,
      prompt: "bikini",
      imageSrc: presetsPathPrefix + "/outfit/bikini.jpg",
    },
    {
      name: <Trans>Latex </Trans>,
      prompt: "latex",
      imageSrc: presetsPathPrefix + "/outfit/latex.jpg",
    },
    {
      name: <Trans>Croptop </Trans>,
      prompt: "croptop",
      imageSrc: presetsPathPrefix + "/outfit/croptop.jpg",
    },
    {
      name: <Trans>Pyjamas </Trans>,
      prompt: "pyjamas",
      imageSrc: presetsPathPrefix + "/outfit/pyjamas.jpg",
    },
    {
      name: <Trans>Yoga pants</Trans>,
      prompt: "yoga pants",
      imageSrc: presetsPathPrefix + "/outfit/yoga.jpg",
    },
    {
      name: <Trans>Nurse </Trans>,
      prompt: "nurse",
      imageSrc: presetsPathPrefix + "/outfit/nurse.jpg",
    },
    {
      name: <Trans>Cosplay </Trans>,
      prompt: "cosplay",
      imageSrc: presetsPathPrefix + "/outfit/cosplay.jpg",
    },
    {
      name: <Trans>Work uniform</Trans>,
      prompt: "work uniform",
      imageSrc: presetsPathPrefix + "/outfit/work-uniform.jpg",
    },
  ],
  pose: [
    {
      name: <Trans>Kneeling</Trans>,
      prompt: "kneeling",
      imageSrc: presetsPathPrefix + "/pose/kneeling.jpg",
    },
    {
      name: <Trans>Laying</Trans>,
      prompt: "laying on back",
      imageSrc: presetsPathPrefix + "/pose/laying-on-back.jpg",
    },
    {
      name: <Trans>Sitting</Trans>,
      prompt: "sitting",
      imageSrc: presetsPathPrefix + "/pose/sitting.jpg",
    },
    {
      name: <Trans>Standing</Trans>,
      prompt: "standing",
      imageSrc: presetsPathPrefix + "/pose/standing.jpg",
    },
    {
      name: <Trans>Stretching</Trans>,
      prompt: "stretching",
      imageSrc: presetsPathPrefix + "/pose/stretching.jpg",
    },
  ],
  scene: [
    {
      name: <Trans>Bathtub</Trans>,
      prompt: "bathtub",
      imageSrc: presetsPathPrefix + "/scene/bathtub.jpg",
    },
    {
      name: <Trans>Bedroom</Trans>,
      prompt: "bedroom",
      imageSrc: presetsPathPrefix + "/scene/bedroom.jpg",
    },
    {
      name: <Trans>Dark valley</Trans>,
      prompt: "dark valley",
      imageSrc: presetsPathPrefix + "/scene/dark-valley.jpg",
    },
    {
      name: <Trans>Forest</Trans>,
      prompt: "forest",
      imageSrc: presetsPathPrefix + "/scene/forest.jpg",
    },
    {
      name: <Trans>Office</Trans>,
      prompt: "office",
      imageSrc: presetsPathPrefix + "/scene/office.jpg",
    },
    {
      name: <Trans>Public transport</Trans>,
      prompt: "public transport",
      imageSrc: presetsPathPrefix + "/scene/public-transport.jpg",
    },
    {
      name: <Trans>Library</Trans>,
      prompt: "library",
      imageSrc: presetsPathPrefix + "/scene/library.jpg",
    },
  ],
}
