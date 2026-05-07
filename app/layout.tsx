import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { DEFAULT_WSTSIDE_THEME, WSTSIDE_THEME_VALUES } from '@/lib/themes'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'WstSide',
    template: '%s | WstSide',
  },
  description:
    'Sistema pessoal para organizar finanças, rotina, metas e evolução.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className='min-h-svh bg-background text-foreground antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme={DEFAULT_WSTSIDE_THEME}
          themes={[...WSTSIDE_THEME_VALUES]}
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
