import { ReactNode } from "react"

export const metadata = {
  title: "Your own AI babe",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
