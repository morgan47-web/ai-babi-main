import { cn } from "@/lib/utils"

interface SkeletonProps {
  disablePulse?: boolean
  disableBackground?: boolean
}

function Skeleton({
  className,
  disablePulse,
  disableBackground,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & SkeletonProps) {
  return (
    <div
      className={cn(
        disablePulse ? "" : "animate-pulse",
        disableBackground ? "" : "bg-primary/25",
        "rounded-md",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
