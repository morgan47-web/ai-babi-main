"use client";
import { useUser } from "@/app/context/user";
import {
  eventChatFreemiumLimit,
  eventChatImageFreemiumLimit,
  eventChatImageGenerationStatus,
  eventChatImageOutOfTokens,
  eventChatMessage,
  eventChatMessageFailed,
  eventChatOutOfTokens,
  eventSubscriptionPopup,
  useWebSocket,
  WebSocketMessage,
} from "@/app/context/websocket";
import { scrollToBottom, useScrollToBottom } from "@/app/lib/chat";
import { ChatMessage } from "@/app/lib/generated/models/ChatMessage";
import { Type } from "@/app/lib/generated/models/Type";
import { sendMessage } from "@/app/lib/server/actions/actions";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BaseMessage from "./message";
import { MessageLoader } from "../loader/message-loader";
import ChatInput from "./chat-input";
import CharacterChatInfo from "./character-info";
import { useDialogs } from "@/app/context/dialog";
import { PremiumDialogType } from "../dialog/dialog-types";
import { ImageGenerationStatus } from "@/app/lib/generated";
import ChatLimitNotification from "./daily-limit";
import { Trans } from "@lingui/react/macro";
import { resetsAtToLocaleString } from "@/app/lib/utils/date-utils";
import { useRouter } from "next/navigation";
import UserInfoDialog from "./user-info";

interface Props {
  chatbotID: string;
  profilePicture: string;
  profilePictureVideo: string;
  chatbotName: string;
  chatbotAge: number;
  chatbotBio: string;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isPublic: boolean;
}

export interface ChatImageGenerationEvent {
  status: ImageGenerationStatus;
  requestId: string;
  content: string | undefined;
}

