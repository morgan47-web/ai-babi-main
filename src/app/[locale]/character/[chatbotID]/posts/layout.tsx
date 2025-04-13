import { Metadata, ResolvingMetadata } from "next"
import { ReactNode } from "react"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParent = await parent
  return {
    title: resolvedParent.title?.absolute + " Posts",
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
