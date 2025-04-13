import type { Metadata } from "next"
import "@fontsource/roboto"
import "../globals.css"
import UserProvider from "../context/user"
import PricingProvider from "../context/pricing"
import UserInitializer from "../context/user-initializer"
import {
  GoogleTag,
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "../scripts/google-tag"
import TrackingCookies from "../cookies/referrer"
import { Suspense } from "react"
import HeaderProvider from "../context/header"
import DialogsProvider from "../context/dialog"
import { WebSocketProvider } from "../context/websocket"
import ToasterProvider from "../context/toaster"
import GeneratorNotifications from "../components/notifications/generator-notifications"
import DialogOpener from "./(explore)/dialog-opener"
import Hotjar from "../scripts/hotjar"
import { LinguiClientProvider } from "../context/linguiProvider"
import { allMessages } from "../appRouterI18n"
import { initLingui } from "../initLingui"
import ClientLayout from "./client-layout"
import Tapfiliate from "../scripts/tapfiliate"

export const metadata: Metadata = {
  metadataBase: new URL("https://mybabes.ai"),
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  appleWebApp: {
    title: "My Babes",
    statusBarStyle: "default",
    capable: true,
  },
  applicationName: "My Babes",
  title: "MyBabes.AI: #1 Best AI Girlfriend NSFW 2025",
  description: `AI-powered virtual companions platform offering personalized, 
    interactive experiences where users can engage with both realistic and 
    anime-style AI avatars through text, voice, and exclusive content.`,
  keywords: ["babes", "ai", "virtual", "girlfriend", "anime", "avatar"],
  openGraph: {
    url: "https://mybabes.ai",
    siteName: "MyBabes.AI: #1 Best AI Girlfriend NSFW 2025",
    type: "website",
    locale: "en_US",
    description: `mybabes.ai - AI-powered virtual companions platform offering personalized, 
      interactive experiences where users can engage with both realistic and 
      anime-style AI avatars through text, voice, and exclusive content.`,
    images: [
      {
        url: "https://storage.googleapis.com/aibabe-prod-public/thumbnails/thumbnail.png",
        width: 808,
        height: 1256,
        alt: "mybabes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyBabes.AI: #1 Best AI Girlfriend NSFW 2025",
    description: `mybabes.ai - AI-powered virtual companions platform offering personalized, 
      interactive experiences where users can engage with both realistic and 
      anime-style AI avatars through text, voice, and exclusive content.`,
    creator: "@JanHrazdra9901",
    site: "@JanHrazdra9901",
    images: [
      {
        url: "https://storage.googleapis.com/aibabe-prod-public/thumbnails/thumbnail.png",
        width: 808,
        height: 1256,
        alt: "mybabes",
      },
    ],
  },
  alternates: {
    canonical: "https://mybabes.ai",
  },
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const locale = (await params).locale
  initLingui(locale)

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* <Cookiebot /> */}
        <GoogleTagManager />
        <GoogleTag />
        <Hotjar />
        <Tapfiliate />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          data-minify="1"
          src="https://docs.truevo.com/wp-content/cache/min/1/widget/merchant.minified.js?ver=1732112950"
          data-rocket-defer
          defer
        ></script>
        <script
          data-minify="1"
          src="https://docs.truevo.com/wp-content/cache/min/1/jsapi/v1/apple-pay-sdk.js?ver=1732112943"
          data-rocket-defer
          defer
        ></script>
        <script
          data-minify="1"
          type="text/javascript"
          src="https://docs.truevo.com/wp-content/cache/min/1/npm/crypto-js/crypto-js.js?ver=1732112950"
          data-rocket-defer
          defer
        ></script>
      </head>
      <body className="text-pretty font-rubik">
        <GoogleTagManagerNoScript />
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={allMessages[locale]!}
        >
          <ToasterProvider>
            <HeaderProvider>
              <UserProvider>
                <PricingProvider>
                  <DialogsProvider>
                    <WebSocketProvider>
                      <UserInitializer />
                      <Suspense fallback={null}>
                        <DialogOpener />
                      </Suspense>
                      <Suspense fallback={null}>
                        <TrackingCookies />
                      </Suspense>
                      <GeneratorNotifications />
                      <ClientLayout>{children}</ClientLayout>
                    </WebSocketProvider>
                  </DialogsProvider>
                </PricingProvider>
              </UserProvider>
            </HeaderProvider>
          </ToasterProvider>
        </LinguiClientProvider>
        {/* <TrafficJunkyInfinityTag /> */}
      </body>
    </html>
  )
}
