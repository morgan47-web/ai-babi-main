import HeartUnlocked from "@/components/icons/generated/HeartUnlocked"

export default function OutlinedHeart() {
  return (
    <div
      className={`
        flex h-6 items-center justify-center rounded-lg border border-secondary
        p-1
      `}
    >
      <HeartUnlocked width={18} height={18} />
    </div>
  )
}
