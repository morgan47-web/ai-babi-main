import { initLingui } from "@/app/initLingui"
import { Support, TryAgain } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"
import Image from "next/image"
import Link from "next/link"

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale
  initLingui(lang)

  return (
    <div
      className={`
        flex h-3/4 w-full flex-col items-center justify-center space-y-2 p-2
        pt-8

        md:max-w-lg
      `}
    >
      <div
        className={`
          relative h-[80px] w-[80px] rounded-2xl

          md:h-[100px] md:w-[100px]
        `}
      >
        <Image
          src="/images/declined.png"
          alt="thank you"
          fill
          className="rounded-2xl object-cover object-center"
        />
      </div>
      <h2 className="text-xl text-bold text-center">
        <Trans>Something went wrong during the transaction.</Trans>
      </h2>
      <div className="w-3/4 text-start">
        <h3>
          <Trans>Possible reasons:</Trans>
        </h3>
        <ul className="list-inside list-disc text-xs">
          <li>
            <Trans>
              Incorrect card details (e.g., card number, expiration date, CVV).
            </Trans>
          </li>
          <li>
            <Trans>Insufficient funds in your account.</Trans>
          </li>
          <li>
            <Trans>Card issuer declined the transaction.</Trans>
          </li>
          <li>
            <Trans>Network or technical issue.</Trans>
          </li>
        </ul>
      </div>
      <div className="flex w-full gap-2">
        <Link href="/subscription" className="h-8 w-full">
          <Button className="h-8 w-full">
            <TryAgain width={22} height={22} />
            <Trans>Try again</Trans>
          </Button>
        </Link>
        <Link href="mailto:support@mybabes.ai" className="h-8 w-full">
          <Button className="h-8 w-full">
            <Support width={22} height={22} />
            <Trans>Contact support</Trans>
          </Button>
        </Link>
      </div>
      <p className="text-sm text-bold text-center">
        <Trans>
          {"Or you can  "}
          <a
            href={"https://discord.gg/huXHvzvKGz"}
            className="text-center text-sm text-primary"
            target="_blank"
            rel="noreferrer"
          >
            contact us on discord.
          </a>
        </Trans>
      </p>
    </div>
  )
}
