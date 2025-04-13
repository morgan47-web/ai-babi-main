"use client"
import { useUser } from "@/app/context/user"
import { OAuthProvider } from "@/app/lib/generated/models/OAuthProvider"
import { sendCustomMemoracek } from "@/app/lib/server/actions/actions"
import { oauthLogin } from "@/app/lib/server/actions/actions"
import PatreonIcon from "@/components/icons/generated/PatreonIcon"
import PatreonWordmark from "@/components/icons/generated/PatreonWordmark"
import { cn } from "@/lib/utils"

export function PatreonOAuth({ disabled }: { disabled: boolean }) {
  const { user } = useUser()

  const handleClick = async (provider: OAuthProvider, returnUrl?: string) => {
    const resp = await oauthLogin({
      provider,
      returnUrl: returnUrl || window.location.pathname + window.location.search,
    })
    if (!resp.ok || !resp.data) {
      console.error("Failed to login with provider", provider)
      return
    }
    // hard redirect
    window.location.href = resp.data.redirectUrl
  }

  return (
    <button
      disabled={disabled}
      className={cn(
        `
          col-span-2 flex w-full items-center justify-center gap-2 self-center
          rounded-full bg-white py-1

          disabled:hidden
        `,
      )}
      type="button"
      onClick={async () => {
        await sendCustomMemoracek(
          `Nazdar buzíci, ${user.email} se snaží zaplatit přes Patreon. :0e259edf-c931-42a2-a7ca-bd531dd2c69a:`,
        )
        handleClick("patreon", "https://www.patreon.com/c/mybabesai/membership")
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <PatreonIcon width={28} height={28} />
        <PatreonWordmark width={80} height={28} />
      </div>
    </button>
  )
}
