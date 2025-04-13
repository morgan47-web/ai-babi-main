import { GeneratedImages } from "@/app/lib/generated/models/GeneratedImages"
import { LikedPostImage } from "@/app/lib/generated/models/LikedPostImage"

export function isLikedPostImage(
  item: LikedPostImage | GeneratedImages,
): item is LikedPostImage {
  return item && item.type === "liked"
}

export function isGeneratedImage(
  item: LikedPostImage | GeneratedImages,
): item is GeneratedImages {
  return item && item.type === "generated"
}
