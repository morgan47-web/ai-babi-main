import { Suspense } from "react"
import { PostsGridSkeleton } from "@/app/components/skeletons/posts"
import { getUserGallery } from "@/app/lib/server/actions/actions"
import GalleryTabs from "./gallery-tabs"
import EmptyGallery from "./empty-gallery"
import { Trans } from "@lingui/react/macro"
import { initLingui } from "@/app/initLingui"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Your AI NSFW Images | MyBabes.AI",
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale
  initLingui(lang)
  const resp = await getUserGallery()
  if (!resp.ok || !resp.data) {
    return <Trans>Failed to fetch gallery</Trans>
  }
  const liked = resp.data?.liked
  const generated = resp.data?.generated

  if (liked?.length === 0 && generated.length === 0) {
    return <EmptyGallery />
  }

  return (
    <div className="relative h-full w-full max-w-3xl">
      <Suspense fallback={<PostsGridSkeleton />}>
        <GalleryTabs liked={liked} generated={generated}></GalleryTabs>
      </Suspense>
    </div>
  )
}
