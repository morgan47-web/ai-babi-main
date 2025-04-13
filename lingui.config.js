/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "es", "fr", "de", "it"],
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src/"],
    },
  ],
}
