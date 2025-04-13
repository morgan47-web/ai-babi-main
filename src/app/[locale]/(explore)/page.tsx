import { Suspense } from "react"
import { PostsGridSkeleton } from "@/app/components/skeletons/posts"
import ExploreTabs from "@/app/components/explore/explore-tabs"
import { getChatbots } from "@/app/lib/server/actions/actions"
import ExplorePageBanner from "@/app/components/banner/start-flirting"
import Footer from "@/app/components/explore/footer"
import { initLingui } from "@/app/initLingui"
import { Trans } from "@lingui/react/macro"

export const dynamic = "force-dynamic"

async function ExploreContent() {
  const resp = await getChatbots()
  if (!resp.ok || !resp.data) {
    return <PostsGridSkeleton />
  }

  const chatbots = resp.data

  return <ExploreTabs chatbots={chatbots} />
}

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale
  initLingui(locale)

  return (
    <>
      <div
        className={`
          relative flex w-full flex-col items-center gap-1

          md:gap-4 md:px-4
        `}
      >
        <ExplorePageBanner />
        <div
          className={`
            relative flex w-full flex-col items-center

            md:gap-4 md:px-4 md:pb-4
          `}
        >
          <h1
            className={`
              text-start text-lg font-extrabold

              md:text-[32px]
            `}
          >
            <Trans>
              Explore <span className="text-secondary">AI Babes</span>
            </Trans>
          </h1>
          <Suspense fallback={<PostsGridSkeleton />}>
            <ExploreContent />
          </Suspense>
        </div>
      </div>
      <Footer displayImage />
    </>
  )
}
