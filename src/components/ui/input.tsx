import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva("flex w-full", {
  variants: {
    variant: {
      default: `
        h-9 rounded-[10px] border border-solid border-divider bg-transparent
        px-3 py-1 text-base transition-colors

        disabled:cursor-not-allowed disabled:opacity-50

        file:bg-transparent file:text-sm file:font-medium file:text-foreground

        focus-visible:outline-none focus-visible:ring-1
        focus-visible:ring-accent

        md:text-sm

        placeholder:text-muted-foreground
      `,
      underline: `
        border-b border-muted-foreground bg-background

        focus-visible:border-white focus-visible:outline-none
      `,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
