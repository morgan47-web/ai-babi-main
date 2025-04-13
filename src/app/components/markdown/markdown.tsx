import fs from "fs"
import { default as ReactMarkdown } from "react-markdown"
import remarkGfm from "remark-gfm"
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"

function LinkRenderer(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  )
}

interface MarkdownProps {
  filePath: string
  className?: string
}

export default function Markdown({ filePath, className }: MarkdownProps) {
  const fileContent = fs.readFileSync(filePath, "utf8")
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{ a: LinkRenderer }}
    >
      {fileContent}
    </ReactMarkdown>
  )
}
