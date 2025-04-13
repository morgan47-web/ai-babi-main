import { Suspense } from "react"
import CreatorTabs from "./creator-tabs"
import { CreatorProvider } from "./creator-context"

export default function Page() {
  return (
    <CreatorProvider>
      <main
        className={`
          flex h-full w-full w-full flex-col items-center justify-center
          text-center
        `}
      >
        <Suspense fallback={null}>
          <CreatorTabs />
        </Suspense>
      </main>
    </CreatorProvider>
  )
}
