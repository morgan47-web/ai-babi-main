import { TabsContent } from "@/components/ui/tabs"
import React from "react"
import PostsGrid from "../posts/posts-grid"
import { WallPost } from "@/app/lib/generated"

export default function PostTab({ posts }: { posts: WallPost[] }) {
  return (
    <TabsContent value="Posts" className="mt-1">
      <PostsGrid posts={posts} />
    </TabsContent>
  )
}
