import { PostsSkeleton } from "@/app/components/skeletons/posts"
import { Suspense } from "react"
import UserPosts from "./user-posts"
import { getChatbot } from "@/app/lib/server/actions/actions"
import { initLingui } from "@/app/initLingui"

async function UserPostsPage({
  params,
}: {
  params: Promise<{ chatbotID: string; locale: string }>
}) {
  const { chatbotID, locale } = await params
  initLingui(locale)
  const response = await getChatbot(chatbotID)
  if (!response.ok || !response.data) {
    return <PostsSkeleton />
  }
  const chatbot = response.data

  return (
    <>
      <main className="flex w-full flex-grow">
        <div className="mx-auto flex max-w-lg flex-1 flex-col">
          <Suspense fallback={<PostsSkeleton />}>
            <UserPosts chatbot={chatbot} />
          </Suspense>
        </div>
      </main>
    </>
  )
}

export default UserPostsPage
