import CharacterAvatar from "../character/character-avatar"

interface Props {
  sender: string
  avatarURL: string
}

export function MessageLoader({ sender, avatarURL }: Props) {
  const firstName = sender.split(" ")[0]

  return (
    <div className="flex gap-2">
      <CharacterAvatar
        size="default"
        className="mt-auto"
        name={sender}
        image={avatarURL}
      />
      <div className="flex items-center gap-1 p-2">
        <p className="text-sm text-muted-foreground">{`${firstName} is typing`}</p>
        <div className="flex h-2 items-center gap-1">
          <div className="flex h-2 w-2 items-center justify-center">
            <div
              className={`h-1 w-1 animate-loading-dot rounded-full bg-secondary`}
            />
          </div>
          <div className="flex h-2 w-2 items-center justify-center">
            <div
              className={`
                h-1 w-1 animate-loading-dot rounded-full bg-secondary
                delay-300ms
              `}
            />
          </div>
          <div className="flex h-2 w-2 items-center justify-center">
            <div
              className={`
                h-1 w-1 animate-loading-dot rounded-full bg-secondary
                delay-600ms
              `}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
