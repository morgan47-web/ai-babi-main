import { initLingui } from "@/app/initLingui"
import { Metadata, ResolvingMetadata } from "next"
import { ReactNode } from "react"

type Params = {
  chatbotID: string
  locale: string
}

type Props = {
  params: Promise<Params>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParent = await parent
  const { chatbotID, locale } = await params
  initLingui(locale)
  return {
    title: resolvedParent.title?.absolute + " " + chatbotID,
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
