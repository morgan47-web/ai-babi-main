"use client"
import PaperPlaneUp from "@/components/icons/generated/PaperPlaneUp"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ChatFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  chatInputRef: React.RefObject<HTMLDivElement>
  isLoading: boolean
}
interface Props extends ChatFormProps {
  blur: boolean
}

export default function ChatInput({
  handleSubmit,
  chatInputRef,
  isLoading,
  blur,
}: Props) {
  return (
    <>
      {blur ? (
        <div
          className="blur-sm"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
            e.preventDefault()
          }
        >
          <ChatInputForm
            handleSubmit={handleSubmit}
            chatInputRef={chatInputRef}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <ChatInputForm
          handleSubmit={handleSubmit}
          chatInputRef={chatInputRef}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

function ChatInputForm({
  handleSubmit,
  chatInputRef,
  isLoading,
}: ChatFormProps) {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-h-8 w-8 w-full bg-transparent"
      tabIndex={0}
    >
      <div
        ref={chatInputRef}
        contentEditable="true"
        className={`
          flex min-h-8 w-8 w-full w-full overflow-hidden rounded-[20px]
          bg-trigger px-3 py-2 pr-12 text-base

          disabled:cursor-not-allowed disabled:opacity-50

          empty:before:text-muted-foreground
          empty:before:content-[attr(data-placeholder)]

          file:text-sm file:font-medium file:text-foreground

          focus-visible:outline-none

          focus:[&:not(:empty)]:content-['']

          md:text-sm
        `}
        data-placeholder="Type something..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault()
            handleSubmit({
              preventDefault: () => {},
            } as React.FormEvent<HTMLFormElement>)
          }
        }}
      />
      <Button
        variant="ghost"
        type="submit"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isLoading}
        className={cn(
          `
            absolute bottom-[50%] right-0 h-8 w-8 translate-y-1/2 transform
            rounded-full bg-primary transition-all duration-300
          `,
          {
            "opacity-0": !isFocused,
            "opacity-100": isFocused,
          },
        )}
      >
        <PaperPlaneUp className="text-white" height={22} width={22} />
      </Button>
    </form>
  )
}
