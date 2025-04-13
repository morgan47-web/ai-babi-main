import { NextResponse } from "next/server"

export async function POST() {
  const res = new NextResponse(null, {
    headers: { "Content-Type": "application/json" },
  })

  const hostname = process.env.NEXT_PUBLIC_GUI_URL
  const domain = hostname?.includes("mybabes.ai") ? ".mybabes.ai" : "localhost"

  res.headers.set(
    "set-cookie",
    `auth_0=; Max-Age=0; Path=/; HttpOnly; domain=${domain}`,
  )

  return res
}
