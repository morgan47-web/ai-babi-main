import { cn } from "@/lib/utils"
import * as SliderPrimitive from "@radix-ui/react-slider"
import React from "react"

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      `
        relative flex h-5 w-full touch-none select-none items-center
        justify-center
      `,
      className,
    )}
    {...props}
  />
))
Slider.displayName = SliderPrimitive.Root.displayName

export const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    ref={ref}
    className={cn(
      `relative h-[3px] w-full flex-1 rounded-full bg-border`,
      className,
    )}
    {...props}
  />
))
SliderTrack.displayName = SliderPrimitive.Track.displayName

export const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Range
    ref={ref}
    className={cn(`absolute h-full bg-secondary`, className)}
    {...props}
  />
))
SliderRange.displayName = SliderPrimitive.Range.displayName

export const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    ref={ref}
    className={cn(
      `
        block h-4 w-4 rounded-full bg-secondary

        focus:outline-none
      `,
      className,
    )}
    {...props}
  />
))
SliderThumb.displayName = SliderPrimitive.Thumb.displayName
