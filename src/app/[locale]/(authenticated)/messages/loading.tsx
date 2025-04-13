import { HeaderSkeleton } from "@/app/components/skeletons/header"
import { MessagesSkeleton } from "@/app/components/skeletons/messages"

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <MessagesSkeleton />
    </>
  )
}
