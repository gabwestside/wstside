import type { Metadata } from 'next'
import type { ReactNode } from 'react'

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
    <html lang='pt-BR'>
      <body className='min-h-svh bg-[#f4fbf7] text-slate-950 antialiased'>
        {children}
      </body>
    </html>
  )
}
