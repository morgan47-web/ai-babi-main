import { Frown } from "lucide-react"
import Link from "next/link"
import { Trans } from "@lingui/react/macro"

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">
        <Trans>404 Not Found</Trans>
      </h2>
      <p>
        <Trans>
          The page you are looking for does not exist. Please check the URL or
          go back.
        </Trans>
      </p>
      <Link
        href="/"
        className={`
          mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white
          transition-colors

          hover:bg-blue-400
        `}
      >
        <Trans>Go Back</Trans>
      </Link>
    </main>
  )
}
