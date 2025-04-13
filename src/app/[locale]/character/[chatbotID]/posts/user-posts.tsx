import PostList from "./post-list"
import { GetChatbotResponse } from "@/app/lib/generated"

interface UserPostProps {
  chatbot: GetChatbotResponse
}

async function UserPosts({ chatbot }: UserPostProps) {
  return <PostList posts={chatbot.posts} />
}

export default UserPosts
