"use client";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@/app/context/user";
import Wand from "@/components/icons/generated/Wand";
import {
  CreateCharacter,
  Cup,
  Diamond,
  DiscordTransparent,
  Landscape,
  MagnifyingGlass,
  Peach,
  VideoGallery,
} from "@/components/icons/generated";
import { useDialogs } from "@/app/context/dialog";
import {
  isInitialized,
  isSignedUp,
  isSubscribedOrTrial,
} from "@/app/lib/user-guard";
import { Trans } from "@lingui/react/macro";
import LanguagePicker from "./header/language-picker";

const topLinks = [
  {
    name: <Trans>Explore</Trans>,
    href: "/",
    icon: MagnifyingGlass,
    requiresLogin: false,
  },
  {
    name: <Trans>Chat</Trans>,
    href: "/messages",
    icon: MessageCircle,
    requiresLogin: true,
  },
  {
    name: <Trans>Create Character</Trans>,
    href: "/babes/create",
    icon: CreateCharacter,
    requiresLogin: false,
  },
  {
    name: <Trans>Generate</Trans>,
    href: "/generator",
    icon: Wand,
    requiresLogin: false,
  },
  {
    name: <Trans>Reels</Trans>,
    href: "/reels",
    icon: VideoGallery,
    requiresLogin: false,
  },
  {
    name: <Trans>Gallery</Trans>,
    href: "/gallery",
    icon: Landscape,
    requiresLogin: true,
  },
  {
    name: <Trans>My Babes</Trans>,
    href: "/babes",
    icon: Peach,
    requiresLogin: false,
  },
];

const bottomLinks = [
  {
    name: <Trans>Discord</Trans>,
    href: "https://discord.gg/huXHvzvKGz",
    icon: DiscordTransparent,
    requiresLogin: false,
  },
  {
    name: <Trans>Affiliate</Trans>,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdkINSwGuxGxuPZcZ4UAZa5u7119oOyvnzYLVUE49Th3U4QrA/viewform?usp=sharing",
    icon: Cup,
    requiresLogin: false,
  },
];

const menuItemClasses = `
  relative inline-flex h-[32px] w-full items-center justify-start
  rounded-full px-3 py-5 text-sm border-divider border bg-background

  hover:bg-trigger/80
`;

function DesktopNavLinks() {
  const { user } = useUser();
  const pathname = usePathname();
  let pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
  pathnameWithoutLocale = pathnameWithoutLocale ? pathnameWithoutLocale : "/";
  const dialogs = useDialogs();

  return (
    <div className={`flex h-full w-full flex-col justify-between gap-1 p-0`}>
      <div
        className={`
          flex h-full w-full flex-col items-stretch justify-start gap-1
          space-y-[8px] px-0 py-4
        `}
      >
        {topLinks.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathnameWithoutLocale === link.href;
          const disabled = link.requiresLogin && !isSignedUp(user);

          return (
            <div
              className={`flex w-full flex-row items-center justify-center`}
              key={link.href}
            >
              <Link
                // href={disabled ? "#" : link.href}
                href={link.href}
                onClick={(e) => {
                  if (disabled) {
                    e.preventDefault();
                    dialogs.setSignupOpen(true);
                  }
                }}
                className={cn(menuItemClasses, {
                  "bg-trigger hover:bg-trigger/80": isActive,
                })}
              >
                <LinkIcon
                  height={22}
                  width={22}
                  className={cn(`w-7 text-border`)}
                />
                <p
                  className={cn(`ml-2 transition-all`, isActive && "font-bold")}
                >
                  {link.name}
                </p>
              </Link>
            </div>
          );
        })}
        {isInitialized(user) && !isSubscribedOrTrial(user) && (
          <div className={`flex w-full flex-row items-center justify-center`}>
            <Link
              className={cn(
                menuItemClasses,
                `
                  gap-2 border-secondary bg-gradient-to-r from-[#0B0C14]
                  to-[#101828] text-secondary

                  hover:from-[#0B0C14]/40 hover:to-[#101828]/40
                `
              )}
              href="/subscription"
            >
              <Diamond height={22} width={22} className="w-7" />
              <Trans>Become Premium</Trans>
            </Link>
          </div>
        )}
      </div>
      <div
        className={`
          flex w-full flex-col items-stretch justify-start gap-1 space-y-[8px]
          border-t border-divider px-0 py-4
        `}
      >
        <LanguagePicker className={menuItemClasses} variant="desktop" />
        {bottomLinks.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathnameWithoutLocale === link.href;
          const disabled = link.requiresLogin && !isSignedUp(user);

          return (
            <div
              className={`flex w-full flex-row items-center justify-center`}
              key={link.href}
            >
              <Link
                href={disabled ? "#" : link.href}
                onClick={(e) => {
                  if (disabled) {
                    e.preventDefault();
                    dialogs.setSignupOpen(true);
                  }
                }}
                className={cn(menuItemClasses, {
                  "bg-trigger hover:bg-trigger/80": isActive,
                })}
              >
                <LinkIcon
                  height={22}
                  width={22}
                  className={cn(`w-7 text-border`)}
                />
                <p
                  className={cn(`ml-2 transition-all`, isActive && "font-bold")}
                >
                  {link.name}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesktopNavLinks;
