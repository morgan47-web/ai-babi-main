import { cn } from "@/lib/utils"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, VariantProps } from "class-variance-authority"
import React, { ReactNode } from "react"
import { Badge } from "./badge"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(`flex justify-between`, className)}
    {...props}
  />
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const toggleGroupItemVariants = cva(`rounded-lg bg-trigger p-2`, {
  variants: {
    variant: {
      default: `data-[state=on]:bg-primary`,
      "secondary-image-card": `
        group relative h-full w-full p-0

        data-[state=off]:bg-transparent data-[state=off]:drop-shadow-lg
        data-[state=off]:filter

        data-[state=on]:outline data-[state=on]:outline-secondary
      `,
      "secondary-text-card": `
        group relative h-full w-full bg-card p-2 text-start outline
        outline-[1px] outline-divider

        data-[state=off]:text-border

        data-[state=on]:text-foreground
        data-[state=on]:shadow-[0px_1px_15px_0px_#F5542C]
        data-[state=on]:outline data-[state=on]:outline-[2px]
        data-[state=on]:outline-secondary
      `,
      "header-toggle": `
        group relative h-full w-full p-2 text-start

        data-[state=on]:text-secondary
      `,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleGroupItemVariants> {
  badgeText?: ReactNode
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, variant, badgeText, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(toggleGroupItemVariants({ variant }), className)}
    {...props}
  >
    {props.children}
    {variant === "secondary-image-card" && (
      <>
        {badgeText && (
          <Badge
            variant={"image"}
            className={`
              absolute bottom-[3px] left-[50%] z-[3] -translate-x-1/2 transform
              px-1 capitalize

              group-data-[state=on]:bg-secondary

              md:bottom-[5px] md:px-2 md:text-xl
            `}
          >
            {badgeText}
          </Badge>
        )}
        <div
          className={`
            absolute inset-0 z-[2] rounded-lg bg-background

            group-data-[state=off]:opacity-50

            group-data-[state=on]:opacity-0
          `}
        />
      </>
    )}
  </ToggleGroupPrimitive.Item>
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
