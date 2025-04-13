import path from "path"
import Markdown from "@/app/components/markdown/markdown"

export default function Page() {
  const filePath = path.join(
    process.cwd(),
    "src/app/[locale]/docs/cookies/cookies.md",
  )
  return (
    <>
      <Markdown className="mb-16" filePath={filePath} />
    </>
  )
}
