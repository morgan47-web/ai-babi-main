import {
  APIResponse,
  getClaimables,
  postClaimable,
} from "@/app/lib/server/actions/actions"
import EarnTokensDesktop from "./earn-tokens-desktop"
import EarnTokensMobile from "./earn-tokens-mobile"
import { Card } from "@/components/ui/card"
import { Trans } from "@lingui/react/macro"
import { GetClaimablesResponse, UserClaimType } from "@/app/lib/generated"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/user"
import { useToaster } from "@/app/context/toaster"

export interface Claimable {
  title: React.ReactNode
  description: React.ReactNode
  tokens: string
  claimable: boolean
  claimed?: boolean
  link?: string
  instructions?: React.ReactNode
  onClaim?: () => Promise<APIResponse<void>>
}

const socialMediaPostInstructions = (
  <Card className="rounded-[20px] border border-divider bg-[#111115] p-3">
    <ol
      className={`
        list-inside list-decimal space-y-2 text-sm text-white-secondary
      `}
    >
      <li>
        Submit your username and the link to your post in the
        <span className="font-semibold text-primary">
          {" #free-coins "}
        </span>{" "}
        channel on our Discord.
      </li>
      <li>
        A valid post satisfies following requirements:
        <ol className="ml-4 list-inside list-disc space-y-1">
          <li>
            Description includes the hashtag
            <span className="font-semibold text-secondary">
              {" #mybabesai"}
            </span>
            .
          </li>
          <li>
            Has at least{" "}
            <span className="font-semibold">{" 100 views or 10 likes."}</span>
          </li>
        </ol>
      </li>
      <li>
        Note: Your coins are assigned manually for now. It can take up to
        <span className="font-bold">{" 24 hours "}</span> for your coins to
        arrive.
      </li>
    </ol>
  </Card>
)

const reportBugInstructions = (
  <Card className="rounded-[20px] border border-divider bg-[#111115] p-3">
    <ol
      className={`
        list-inside list-decimal space-y-2 text-sm text-white-secondary
      `}
    >
      <li>
        Submit your username and a detailed description of the bug in the
        <span className="font-semibold text-primary">
          {" #report-bugs "}
        </span>{" "}
        channel on our Discord.
      </li>
      <li>
        A valid bug report satisfies following requirements:
        <ol className="ml-4 list-inside list-disc space-y-1">
          <li>Includes a detailed description of the bug.</li>
          <li>Includes a screenshot or video of the bug.</li>
        </ol>
      </li>
      <li>
        Note: Your coins are assigned manually for now. It can take up to
        <span className="font-bold">{" 24 hours "}</span> for your coins to
        arrive.
      </li>
    </ol>
  </Card>
)

export const getClaimablesArray = (claimables: GetClaimablesResponse) => {
  return [
    {
      title: <Trans>Daily Check-In</Trans>,
      description: (
        <Trans>Get 10 free tokens just by opening the app daily.</Trans>
      ),
      tokens: "10",
      claimable: true,
      claimed: claimables.claimedDailyLogin,
      onClaim: async () => {
        return await postClaimable(UserClaimType.DailyLogin)
      },
      link: undefined,
    },
    {
      id: "join-reddit",
      title: <Trans>Join our reddit</Trans>,
      description: <Trans>Get 5 free tokens by joining our subreddit.</Trans>,
      tokens: "5",
      claimable: true,
      claimed: claimables.joinedReddit,
      onClaim: async () => {
        return await postClaimable(UserClaimType.Reddit)
      },
      link: "https://www.reddit.com/r/MyBabesAi/",
    },
    {
      id: "join-discord",
      title: <Trans>Join our discord</Trans>,
      description: (
        <Trans>Get 5 free tokens by joining our discord server.</Trans>
      ),
      tokens: "5",
      claimable: true,
      claimed: claimables.joinedDiscord,
      onClaim: async () => {
        return await postClaimable(UserClaimType.Discord)
      },
      link: "https://discord.gg/huXHvzvKGz",
    },
    {
      id: "join-instagram",
      title: <Trans>Follow us on Instagram</Trans>,
      description: <Trans>Get 5 free tokens by following our Instagram.</Trans>,
      tokens: "5",
      claimable: true,
      claimed: claimables.joinedInstagram,
      onClaim: async () => {
        return await postClaimable(UserClaimType.Instagram)
      },
      link: "https://www.instagram.com/mybabes.ai?igsh=MWZzajdkaGJvejI3eg==",
    },
    {
      title: <Trans>Report a bug</Trans>,
      description: (
        <Trans>
          {"Help us improve the app and you'll be rewarded by 20 free tokens."}
        </Trans>
      ),
      tokens: "20",
      claimable: false,
      instructions: reportBugInstructions,
    },
    {
      title: <Trans>Post on social media</Trans>,
      description: (
        <Trans>
          Create unique social media posts about MyBabes.AI and share it to
          public.
        </Trans>
      ),
      tokens: "30",
      claimable: false,
      instructions: socialMediaPostInstructions,
    },
  ]
}

export default function EarnTokens({ isDesktop }: { isDesktop: boolean }) {
  const [claimables, setClaimables] = useState<Array<Claimable>>([])
  const { user } = useUser()
  const toaster = useToaster()

  useEffect(() => {
    if (claimables.length <= 0) {
      getClaimables().then((resp) => {
        if (resp.error || !resp.data) {
          return
        }
        setClaimables(getClaimablesArray(resp.data))
      })
    }
  }, [user, toaster, claimables])

  return (
    <>
      {isDesktop ? (
        <EarnTokensDesktop claimables={claimables} />
      ) : (
        <EarnTokensMobile claimables={claimables} />
      )}
    </>
  )
}
