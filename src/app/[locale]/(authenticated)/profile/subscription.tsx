import { TabsContent } from "@/components/ui/tabs"
import ActiveSubscription from "./active-subscription"
import { TABS } from "./tabs"

interface SubscriptionInterfaceTabProps {
  subscribed: boolean
}

export default function SubscriptionTab({
  subscribed,
}: SubscriptionInterfaceTabProps) {
  return (
    <TabsContent
      value={TABS.Subscription.value}
      className={`
        px-2

        md:py-8
      `}
    >
      {subscribed ? <ActiveSubscription /> : null}
    </TabsContent>
  )
}
