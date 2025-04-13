import { serialize } from "cookie"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // Parse cookies from request headers
  const cookies = req.cookies
  const { referrer, campaign, tapfiliateRef } = await req.json()

  // Check if the cookie is already set
  let referrerCookie = ""
  let campaignCookie = ""
  let tapfiliateRefCookie = ""

  if (!cookies.get("firstReferredFrom")) {
    referrerCookie = serialize("firstReferredFrom", referrer || "direct", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      maxAge: 365 * 100 * 24 * 60 * 60, // 100 years in seconds
    })
  }
  if (!cookies.get("campaign")) {
    campaignCookie = serialize("campaign", campaign || "unknown", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      maxAge: 365 * 100 * 24 * 60 * 60, // 100 years in seconds
    })
  }
  if (!cookies.get("tapfiliateRef")) {
    tapfiliateRefCookie = serialize("tapfiliateRef", tapfiliateRef || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      maxAge: 365 * 100 * 24 * 60 * 60, // 100 years in seconds
    })
  }

  const res = new NextResponse(JSON.stringify({}), { status: 200 })
  res.headers.set(
    "Set-Cookie",
    `${referrerCookie}, ${campaignCookie}, ${tapfiliateRefCookie}`,
  )
  return res
}
