import { WallPost } from "../lib/generated"

export interface User {
  id: string
  image?: string
  username?: string
  name?: string
  bio?: string
  location?: string
  age?: string
  verified?: boolean
  nsfw?: number
  posts?: WallPost[]
  followedBy?: User[]
  following?: User[]
}

export interface Comment {
  id: string
  content: string
  createdAt: Date
  user: User
  post: Post
}

export interface Post {
  id: string
  caption: string | null
  fileUrl: string
  createdAt: Date
  updatedAt: Date
  user: User
  likes: number
  savedBy: SavedPost[]
  comments: Comment[]
  isNSFW?: boolean
  isPremium?: boolean
  isLiked?: boolean
}

export interface Like {
  id: string
  userId: string
  postId: string
  createdAt: Date
}

export interface SavedPost {
  id: string
  userId: string
  postId: string
  createdAt: Date
}

export enum MessageType {
  USER = "user",
  CHATBOT = "chatbot",
}

export interface Message {
  id: string
  type: MessageType
  text?: string
  imageURL?: string
  createdAt: Date
}
