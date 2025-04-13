import { initLingui } from "@/app/initLingui"
import SubscriptionTabs from "./tabs"
import PricingInitializer from "@/app/context/pricing-initializer"

export default async function SubscriptionPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale
  initLingui(lang)

  return (
    <>
      <PricingInitializer />
      <SubscriptionTabs defaultTab={"subscription"} />
    </>
  )
}
