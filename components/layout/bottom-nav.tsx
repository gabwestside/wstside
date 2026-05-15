'use client'

import {
  CalendarCheck2,
  Goal,
  LayoutDashboard,
  Menu,
  WalletCards,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    labelKey: 'home',
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

export function BottomNav() {
  const pathname = usePathname()
  const tNavigation = useTranslations('Navigation')

  return (
    <nav className='fixed inset-x-3 bottom-3 z-50 rounded-[2rem] border ws-sidebar ws-border p-2 shadow-2xl backdrop-blur-xl lg:hidden'>
      <div className='grid grid-cols-5 gap-1'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[0.68rem] font-bold transition',
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
              <span>{tNavigation(item.labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
