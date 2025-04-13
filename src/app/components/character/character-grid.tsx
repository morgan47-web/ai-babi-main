import { ListChatbotItem } from "@/app/lib/generated"
import ProfilePicture from "./profile-picture"

interface CharacteGridProps {
  items: ListChatbotItem[] | undefined
}

function CharacterGrid({ items }: CharacteGridProps) {
  if (items?.length === 0) {
    return (
      <div
        className={`
          mx-auto flex max-w-3xl flex-col items-center justify-center space-y-3
          pb-20

          lg:max-w-4xl
        `}
      >
        <p className="text-sm font-semibold text-neutral-400">No more posts.</p>
      </div>
    )
  }

  return (
    <div
      className={`
        grid grid-cols-2 gap-1 rounded-lg

        lg:grid-cols-4

        md:grid-cols-3 md:gap-4

        xl:grid-cols-5
      `}
    >
      {items?.map((chatbot) => (
        <ProfilePicture
          key={chatbot.id}
          chatbot={chatbot}
          href={`/messages/${chatbot.id}`}
          locked={!chatbot.unlocked}
          videoEnabled
          displayName
          className={`aspect-[1/1.5] rounded-lg`}
        />
      ))}
    </div>
  )
}

export default CharacterGrid
