import CharacterAvatar from "../character/character-avatar"
import { Card } from "@/components/ui/card"
import {
  ChatMessage,
  ContentType,
  ImageGenerationStatus,
} from "@/app/lib/generated"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { UserContextValue, useUser } from "@/app/context/user"
import { DialogContextValue, useDialogs } from "@/app/context/dialog"
import Link from "next/link"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ChatImageGenerationEvent } from "./chat"
import { ChatImageLoadingAnimation } from "@/app/[locale]/babes/queue/animation"
import { useParams } from "next/navigation"
import GeneratedImageActions from "../actions/generated-image/actions"
import { Trans } from "@lingui/react/macro"
import { isValidUser } from "@/app/lib/user-guard"

function LinkRenderer(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  return (
    <a className="text-primary" href={props.href}>
      {props.children}
    </a>
  )
}

export function ChatbotTextMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col">
      <Card className="rounded-tl-[2px] bg-[#262629] p-2">
        <Markdown
          className="whitespace-pre-line text-sm font-bold break-word"
          remarkPlugins={[remarkGfm]}
          components={{ a: LinkRenderer }}
        >
          {message.content}
        </Markdown>
      </Card>
    </div>
  )
}

function get_image_generation_status_message(
  status: ImageGenerationStatus,
  user: UserContextValue,
): JSX.Element {
  switch (status) {
    case ImageGenerationStatus.Started:
      return <Trans>Getting ready</Trans>
    case ImageGenerationStatus.Queued:
      return isValidUser(user.user) ? (
        <Trans>Taking picture for you</Trans>
      ) : (
        <Trans>Waiting in queue</Trans>
      )
    case ImageGenerationStatus.Running:
      return <Trans>Almost done</Trans>
    case ImageGenerationStatus.Failed:
      return <Trans>Something went wrong. Please try again</Trans>
    case ImageGenerationStatus.ModerationException:
      return <Trans>I am sorry babe I can&apos;t send you this one</Trans>
    default:
      return <>status</>
  }
}

export function ChatbotImageGenerationMessage({
  message,
}: {
  message: ChatMessage
}) {
  const [loaded, setLoaded] = useState(false)
  const [imageGenerationStatus, setImageGenerationStatus] =
    useState<ImageGenerationStatus>(ImageGenerationStatus.Started)
  const [imageContent, setImageContent] = useState<string | undefined>(
    undefined,
  )
  const user = useUser()
  const dialogs = useDialogs()

  useEffect(() => {
    const handleStatusUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ChatImageGenerationEvent>
      setImageGenerationStatus(customEvent.detail.status)
      setImageContent(customEvent.detail.content)
    }

    // Listen for WebSocket updates for only this requestId
    window.addEventListener(
      `ws-update-${message.requestId}`,
      handleStatusUpdate,
    )

    return () => {
      // Clean up the event listener when this component unmounts
      window.removeEventListener(
        `ws-update-${message.requestId}`,
        handleStatusUpdate,
      )
    }
  }, [message.requestId])

  useEffect(() => {
    if (imageContent) {
      const img = new window.Image()
      img.src = imageContent
      img.onload = () => {
        setLoaded(true)
      }
    }
  }, [imageContent])

  return (
    <Card className="relative flex bg-[#262629]">
      {!loaded || !imageContent ? (
        <Skeleton
          className={`
            flex min-h-[380px] min-w-[250px] items-center justify-center
            rounded-xl
          `}
          disablePulse={true}
          disableBackground={true}
        >
          <div className="flex flex-col items-center">
            <ChatImageLoadingAnimation />
            <span>
              {get_image_generation_status_message(imageGenerationStatus, user)}
            </span>
          </div>
        </Skeleton>
      ) : (
        <ChatImage imageContent={imageContent} user={user} dialogs={dialogs} />
      )}
    </Card>
  )
}

function ChatImage({
  imageContent,
}: {
  imageContent: string
  user: UserContextValue
  dialogs: DialogContextValue
}) {
  const [fullScreenImageContent, setFullScreenImageContent] = useState<string>()
  return (
    <>
      <Image
        src={imageContent}
        alt="Chatbot Image"
        width={250}
        height={380}
        className="rounded-xl"
        style={{ maxHeight: `${380}px` }}
        onClick={() => {
          setFullScreenImageContent(imageContent)
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      <FullScreenImage
        imageContent={fullScreenImageContent}
        setFullScreenImageContent={setFullScreenImageContent}
      />
    </>
  )
}

function FullScreenImage({
  imageContent,
  setFullScreenImageContent,
}: {
  imageContent: string | undefined
  setFullScreenImageContent: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}) {
  const params = useParams()
  if (!imageContent) return null

  const chatbotID = params.chatbotID as string
  return (
    <div
      className={`
        fixed inset-0 z-[99999] flex select-none items-center justify-center
        bg-black/95
      `}
      onClick={() => setFullScreenImageContent(undefined)}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center`}
      >
        <div
          className={`
            relative flex aspect-[832/1216] max-h-[1216px] w-full max-w-[832px]
            items-center justify-center

            md:h-full md:w-auto
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={imageContent}
            alt="Full screen post"
            priority
            quality={100}
            sizes="100vw"
            width={832}
            height={1216}
            style={{ height: "auto", width: "100%" }}
            className="select-none rounded-2xl bg-trigger object-contain"
          />
          <GeneratedImageActions
            chatbotID={chatbotID}
            imageContent={imageContent}
            contentType={ContentType.PrivateChat}
            onClose={() => setFullScreenImageContent(undefined)}
          />
        </div>
      </div>
    </div>
  )
}

export function ChatbotImageMessage({ message }: { message: ChatMessage }) {
  const [loaded, setLoaded] = useState(false)
  const user = useUser()
  const dialogs = useDialogs()

  useEffect(() => {
    const img = new window.Image()
    img.src = message.content
    img.onload = () => {
      setLoaded(true)
    }
  }, [message.content])

  return (
    <Card className="relative flex bg-background">
      {!loaded || !message.content ? (
        <Skeleton className="h-[380] w-[250] rounded-xl" />
      ) : (
        <ChatImage
          imageContent={message.content}
          user={user}
          dialogs={dialogs}
        />
      )}
    </Card>
  )
}

interface ChatbotMessageProps {
  message: ChatMessage
  chatbotName: string
  chatbotID: string
  avatarURL: string
  isPublicChatbot: boolean
}

export function ChatbotMessages({
  message,
  chatbotName,
  chatbotID,
  avatarURL,
  isPublicChatbot,
}: ChatbotMessageProps) {
  function getContent(message: ChatMessage) {
    if (message.type == "text") {
      return <ChatbotTextMessage message={message} />
    } else if (message.type == "image") {
      return <ChatbotImageMessage message={message} />
    } else if (message.type == "imageGeneration") {
      return <ChatbotImageGenerationMessage message={message} />
    }
  }

  return (
    <div key={message.requestId} className="flex justify-start gap-2">
      <Link
        href={
          isPublicChatbot ? `/character/${chatbotID}` : `/babes/${chatbotID}`
        }
      >
        <CharacterAvatar
          size="default"
          className="mt-auto"
          name={chatbotName}
          image={avatarURL}
        />
      </Link>
      {getContent(message)}
    </div>
  )
}

export default ChatbotMessages
