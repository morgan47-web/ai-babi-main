import { OAuthProvider } from "@/app/lib/generated"
import { oauthLogin } from "@/app/lib/server/actions/actions"
import { Discord, Google, XLogo } from "@/components/icons/generated"
import { cn } from "@/lib/utils"
import Cookies from "js-cookie"

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

export default function Oauth({ signUp }: { signUp?: boolean }) {
  const refferer = Cookies.get("firstReferredFromFrontendOnly")
  console.log(refferer)
  if (refferer === "ig" || refferer == "https://l.instagram.com/") {
    console.log("ig")
    return
  }
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-2">
      <button
        className={cn(
          `
            col-span-2 flex w-full items-center justify-center gap-2 self-center
            rounded-lg bg-white py-1
          `,
          { "g4a-oauth": signUp },
        )}
        type="button"
        onClick={() => handleClick("google")}
      >
        <Google width={28} height={28} />
      </button>
      <button
        className={cn(
          `
            flex w-full items-center justify-center gap-2 self-center rounded-lg
            bg-[#5865F2] py-1
          `,
          { "g4a-oauth": signUp },
        )}
        type="button"
        onClick={() => handleClick("discord")}
      >
        <Discord width={28} height={28} />
      </button>
      <button
        className={cn(
          `
            flex w-full items-center justify-center gap-2 self-center rounded-lg
            bg-white py-1
          `,
          { "g4a-oauth": signUp },
        )}
        type="button"
        onClick={() => handleClick("x")}
      >
        <XLogo width={28} height={28} className="text-black" />
      </button>
    </div>
  )
}
