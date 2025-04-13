"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { useUser } from "../context/user"

const TrackingCookies = () => {
  const searchParams = useSearchParams()
  const { user } = useUser()

  useEffect(() => {
    const setCookie = async () => {
      const utmSource = searchParams.get("utm_source")
      const utmCampaign = searchParams.get("utm_campaign")
      const tracker = searchParams.get("tracker")
      const ref = searchParams.get("ref")
      const referrer = utmSource ? utmSource : document.referrer || "unknown"
      const campaign = utmCampaign ? utmCampaign : "unknown"
      const tapfiliateRef = ref ? ref : ""

      const injectTapfiliateScript = () => {
        const customerId = user?.id || Cookies.get("user_id") || ""
        console.log("customerId", customerId)

        const scriptContent = `
          (function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){ (t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');
          tap('create', '57308-ed760e', { integration: "javascript" });
          tap('customer', '${customerId}');
        `

        const script = document.createElement("script")
        script.type = "text/javascript"
        script.innerHTML = scriptContent
        document.body.appendChild(script)
      }

      if (tapfiliateRef) {
        injectTapfiliateScript()
      }

      if (tracker) Cookies.set("tracker", tracker, { expires: 365 })

      if (referrer)
        Cookies.set("firstReferredFromFrontendOnly", referrer, { expires: 365 })

      await fetch("/api/set-cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referrer, campaign, tapfiliateRef }),
      })
    }

    setCookie()
  }, [searchParams])

  return (
    <>
      <script
        src="https://script.tapfiliate.com/tapfiliate.js"
        type="text/javascript"
        async
      ></script>
    </>
  )
}

export default TrackingCookies
