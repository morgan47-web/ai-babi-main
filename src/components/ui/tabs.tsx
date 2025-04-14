"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      `
        inline-flex h-12 w-full items-center space-x-2 bg-transparent p-2
        text-muted-foreground
      `,
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabTriggerVariant = cva(
  `inline-flex items-center justify-center font-medium transition-all`,
  {
    variants: {
      variant: {
        default: `
          rounded-full bg-trigger

          data-[state=active]:bg-primary data-[state=active]:text-foreground
        `,
        circle: `
          rounded-full border border-trigger bg-background p-[8px]
          text-foreground

          data-[state=active]:border-secondary
        `,
        underline: `
          rounded-none bg-transparent

          data-[state=active]:text-primary-foreground
          data-[state=active]:underline data-[state=active]:decoration-primary
          data-[state=active]:underline-offset-[3px]
        `,
        pill: `
          rounded-full px-8 py-3 text-xs font-bold transition-none

          data-[state=active]:bg-gradient-to-b
          data-[state=active]:from-[#000000] data-[state=active]:to-[#242529]
          data-[state=active]:outline data-[state=active]:outline-[1px]
          data-[state=active]:outline-divider

          md:text-[16px]
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabTriggerVariant> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ variant, className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(tabTriggerVariant({ variant, className }))}
    ref={ref}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      `
        ring-offset-background

        data-[state=inactive]:hidden

        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2
      `,
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
