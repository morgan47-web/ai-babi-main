"use client"

import { Suspense } from "react"
import Queue from "./queue"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Queue />
    </Suspense>
  )
}
