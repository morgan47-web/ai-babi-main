"use client"

import {
  FranceFlag,
  GermanyFlag,
  ItalyFlag,
  SpainFlag,
  UnitedStatesFlag,
} from "@/components/icons/generated"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Trans, useLingui } from "@lingui/react/macro"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import Cookies from "js-cookie"
import { cn } from "@/lib/utils"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"

const languageMap: { [key: string]: { flag: JSX.Element; name: ReactNode } } = {
  en: {
    flag: <UnitedStatesFlag width={30} height={20} />,
    name: <Trans>English</Trans>,
  },
  de: {
    flag: <GermanyFlag width={30} height={20} />,
    name: <Trans>German</Trans>,
  },
  es: {
    flag: <SpainFlag width={30} height={20} />,
    name: <Trans>Spanish</Trans>,
  },
  fr: {
    flag: <FranceFlag width={30} height={20} />,
    name: <Trans>French</Trans>,
  },
  it: {
    flag: <ItalyFlag width={30} height={20} />,
    name: <Trans>Italian</Trans>,
  },
}

export default function LanguagePicker({
  variant,
  className,
}: {
  variant: "mobile" | "desktop"
  className?: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { i18n } = useLingui()
  const [currentLocale, setCurrentLocale] = useState<string>(
    i18n.locale ?? "en",
  )

  function handleChange(locale: string) {
    const pathNameWithoutLocale = pathname?.split("/")?.slice(2) ?? []
    const newPath = `/${locale}/${pathNameWithoutLocale.join("/")}`

    Cookies.set("NEXT_LOCALE", locale)
    setCurrentLocale(locale)
    setOpen(false)
    router.push(newPath)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "relative h-8 w-full justify-start gap-4 px-4 text-sm",
          className,
        )}
      >
        {languageMap[currentLocale].flag}
        {languageMap[currentLocale].name}
        <div
          className={`
            absolute right-2 top-0 flex hidden h-full items-center
            justify-center

            md:flex
          `}
        >
          {open ? (
            <CaretUpIcon height={20} width={20} />
          ) : (
            <CaretDownIcon height={20} width={20} />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="text-border"
        side={variant === "desktop" ? "top" : "bottom"}
      >
        <div
          className={`
            grid grid-cols-2 grid-cols-[auto_1fr] gap-2 p-2

            md:grid-cols-1 md:gap-4
          `}
        >
          {Object.keys(languageMap).map((locale) => (
            <div
              key={locale}
              onClick={() => handleChange(locale)}
              className="flex cursor-pointer items-center gap-2"
            >
              {languageMap[locale].flag}
              <p
                className={`
                  hidden

                  md:block
                `}
              >
                {languageMap[locale].name}
              </p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
