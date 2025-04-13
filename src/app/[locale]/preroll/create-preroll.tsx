import { Hearth, Stars } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CreatePrerollPage() {
  return (
    <div
      className={`
        flex w-full flex-1 flex-col items-center justify-center gap-3 p-2
      `}
    >
      <div className="flex w-full justify-items-center">
        <div
          className={`
            flex min-w-[50%] flex-1 justify-center text-xl font-extrabold
          `}
        >
          <span className="text-secondary">my</span>
          <span className="">babes.ai</span>
        </div>
      </div>
      <Separator className="flex max-w-[50%] justify-center" />
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-extrabold">
          Create your <span className="text-secondary">AI girlfriend </span>
        </span>
        <p className="text-border">and take control over her</p>
      </div>
      <div className="relative flex max-h-[65vh] py-3">
        <video
          className={`h-full w-full object-cover object-center`}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
          <source src="/videos/anime-preroll.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        className={`
          hidden flex-col

          md:flex
        `}
      >
        <FeatureElement text="Nude Pic Generator" />
        <FeatureElement text="Unlimited Spicy Chat" />
        <FeatureElement text="Unlock Premium AI Porn" />
      </div>
      <Button
        variant="secondary"
        size="lg"
        className="mx-4 w-full text-lg font-extrabold"
      >
        <span>Try for Free</span>
        <Stars></Stars>
      </Button>
    </div>
  )
}
const FeatureElement = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-1">
      <Hearth className="h-6 w-6 text-primary" />
      <p>{text}</p>
    </div>
  )
}