export default function Chat({
  chatbotID,
  profilePicture,
  profilePictureVideo,
  chatbotName,
  chatbotAge,
  chatbotBio,
  chatMessages,
  setChatMessages,
  isPublic,
}: Props) {
  const user = useUser();
  const { push } = useRouter();
  const { subscribe, unsubscribe, clientID } = useWebSocket();
  const dialogs = useDialogs();
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [freemiumResetsAt, setFreemiumResetsAt] = useState<number | undefined>(
    undefined
  );
  const [chatOutOfTokens, setChatOutOfTokens] = useState(false);
  const [imageFreemiumResetsAt, setImageFreemiumResetsAt] = useState<
    number | undefined
  >(undefined);
  const [imageOutTokens, setImageOutOfTokens] = useState(false);
  const chatMessageSentAt = useRef<number | null>(null); // Track the time of submission
  const [, setShowServerOverloadDialog] = useState(false); // Track if the response is delayed
  const newChat =
    chatMessages.length > 0 &&
    !chatMessages.some((message) => message.role === "user");

  useScrollToBottom(scrollRef, chatMessages);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      scrollToBottom(scrollRef);
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    setTimeout(() => {
      if (chatMessageSentAt.current) {
        setShowServerOverloadDialog(true);
      }
    }, 20000);
  }, [isLoading]);

  useEffect(() => {
    const onChatMessage = (message: WebSocketMessage) => {
      chatMessageSentAt.current = null;
      setShowServerOverloadDialog(false);
      setIsLoading(false);
      setFreemiumResetsAt(undefined);

      const newMessage: ChatMessage = {
        type: message.type as Type,
        content: message.content,
        role: "assistant",
        requestId: message.request_id,
      };
      setChatMessages((prev) => [...prev, newMessage]);
    };

    const onChatImageGenerationMessage = (message: WebSocketMessage) => {
      console.log(message);

      window.dispatchEvent(
        new CustomEvent<ChatImageGenerationEvent>(
          `ws-update-${message.request_id}`,
          {
            detail: {
              status: message.status as ImageGenerationStatus,
              content: message.content,
              requestId: message.request_id,
            },
          }
        )
      );
      if (message.status === ImageGenerationStatus.Started) {
        const newMessage: ChatMessage = {
          type: "imageGeneration" as Type,
          content: message.content,
          role: "assistant",
          requestId: message.request_id,
        };
        setChatMessages((prev) => [...prev, newMessage]);
      }
    };

    const onChatMessageFailed = (message: WebSocketMessage) => {
      setIsLoading(false);
      console.error("Failed to send message:", message);
    };
    const onSubscriptionPopup = () => {
      dialogs.setPremiumOpen(true, PremiumDialogType.chat);
    };
    const onChatFreemiumReached = (message: WebSocketMessage) => {
      setFreemiumResetsAt(parseInt(message.resets_at));
    };
    const onChatImageFreemiumReached = (message: WebSocketMessage) => {
      setImageFreemiumResetsAt(parseInt(message.resets_at));
    };
    const onChatOufOfTokens = () => {
      setChatOutOfTokens(true);
    };

    const onChatImageOutOfTokens = () => {
      setImageOutOfTokens(true);
    };

    subscribe(eventChatMessage, onChatMessage);
    subscribe(eventChatImageGenerationStatus, onChatImageGenerationMessage);
    subscribe(eventChatMessageFailed, onChatMessageFailed);
    subscribe(eventSubscriptionPopup, onSubscriptionPopup);
    subscribe(eventChatFreemiumLimit, onChatFreemiumReached);
    subscribe(eventChatImageFreemiumLimit, onChatImageFreemiumReached);
    subscribe(eventChatImageOutOfTokens, onChatImageOutOfTokens);
    subscribe(eventChatOutOfTokens, onChatOufOfTokens);

    return () => {
      unsubscribe(eventChatMessage, onChatMessage);
      unsubscribe(eventChatMessageFailed, onChatMessageFailed);
      unsubscribe(eventSubscriptionPopup, onSubscriptionPopup);
      unsubscribe(eventChatImageGenerationStatus, onChatImageGenerationMessage);
      unsubscribe(eventChatFreemiumLimit, onChatFreemiumReached);
      unsubscribe(eventChatImageFreemiumLimit, onChatImageFreemiumReached);
      unsubscribe(eventChatImageOutOfTokens, onChatImageOutOfTokens);
      unsubscribe(eventChatOutOfTokens, onChatOufOfTokens);
    };
  }, [subscribe, unsubscribe, user, setChatMessages, dialogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageFreemiumResetsAt(undefined);
    setImageOutOfTokens(false);

    const userMessage = chatInputRef.current?.innerText.trim();
    if (chatInputRef.current) chatInputRef.current.innerText = "";
    if (!userMessage) return;
    if (isLoading || !user?.user.id) return;

    const newMessage: ChatMessage = {
      type: "text",
      content: userMessage,
      role: "user",
      requestId: uuidv4(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setIsLoading(true);
    chatMessageSentAt.current = Date.now();

    try {
      await sendMessage({
        chatbotId: chatbotID,
        clientId: clientID,
        message: userMessage,
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <UserInfoDialog />

      <div
        className={`
          relative box-border flex h-full w-full flex-col overflow-hidden
        `}
      >
        <div
          className={`
            relative box-border w-full flex-1 flex-col space-y-4 overflow-y-auto
            p-2

            md:px-[20%]
          `}
          ref={scrollRef}
        >
          <CharacterChatInfo
            avatarURL={profilePictureVideo}
            chatbotAge={chatbotAge}
            chatbotBio={chatbotBio}
            chatbotName={chatbotName}
            chatbotID={chatbotID}
            isPublic={isPublic}
          />
          {chatMessages.map((message, i) => (
            <BaseMessage
              key={i}
              message={message}
              avatarURL={profilePicture}
              chatbotName={chatbotName}
              chatbotID={chatbotID}
              messageDelay={newChat ? (i + 1) * 2500 : undefined} // Delay the first messages
              loadingDelay={newChat ? i * 2500 : undefined}
              isPublicChatbot={isPublic}
            />
          ))}
          {isLoading && (
            <MessageLoader sender={chatbotName} avatarURL={profilePicture} />
          )}
        </div>
        {/* Input Area */}
        <div
          className={`
            flex w-full flex-col rounded-t-xl bg-transparent p-2
            backdrop-blur-md

            md:px-[20%]
          `}
        >
          {freemiumResetsAt && (
            <ChatLimitNotification
              content={
                <Trans>
                  Come back at {resetsAtToLocaleString(freemiumResetsAt)} or
                  upgrade to premium for unlimited access - no waiting, no
                  limits just unlimited fun.
                </Trans>
              }
              heading={<Trans>You’ve hit your chat limit.</Trans>}
              displayBenefits={true}
              displayCountdown={false}
              isClosable={false}
              buttonContent={<Trans>Become Premium</Trans>}
              onClick={() => push("/subscription")}
            />
          )}

          {chatOutOfTokens && (
            <ChatLimitNotification
              content={
                <Trans>
                  You&apos;ve run out of tokens. Buy more tokens to continue
                  chatting.
                </Trans>
              }
              buttonContent={<Trans>Buy more tokens</Trans>}
              heading={undefined}
              displayBenefits={false}
              displayCountdown={false}
              isClosable={false}
              onClick={() => push("/subscription")}
            />
          )}

          {imageFreemiumResetsAt && (
            <ChatLimitNotification
              content={
                <Trans>
                  Image generation will be available again at{" "}
                  {resetsAtToLocaleString(imageFreemiumResetsAt)}. Meanwhile you
                  can continue chatting or upgrade to premium.
                </Trans>
              }
              heading={undefined}
              displayBenefits={false}
              displayCountdown={false}
              isClosable={true}
              buttonContent={<Trans>Become Premium</Trans>}
              onClick={() => push("/subscription")}
            />
          )}

          {imageOutTokens && (
            <ChatLimitNotification
              content={
                <Trans>
                  You&apos;ve run out of tokens for image generation. You can
                  keep chatting or buy more tokens.
                </Trans>
              }
              heading={undefined}
              displayBenefits={false}
              displayCountdown={false}
              isClosable={true}
              buttonContent={<Trans>Buy more tokens</Trans>}
              onClick={() => push("/subscription")}
            />
          )}

          <ChatInput
            handleSubmit={handleSubmit}
            chatInputRef={chatInputRef}
            isLoading={isLoading}
            blur={!!freemiumResetsAt || !!chatOutOfTokens}
          />
        </div>
      </div>
    </>
  );
}
