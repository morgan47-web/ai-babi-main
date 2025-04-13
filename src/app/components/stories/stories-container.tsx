import StoryCircle from "./stories-circle"
import { GalleryItem } from "@/app/lib/generated"

export default function StoriesContainer({
  stories,
}: {
  stories: Array<GalleryItem>
}) {
  return (
    <div className="w-full">
      <div
        className={`
          w-[100vw] overflow-x-scroll px-2 py-4

          [-ms-overflow-style:'none']

          [&::-webkit-scrollbar]:hidden

          [scrollbar-width:'none']

          md:w-full
        `}
      >
        <div className="flex gap-2">
          {stories.map((story) => (
            <StoryCircle key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  )
}
