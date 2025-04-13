import { X } from "lucide-react"

export default function CloseButton({
  onclick,
}: {
  onclick: CallableFunction
}) {
  return (
    <button
      className={`
        absolute right-0 top-0 z-[99999] rounded-full p-4 text-white

        hover:bg-white/10
      `}
      onClick={(e) => {
        e.stopPropagation()
        onclick()
      }}
    >
      <X width={30} height={30} />
    </button>
  )
}
