"use client"

import { useUser } from "@/app/context/user"
import { useEffect } from "react"

export default function AuthPathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  useEffect(() => {
    if (user && user.user.initialized && user.user.id === "") {
      // hard redirect to signup page
      window.location.href = `/?signup=true`
    }
  }, [user])

  return <>{children}</>
}
