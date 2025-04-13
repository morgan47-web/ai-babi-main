import CustomCharacterCard from "@/app/components/babes/custom-character-card"
import { getCustomChatbots } from "@/app/lib/server/actions/actions"
import NewBabeButton from "./new-babe-button"
import { Trans } from "@lingui/react/macro"
import { initLingui } from "@/app/initLingui"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Create Your AI Girl | MyBabes.AI",
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale
  initLingui(lang)
  const chatbots = await getCustomChatbots()

  return (
    <main className="w-full p-2">
      <div
        className={`
          flex w-full flex-col items-center justify-center space-y-2 text-center

          md:grid md:min-w-[370px] md:grid-cols-2 md:gap-4 md:px-[20%]
        `}
      >
        <h1
          className={`
            text-4xl font-bold

            md:col-span-2
          `}
        >
          <Trans>Your</Trans>{" "}
          <span className="text-secondary">
            {" "}
            <Trans>Babes</Trans>
          </span>
        </h1>
        <NewBabeButton />
        {chatbots.data?.chatbots.map((chatbot) => (
          <CustomCharacterCard key={chatbot.id} chatbot={chatbot} />
        ))}
      </div>
    </main>
  )
}
