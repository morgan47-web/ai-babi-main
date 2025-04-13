import "server-only"

import linguiConfig from "../../lingui.config"
import { I18n, Messages, setupI18n } from "@lingui/core"

const { locales } = linguiConfig
// optionally use a stricter union type
type SupportedLocales = string

async function loadCatalog(locale: SupportedLocales): Promise<{
  [k: string]: Messages
}> {
  const { messages } = await import(`../locales/${locale}.js`)
  return {
    [locale]: messages,
  }
}
const catalogs = await Promise.all(locales.map(loadCatalog))

// transform array of catalogs into a single object
interface Catalog {
  [k: string]: Messages
}

export const allMessages: { [locale: string]: Messages } = catalogs.reduce(
  (acc: { [locale: string]: Messages }, oneCatalog: Catalog) => {
    return { ...acc, ...oneCatalog }
  },
  {},
)

type AllI18nInstances = { [K in SupportedLocales]: I18n }

interface I18nInstancesAccumulator {
  [locale: string]: I18n
}

export const allI18nInstances: AllI18nInstances =
  locales.reduce<I18nInstancesAccumulator>(
    (acc: I18nInstancesAccumulator, locale: SupportedLocales) => {
      const messages: Messages = allMessages[locale] ?? {}
      const i18n: I18n = setupI18n({
        locale,
        messages: { [locale]: messages },
      })
      return { ...acc, [locale]: i18n }
    },
    {},
  )

export const getI18nInstance = (locale: SupportedLocales): I18n => {
  if (!allI18nInstances[locale]) {
    console.warn(`No i18n instance found for locale "${locale}"`)
  }
  return allI18nInstances[locale]! || allI18nInstances["en"]!
}
