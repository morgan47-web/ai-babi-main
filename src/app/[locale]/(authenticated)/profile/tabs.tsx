"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SettingsTab from "./settings"
import SupportTab from "./contact"
import SubscriptionTab from "./subscription"
import { useUser } from "@/app/context/user"
import { isInitialized, isSubscribed, isValidUser } from "@/app/lib/user-guard"
import { Trans } from "@lingui/react/macro"

export const TABS = {
  Settings: {
    value: "settings",
    title: <Trans>Settings</Trans>,
  },
  Subscription: {
    value: "subscription",
    title: <Trans>Subscription</Trans>,
  },
  Contact: {
    value: "contact",
    title: <Trans>Contact</Trans>,
  },
}

interface ProfileContentProps {
  defaultTab: string
}

export default function ProfileContent({ defaultTab }: ProfileContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const user = useUser()

  // Get the current tab from search parameters or use the defaultTab
  const tab = (searchParams.get("tab") as string) || defaultTab

  if (!isInitialized(user?.user)) return null

  return (
    <main className={`w-full max-w-xl bg-background`}>
      <Tabs
        className="mt-0 w-full pt-0"
        value={tab}
        defaultValue={defaultTab}
        onValueChange={(value) => {
          const params = new URLSearchParams(Array.from(searchParams.entries()))
          params.set("tab", value)
          router.push(`${pathname}?${params.toString()}`)
        }}
      >
        <div className="mx-auto bg-background pt-0">
          <TabsList className="h-12 p-2">
            {Object.values(TABS)
              .filter((val) => {
                if (val === TABS.Subscription && !isSubscribed(user?.user)) {
                  return false
                }
                return true
              })
              .map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`
                    group h-full w-full

                    md:py-2
                  `}
                >
                  <div
                    className={`
                      relative flex h-5 w-full flex-col items-center
                      justify-center

                      md:h-8
                    `}
                  >
                    <p className="font-bold capitalize">{tab.title}</p>
                  </div>
                </TabsTrigger>
              ))}
          </TabsList>
        </div>

        <SettingsTab />

        <SubscriptionTab subscribed={isValidUser(user?.user)} />

        <SupportTab />
      </Tabs>
    </main>
  )
}
