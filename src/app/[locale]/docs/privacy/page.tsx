import Markdown from "@/app/components/markdown/markdown"
import path from "path"

export default function Page() {
  const filePath = path.join(
    process.cwd(),
    "src/app/[locale]/docs/privacy/privacy.md",
  )
  return (
    <>
      <Markdown className="mb-16" filePath={filePath} />
    </>
  )
}
