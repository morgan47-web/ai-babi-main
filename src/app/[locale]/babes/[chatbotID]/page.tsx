import Image from "next/image"
import {
  Cake,
  Cherry,
  EyeColored,
  FaceHair,
  FlexArms,
  Globe,
  HairScissors,
  PeachColored,
} from "@/components/icons/generated"
import { getCustomChatbot } from "@/app/lib/server/actions/actions"
import CustomCharacterCardActions from "@/app/components/babes/custom-character-card-actions"
import { ListCustomChatbotItem } from "@/app/lib/generated/models/ListCustomChatbotItem"
import { Trans } from "@lingui/react/macro"
import { initLingui } from "@/app/initLingui"
import RenameChatbotDialog from "./renameDialog"

export const metadata = {
  title: "Your AI Dream Girl | MyBabes.AI",
}

export default async function Page({
  params,
}: {
  params: Promise<{ chatbotID: string; locale: string }>
}) {
  const { chatbotID, locale } = await params
  initLingui(locale)
  const resp = await getCustomChatbot(chatbotID)
  if (!resp.ok || !resp.data) {
    return null
  }

  const chatbot = resp.data

  return (
    <div className={`flex max-w-[500px] flex-col p-3 pb-[20px]`}>
      <div className={`relative flex min-h-[500px] w-full flex-1`}>
        <Image
          src={chatbot.profilePicture}
          alt="profile picture"
          height={832}
          width={1216}
          className="rounded-t-[10px] object-cover"
        />
        <div
          className={`
            absolute bottom-0 left-0 flex w-full flex-1 items-center gap-2
            px-[10px] pb-[10px] pt-[30px]
          `}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        >
          <CustomCharacterCardActions
            chatbot={{ ...chatbot, id: chatbotID } as ListCustomChatbotItem}
          />
        </div>
      </div>
      <div
        className={`
          flex flex-col gap-2 rounded-b-[10px] bg-[#0F0F1B] px-[20px] pb-[20px]
          pt-3
        `}
      >
        <div className="flex gap-2 px-3 text">
          <h2>{chatbot.displayName}</h2>
          <RenameChatbotDialog
            chatbotName={chatbot.displayName}
            chatbotID={chatbotID}
            ownerID={chatbot.ownerUserId}
          />
        </div>
        <div className="flex flex-col gap-4 px-3 pb-4">
          <p className="text-xs leading-[15px]">{chatbot.fullBio}</p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <div className="grid grid-cols-2 items-center gap-4">
            {chatbot.ethnicity && (
              <CharacterBioElement
                icon={<Globe className="h-5 w-5" />}
                heading={<Trans>Ethnicity</Trans>}
                value={chatbot.ethnicity}
              />
            )}
            {chatbot.fantasyRace && (
              <CharacterBioElement
                icon={<Globe className="h-5 w-5" />}
                heading={<Trans>Race</Trans>}
                value={chatbot.fantasyRace}
              />
            )}
            <CharacterBioElement
              icon={<Cake className="h-5 w-5" />}
              heading={<Trans>Age</Trans>}
              value={`${chatbot.characterAge} years`}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <CharacterBioElement
              icon={<FlexArms className="h-5 w-5" />}
              heading={<Trans>Body Type</Trans>}
              value={chatbot.bodyType}
            />
            <CharacterBioElement
              icon={<EyeColored className="h-5 w-5" />}
              heading={<Trans>Eyes</Trans>}
              value={chatbot.eyeColor}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <CharacterBioElement
              icon={<HairScissors className="h-5 w-5" />}
              heading={<Trans>Hair Style</Trans>}
              value={chatbot.hairStyle}
            />
            <CharacterBioElement
              icon={<FaceHair className="h-5 w-5" />}
              heading={<Trans>Hair Color</Trans>}
              value={chatbot.hairColor}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <CharacterBioElement
              icon={<Cherry className="h-5 w-5" />}
              heading={<Trans>Boobs</Trans>}
              value={chatbot.breastSize}
            />
            <CharacterBioElement
              icon={<PeachColored className="h-5 w-5" />}
              heading={<Trans>Butt</Trans>}
              value={chatbot.buttSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface CharacterBioElementProps {
  icon: JSX.Element
  heading: React.ReactNode
  value: string
}

const CharacterBioElement: React.FC<CharacterBioElementProps> = ({
  icon,
  heading,
  value,
}) => {
  return (
    <div className="flex items-center gap-2 pl-[4px]">
      {icon}
      <div className="flex flex-col text-xs">
        <p className="text-border">{heading}</p>
        <p className="capitalize">{value}</p>
      </div>
    </div>
  )
}
