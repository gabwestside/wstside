'use client'

import {
  CalendarCheck2,
  Goal,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { signOutAction } from '@/app/actions/auth'
import type { AppUser } from '@/components/layout/app-shell'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    labelKey: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    labelKey: 'finances',
    href: '/finances',
    icon: WalletCards,
  },
  {
    labelKey: 'routine',
    href: '/routine',
    icon: CalendarCheck2,
  },
  {
    labelKey: 'goals',
    href: '/goals',
    icon: Goal,
  },
  {
    labelKey: 'menu',
    href: '/menu',
    icon: Menu,
  },
] as const

type AppSidebarProps = {
  user: AppUser
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const tNavigation = useTranslations('Navigation')
  const tCommon = useTranslations('Common')
  const tSidebar = useTranslations('Sidebar')

  return (
    <aside className='fixed inset-y-0 left-0 z-40 hidden w-72 border-r ws-sidebar ws-border px-5 py-6 shadow-2xl backdrop-blur-xl lg:flex lg:flex-col'>
      <div className='flex items-center gap-3 px-2'>
        <div className='flex size-11 items-center justify-center rounded-2xl ws-primary text-sm font-black shadow-lg'>
          W
        </div>

        <div>
          <p className='text-sm font-black uppercase tracking-[0.22em] ws-heading'>
            {tCommon('wstside')}
          </p>
          <p className='text-xs font-medium ws-muted'>{tCommon('tagline')}</p>
        </div>
      </div>

      <div className='mt-8 rounded-[1.75rem] border ws-border ws-surface-muted p-4'>
        <div className='flex items-center gap-3'>
          <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl ws-primary text-sm font-black shadow-sm'>
            {user.initials}
          </div>

          <div className='min-w-0'>
            <p className='truncate text-sm font-bold ws-heading'>{user.name}</p>
            <p className='truncate text-xs ws-muted'>{user.email}</p>
          </div>
        </div>
      </div>

      <nav className='mt-8 grid gap-2'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                isActive
                  ? 'ws-primary shadow-lg'
                  : 'ws-muted hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]',
              )}
            >
              <Icon
                className={cn(
                  'size-5 transition',
                  isActive
                    ? 'text-current'
                    : 'text-[var(--ws-muted)] group-hover:text-[var(--ws-primary-text)]',
                )}
              />
              {tNavigation(item.labelKey)}
            </Link>
          )
        })}
      </nav>

      <div className='mt-auto grid gap-4'>
        <div className='rounded-[1.75rem] border ws-border ws-surface-muted p-4'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-2xl ws-surface-solid text-[var(--ws-primary)] shadow-sm'>
              <Sparkles className='size-5' />
            </div>

            <div>
              <p className='text-sm font-bold ws-heading'>
                {tSidebar('v1Title')}
              </p>
              <p className='text-xs ws-muted'>{tSidebar('v1Description')}</p>
            </div>
          </div>
        </div>

        <form action={signOutAction}>
          <button
            type='submit'
            className='flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ws-muted transition hover:bg-[color-mix(in_srgb,var(--ws-danger)_12%,transparent)] hover:text-[var(--ws-danger)]'
          >
            <LogOut className='size-5' />
            {tNavigation('logout')}
          </button>
        </form>
      </div>
    </aside>
  )
}
