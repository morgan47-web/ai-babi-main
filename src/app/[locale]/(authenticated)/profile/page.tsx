import { Suspense } from "react"
import ProfileContent from "./tabs"
import { initLingui } from "@/app/initLingui"

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  params: Promise<{ locale: string }>
}

async function ProfilePage({ searchParams, params }: ProfilePageProps) {
  const lang = (await params).locale
  initLingui(lang)
  const tab = ((await searchParams).tab as string) || "settings" // Default to "settings" if tab is not provided

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileContent defaultTab={tab} />
      </Suspense>
    </>
  )
}

export default ProfilePage
