import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt-BR', 'en', 'es', 'zh-CN'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed',
})
