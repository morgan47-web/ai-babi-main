import Image from "next/image";
import Logo from "../logo";
import { Discord, Mastercard, Visa } from "@/components/icons/generated";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Trans } from "@lingui/react/macro";

export default function Footer({
  displayImage,
  className,
}: {
  displayImage?: boolean;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        `flex w-full flex-col items-center justify-evenly`,
        className
      )}
    >
      {displayImage && (
        <div className="relative w-full">
          {/* For small screens (mobile) */}
          <div className="block md:hidden h-[430px] relative w-full">
            <Image
              src="/images/banner-footer-explore2.jpg"
              alt="find your own AI babe"
              fill
              priority
              className="object-fill"
            />
          </div>

          {/* For medium and up (tablet/desktop) */}
          <div className="hidden sm:block md:h-[140px] xl:h-[180px] relative w-full">
            <Image
              src="/images/banner-footer-explore1.jpg"
              alt="find your own AI babe"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-center bg-footer">
        <div className="grid max-w-2xl grid-cols-2 gap-6 p-6">
          {/* links */}
          <div className="flex flex-col items-start space-y-3">
            <h3 className="text-sm text-border">
              <Trans>Features</Trans>
            </h3>
            <ul
              className={`
                flex w-full flex-col items-start gap-3 px-2 text-xs

                md:flex-row md:justify-between
              `}
            >
              <li>
                <Link href="/">
                  <Trans>Explore</Trans>
                </Link>
              </li>
              <li>
                <Link href="/reels">
                  <Trans>Reels</Trans>
                </Link>
              </li>
              <li>
                <Link href="/messages">
                  <Trans>Chat</Trans>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <Trans>Gallery</Trans>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start space-y-3">
            <h3 className="space-y-3 text-sm text-border">
              <Trans>Legal docs</Trans>
            </h3>
            <ul
              className={`
                flex flex-col items-start gap-3 px-2 text-xs

                md:grid md:grid-cols-4
              `}
            >
              <li>
                <Link href="/docs/terms">
                  <Trans>Terms of service</Trans>
                </Link>
              </li>
              <li>
                <Link href="/docs/privacy">
                  <Trans>Privacy Notice</Trans>
                </Link>
              </li>
              <li>
                <Link href="/docs/blocked">
                  <Trans>Blocked Content Policy</Trans>
                </Link>
              </li>
              <li>
                <Link href="/docs/removal">
                  <Trans>Content Removal Policy</Trans>
                </Link>
              </li>
            </ul>
          </div>
          {/* brand */}
          <div className="flex flex-col items-start space-y-2">
            <Logo width={132} height={31} />
            <p className="text-xs font-light leading-[22px] text-border">
              <Trans>
                MyBabes.ai is an innovative AI-powered platform that brings
                storytelling, roleplaying, and engaging conversations to life.
              </Trans>
            </p>
          </div>
          {/* social */}
          <div className="flex flex-col items-start justify-between space-y-3">
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm text-border">
                <Trans>Social</Trans>
              </h3>
              <Link
                href="https://discord.gg/huXHvzvKGz"
                target="_blank"
                rel="noreferrer"
                className={`
                  flex h-[32px] w-[32px] items-center justify-center
                  rounded-full bg-[#5865F2]
                `}
              >
                <Discord height={20} width={20} />
              </Link>
            </div>
            <div className="inline-flex space-x-2">
              <Mastercard height={32} width={46} className="rounded-sm" />
              <Visa height={32} width={46} className="rounded-sm" />
            </div>
          </div>
          {/* contacts */}
          <div
            className={`
              col-span-2 flex flex-col items-center space-y-3 text-center
            `}
          >
            <h3 className="text-sm text-border">
              <Trans>Contact</Trans>
            </h3>
            <p className="text-xs font-light leading-[22px]">
              <Trans>
                Memora AI s.r.o., Limited, Nr.CZ21595411, Písečná 451/6, Troja
                (Prague 8), 182 00 Prague, Czech republic
              </Trans>
            </p>
          </div>
          {/* copy */}
          <div
            className={`col-span-2 flex items-center justify-center space-x-2`}
          >
            <p className="text-xs text-border">
              <Trans>© 2025 mybabes.ai. All Rights Reserved.</Trans>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
