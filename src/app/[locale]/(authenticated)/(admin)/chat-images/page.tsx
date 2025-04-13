import CharacterAvatar from "@/app/components/character/character-avatar"
import { getChatbots } from "@/app/lib/server/actions/actions"

export const dynamic = "force-dynamic"

export default async function ChatImagesPage() {
  const resp = await getChatbots()

  if (!resp.ok || !resp.data) {
    return <div>Failed to fetch chatbots</div>
  }

  return (
    <main className="h-full w-full space-y-4 p-4">
      <h1 className="text-xl">Real girls</h1>
      <div className="grid grid-cols-5 gap-4">
        {resp.data.girls.map((chatbot) => (
          <a
            key={chatbot.id}
            className="flex items-center gap-x-2"
            href={`/chat-images/${chatbot.id}`}
          >
            <CharacterAvatar
              image={chatbot.profilePicture}
              name={chatbot.displayName}
            />
            <p>{chatbot.displayName}</p>
          </a>
        ))}
      </div>
      <h1 className="text-xl">Anime girls</h1>
      <div className="grid grid-cols-5 gap-4">
        {resp.data.anime.map((chatbot) => (
          <a
            key={chatbot.id}
            className="flex items-center gap-x-2"
            href={`/chat-images/${chatbot.id}`}
          >
            <CharacterAvatar
              image={chatbot.profilePicture}
              name={chatbot.displayName}
            />
            <p>{chatbot.displayName}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
