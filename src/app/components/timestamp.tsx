"use client"

import { cn } from "@/lib/utils"
import ReactTimeago from "react-timeago"

type Props = {
  createdAt: Date
  className?: string
}

function Timestamp({ createdAt, className }: Props) {
  return (
    <ReactTimeago
      className={cn(
        `
          text-xs font-medium text-neutral-500

          dark:text-neutral-400
        `,
        className,
      )}
      date={createdAt}
      formatter={(value, unit, suffix, epochMiliseconds, nextFormatter) => {
        if (unit === "second") {
          return `${value}${unit[0]}`
        } else if (unit === "minute") {
          return `${value}${unit[0]}`
        } else if (unit === "hour") {
          return `${value}${unit[0]}`
        } else if (unit === "day") {
          return `${value}${unit[0]}`
        } else if (unit === "week") {
          return `${value}${unit[0]}`
        } else if (unit === "month") {
          return `${value}${unit[0]}`
        } else if (unit === "year") {
          return `${value}${unit[0]}`
        } else {
          return nextFormatter?.(value, unit, suffix, epochMiliseconds)
        }
      }}
    />
  )
}

export default Timestamp
