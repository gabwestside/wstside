import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // locales: ['pt-BR', 'en', 'es'],
  locales: ['pt-BR', 'en'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed',
})
