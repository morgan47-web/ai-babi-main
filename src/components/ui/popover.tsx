import { cn } from "@/lib/utils"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import React from "react"

export const Popover = PopoverPrimitive.Root
export const PopoverPortal = PopoverPrimitive.Portal
export const PopoverClose = PopoverPrimitive.Close

export const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.PopoverTrigger>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.PopoverTrigger
    ref={ref}
    className={cn(
      `
        flex cursor-pointer items-center justify-center rounded-full border
        border-trigger-border bg-trigger p-1
      `,
      className,
    )}
    {...props}
  />
))
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.PopoverContent>
>(({ className, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPrimitive.PopoverContent
      ref={ref}
      className={cn(
        `
          z-40 m-1 flex flex-col gap-2 rounded-xl border border-trigger-border
          bg-trigger p-2
        `,
        className,
      )}
      {...props}
    />
  </PopoverPortal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName
