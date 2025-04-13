import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://mybabes.ai"
  const paths = [
    "/",
    "/babes",
    "/babes/create",
    "/babes/queue",
    "/reels",
    "/generator",
    "/generator/queue",
    "/messages",
    "/gallery",
    "/profile",
    "/subscription",
  ]

  // Define static pages manually
  const staticPages = paths.map((path) => ({
    url: `${baseURL}${path}`,
    lastModified: new Date().toISOString(),
  }))

  // TODO
  const dynamicPages: {
    url: string
    lastModified: string
  }[] = []

  return [...staticPages, ...dynamicPages]
}
