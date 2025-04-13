import * as React from "react"

import { cn } from "@/lib/utils"

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `
          flex w-full rounded-[10px] bg-trigger p-2

          disabled:cursor-not-allowed disabled:opacity-50

          file:text-sm file:font-medium file:text-foreground

          focus-visible:outline-none
        `,
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
TextArea.displayName = "TextArea"

export { TextArea }
