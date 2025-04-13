import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const avatarVariants = cva(
  "flex flex-shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "",
        active: "diagonal-gradient-border",
        activeNavLink: "border border-primary",
      },
      size: {
        default: "h-9 w-9 p-0",
        sm: "h-6 w-6 p-0",
        lg: "h-15 w-15 p-1",
        xl: "h-20 w-20 p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface UserAvatarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarVariants> {
  image: string
  name: string
  className?: string
}

function CharacterAvatar({
  variant,
  size,
  name,
  image,
  className,
}: UserAvatarProps) {
  return (
    <div className={cn(avatarVariants({ variant, size, className }))}>
      <div
        className={`h-full w-full overflow-hidden rounded-full inner-circle`}
      >
        <Avatar className={cn(className, "h-full w-full")}>
          <AvatarImage src={image} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default CharacterAvatar
