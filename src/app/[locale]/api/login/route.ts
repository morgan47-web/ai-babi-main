import { NextRequest, NextResponse } from "next/server"
import setCookie from "set-cookie-parser"
import { login } from "@/app/lib/server/actions/actions"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const response = await login({ email, password })

  if (!response.ok) {
    return new NextResponse(JSON.stringify({}), { status: response.code })
  }
  const res = new NextResponse(JSON.stringify(response.data), {
    headers: { "Content-Type": "application/json" },
  })

  const setCookieHeader = response.headers.get("set-cookie")

  if (setCookieHeader) {
    // Parse the set-cookie header and set it in the response
    const cookies = setCookie.parse(setCookieHeader)
    cookies.forEach((cookie) => {
      res.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires ? new Date(cookie.expires) : undefined,
        sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
      })
    })
  }

  return res
}
