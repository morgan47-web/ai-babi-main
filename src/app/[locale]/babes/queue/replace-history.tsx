"use client"
import { useHeader } from "@/app/context/header"
import { useEffect } from "react"

export default function ReplaceHistory() {
  const { setHistoryOverride } = useHeader()
  useEffect(() => {
    setHistoryOverride("/")

    return () => {
      setHistoryOverride(undefined)
    }
  }, [setHistoryOverride])

  return null
}
