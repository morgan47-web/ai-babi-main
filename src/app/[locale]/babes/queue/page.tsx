import LoadingAnimation from "./animation"
import ReplaceHistory from "./replace-history"
import { Trans } from "@lingui/react/macro"
import { initLingui } from "@/app/initLingui"

export const metadata = {
  title: "#1 Best App For Creating Your Own Girlfriend | MyBabes.AI",
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale
  initLingui(lang)

  return (
    <div
      className={`
        flex w-full flex-col items-center justify-center space-y-2 p-2 pt-8
        text-center
      `}
    >
      <ReplaceHistory />
      <LoadingAnimation />
      <h1 className="text-[32px] font-extrabold leading-[30px]">
        <Trans>Creating your AI Babe</Trans>
      </h1>
      <p className="text-sm font-light leading-[20px] text-border">
        <Trans>Your AI babe will be ready in few seconds (up to 1 min)</Trans>
      </p>
    </div>
  )
}
