import { getChatbots } from "@/app/lib/server/actions/actions"
import GeneratorTabs from "@/app/[locale]/generator/generator-tabs"
import { Trans } from "@lingui/react/macro"

export const dynamic = "force-dynamic"

export default async function Page() {
  const resp = await getChatbots()
  const chatbots = resp.data

  if (!chatbots) {
    return (
      <div>
        <Trans>Failed to fetch chatbots</Trans>
      </div>
    )
  }

  return <GeneratorTabs chatbots={chatbots} />
}
