"use client"
import { Suspense } from "react"
import CreatePrerollPage from "./create-preroll"

export default function Page() {
  return (
    <main
      className={`
        flex h-full w-full w-full flex-col items-center justify-center
        text-center
      `}
    >
      <Suspense fallback={null}>
        <CreatePrerollPage />
      </Suspense>
    </main>
  )
}
