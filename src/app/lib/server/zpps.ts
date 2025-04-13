"use server"

import { Configuration } from "../generated/runtime"
import {
  FetchParams,
  Middleware,
  RequestContext,
  ResponseContext,
} from "../generated/runtime"
import * as Apis from "../generated/apis"
import { cookies } from "next/headers"
import setCookie from "set-cookie-parser"

const baseURL = process.env.NEXT_PUBLIC_ZPPS_URL

class CookieMiddleware implements Middleware {
  async pre(context: RequestContext): Promise<FetchParams | void> {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    context.init.headers = {
      ...context.init.headers,
      Cookie: allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    }
    return { url: context.url, init: context.init }
  }
  async post(context: ResponseContext): Promise<void> {
    if (context.response.headers.get("set-cookie")) {
      const cookieStore = await cookies()
      const setCookieHeader = context.response.headers.get("set-cookie")

      if (setCookieHeader) {
        // setting cookies throws error during server rendering
        try {
          // Parse the set-cookie header and set it in the response
          const cookies = setCookie.parse(setCookieHeader)
          cookies.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, {
              httpOnly: cookie.httpOnly,
              secure: cookie.secure,
              domain: cookie.domain,
              path: cookie.path,
              expires: cookie.expires ? new Date(cookie.expires) : undefined,
              sameSite: cookie.sameSite as
                | "lax"
                | "strict"
                | "none"
                | undefined,
            })
          })
        } catch {
          // suppress error
        }
      }
    }
  }
}

const commonConfig = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
  middleware: [new CookieMiddleware()],
  fetchApi: fetch,
  mode: "cors" as RequestMode,
  basePath: baseURL + "/v1",
}

const zpps = {
  auth: new Apis.AuthenticationApi(new Configuration(commonConfig)),
  chatbot: new Apis.ChatbotApi(new Configuration(commonConfig)),
  chat: new Apis.ChatApi(new Configuration(commonConfig)),
  subscription: new Apis.SubscriptionsApi(new Configuration(commonConfig)),
  utilities: new Apis.UtilitiesApi(new Configuration(commonConfig)),
  post: new Apis.PostApi(new Configuration(commonConfig)),
  user: new Apis.UserApi(new Configuration(commonConfig)),
  imagen: new Apis.ImageApi(new Configuration(commonConfig)),
}

export async function getZpps() {
  return zpps
}
