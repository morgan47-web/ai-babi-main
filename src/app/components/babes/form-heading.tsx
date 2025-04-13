import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function FormHeading({
  text,
  id,
  className,
}: {
  text: ReactNode
  id?: string
  className?: string
}) {
  return (
    <h2
      id={id}
      className={cn(
        `
          flex p-2 text-center text-xl font-bold transition-all

          md:text-2xl
        `,
        className,
      )}
    >
      {text}
    </h2>
  )
}
