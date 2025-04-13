import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Legal docs",
}

interface ContactCardProps {
  title: string
  buttonLabel: string
  link: string
  stretch?: boolean
}

function ContactCard({ title, buttonLabel, link, stretch }: ContactCardProps) {
  return (
    <Card
      className={cn(
        `flex flex-col gap-2 border border-primary bg-background p-4`,
        {
          "col-span-2": stretch,
        },
      )}
    >
      <h3 className="text-center text-sm font-bold">{title}</h3>
      <div className="flex w-full">
        <Link href={link} className="w-full">
          <Button className="w-full">{buttonLabel}</Button>
        </Link>
      </div>
    </Card>
  )
}

const contactCards: ContactCardProps[] = [
  {
    title: "Terms of Service",
    buttonLabel: "Read",
    link: "/docs/terms",
  },
  {
    title: "Privacy Notice",
    buttonLabel: "Read",
    link: "/docs/privacy",
  },
  {
    title: "Cookies Notice",
    buttonLabel: "Read",
    link: "/docs/cookies",
  },
  {
    title: "Underage Policy",
    buttonLabel: "Read",
    link: "/docs/underage",
  },
  {
    title: "Content Removal Policy",
    buttonLabel: "Read",
    link: "/docs/removal",
  },
  {
    title: "Blocked Content Policy",
    buttonLabel: "Read",
    link: "/docs/blocked",
  },
  {
    title: "DMCA Policy",
    buttonLabel: "Read",
    link: "/docs/dmca",
  },
  {
    title: "Complaint Policy",
    buttonLabel: "Read",
    link: "/docs/complaint",
  },
  {
    title: "18 U.S.C. § 2257 Exemption Statement",
    buttonLabel: "Read",
    link: "/docs/exemption",
    stretch: true,
  },
]

export default function LegalDocsPage() {
  return (
    <>
      <div
        className={`
          mx-auto my-2 grid max-w-md grid-cols-2 gap-2

          md:gap-6
        `}
      >
        {contactCards.map((card, index) => (
          <ContactCard key={index} {...card} />
        ))}
      </div>
    </>
  )
}
