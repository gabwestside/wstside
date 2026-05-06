'use client'

import type { ReactNode } from 'react'

import { AppSidebar } from './app-sidebar'
import { BottomNav } from './bottom-nav'

export type AppUser = {
  name: string
  email: string
  initials: string
}

type AppShellProps = {
  children: ReactNode
  user: AppUser
}

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className='min-h-svh bg-[#f4fbf7]'>
      <AppSidebar user={user} />

      <div className='lg:pl-72'>
        <main className='mx-auto min-h-svh w-full max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8'>
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
