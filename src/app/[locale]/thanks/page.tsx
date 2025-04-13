import { initLingui } from "@/app/initLingui"
import Thanks from "./thanks"

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale
  initLingui(lang)
  return <Thanks />
}
