"use client"

import { cancelSubscription } from "@/app/lib/server/actions/actions"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Trans } from "@lingui/react/macro"
import { useState } from "react"

interface Props {
  password: string
  reasons: { [key: string]: string }
  onSuccess?: () => void
}

export default function CancelSubscriptionButton({
  password,
  reasons,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    setLoading(true)
    const resp = await cancelSubscription({ password, reasons })
    if (resp.ok && onSuccess) onSuccess()
    setLoading(false)
  }

  return (
    <Button
      id="cancel-subscription"
      variant={"outlineDisabled"}
      size="lg"
      className="w-[170px] rounded-full"
      type="submit"
      onClick={handleCancel}
    >
      {loading ? <Spinner loading={loading} /> : <Trans>Cancel</Trans>}
    </Button>
  )
}
