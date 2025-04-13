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
    if (user && user.user.initialized && user.user.role !== "admin") {
      // hard redirect to landing page
      window.location.href = "/"
    }
  }, [user])

  return <>{children}</>
}
