import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
    inline-flex select-none items-center justify-center gap-2 whitespace-nowrap
    text-sm font-medium transition-colors

    [&_svg]:pointer-events-none

    disabled:pointer-events-none

    focus-visible:outline-none
  `,
  {
    variants: {
      variant: {
        default: `
          rounded-full bg-primary text-primary-foreground shadow

          hover:bg-primary/90
        `,
        destructive: `
          rounded-md bg-destructive text-destructive-foreground

          hover:bg-destructive/90
        `,
        secondary: `
          rounded-full bg-secondary text-secondary-foreground

          hover:bg-secondary/80
        `,
        secondaryNeon: `
          rounded-full bg-secondary text-secondary-foreground

          hover:bg-secondary/80
        `,
        outline: `
          rounded-md border border-primary bg-background

          hover:bg-primary/90
        `,
        outlineDisabled: `
          border border-muted-foreground bg-background text-muted-foreground

          hover:bg-accent/50
        `,
        ghost: "",
        link: `
          text-primary-foreground underline

          hover:underline
        `,
        toggle: `
          rounded-full bg-trigger

          hover:bg-trigger/90
        `,
      },
      size: {
        default: "h-[26px] px-2 py-1",
        sm: "h-[26px] px-2 py-1",
        lg: "h-8 px-2 py-1",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
