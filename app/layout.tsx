import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'WstSide',
    template: '%s | WstSide',
  },
  description:
    'Sistema pessoal para organizar finanças, rotina, metas e evolução.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use default locale for the root html element to avoid blocking
  // server rendering. The real locale and messages are loaded inside
  // `LocaleWrapper`, which runs inside a <Suspense> boundary.
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body className='min-h-svh bg-background text-foreground antialiased'>
        <Suspense fallback={null}>
          <LocaleWrapper>{children}</LocaleWrapper>
        </Suspense>
      </body>
    </html>
  )
}

async function LocaleWrapper({ children }: { children: React.ReactNode }) {
  const { getLocale } = await import('next-intl/server')
  const locale = await getLocale()

  const messages = (await import(`../messages/${locale}.json`)).default

  const { NextIntlClientProvider } = await import('next-intl')

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute='class'
        defaultTheme='theme-wstside-light'
        themes={[
          'theme-wstside-light',
          'theme-wstside-dark',
          'theme-christmas',
          'theme-space-odyssey',
          'theme-spider',
        ]}
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
