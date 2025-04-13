"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { TABS } from "./tabs"
import { Trans } from "@lingui/react/macro"
import { ReactNode } from "react"

interface ContactCardProps {
  title: ReactNode
  buttonLabel: ReactNode
  link: string
}

function ContactCard({ title, buttonLabel, link }: ContactCardProps) {
  return (
    <Card
      className={`
        flex flex-col gap-1 border border-divider bg-background p-4

        md:gap-2
      `}
    >
      <h3 className="text-center text-sm font-bold">{title}</h3>
      <div className="flex w-full">
        <a href={link} className="w-full" target="_blank" rel="noreferrer">
          <Button className="w-full" onClick={() => {}}>
            {buttonLabel}
          </Button>
        </a>
      </div>
    </Card>
  )
}

const contactCards: ContactCardProps[] = [
  {
    title: <Trans>Join our community on discord!</Trans>,
    buttonLabel: <Trans>Join discord</Trans>,
    link: "https://discord.gg/huXHvzvKGz",
  },
  {
    title: <Trans>Contact our support team!</Trans>,
    buttonLabel: <Trans>Contact us</Trans>,
    link: "mailto:support@mybabes.ai",
  },
  // {
  //   title: "Get in our referal program!",
  //   buttonLabel: "Get in program",
  //   link: "https://example.com",
  // },
  // {
  //   title: "Become AI model creator",
  //   buttonLabel: "Become creator",
  //   link: "https://example.com",
  // },
  // {
  //   title: "Follow us on social media",
  //   buttonLabel: "Follow us",
  //   link: "https://example.com",
  // },
  {
    title: <Trans>Read our terms and policies</Trans>,
    buttonLabel: <Trans>Read Terms</Trans>,
    link: "/docs",
  },
]

export default function SupportTab() {
  return (
    <TabsContent value={TABS.Contact.value} className="px-4 py-8">
      <div
        className={`
          mx-auto grid max-w-lg grid-cols-1 gap-2

          md:gap-6
        `}
      >
        {contactCards.map((card, index) => (
          <ContactCard key={index} {...card} />
        ))}
      </div>
    </TabsContent>
  )
}
