import { Skeleton } from "@/components/ui/skeleton"
import ProfilePicture from "../character/profile-picture"
import { Trans } from "@lingui/react/macro"

interface Props {
  avatarURL: string
  chatbotName: string
  chatbotAge: number
  chatbotBio: string
  chatbotID: string
  isPublic: boolean
}

export default function CharacterChatInfo({
  avatarURL,
  chatbotName,
  chatbotAge,
  chatbotBio,
  chatbotID,
  isPublic,
}: Props) {
  if (!avatarURL) {
    return (
      <div className={`flex w-full flex-col items-center justify-center gap-2`}>
        <Skeleton
          className={`
            h-[150px] w-[132px] rounded-3xl

            md:h-[300px] md:w-[264px]
          `}
        />
      </div>
    )
  }

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-2`}>
      <ProfilePicture
        chatbot={{
          id: chatbotID,
          displayName: chatbotName,
          profilePicture: avatarURL,
          profileVideo: avatarURL,
          unlocked: true,
        }}
        href={isPublic ? `/character/${chatbotID}` : `/babes/${chatbotID}`}
        videoEnabled
        videoOnly
        className={`
          h-[150px] w-[132px] rounded-3xl

          md:h-[300px] md:w-[264px]
        `}
      />
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{chatbotName.split(" ")[0]},</span>
        <span className="text-muted-foreground">
          <Trans>{chatbotAge} years old</Trans>
        </span>
      </div>
      <div>
        <p className="text-center text-sm text-muted-foreground">
          {chatbotBio}
        </p>
      </div>
    </div>
  )
}
