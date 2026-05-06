'use client'

import {
  CalendarCheck2,
  Goal,
  LayoutDashboard,
  Menu,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navigationItems = [
  {
    label: 'Início',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Finanças',
    href: '/finances',
    icon: WalletCards,
  },
  {
    label: 'Rotina',
    href: '/routine',
    icon: CalendarCheck2,
  },
  {
    label: 'Metas',
    href: '/goals',
    icon: Goal,
  },
  {
    label: 'Menu',
    href: '/menu',
    icon: Menu,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className='fixed inset-x-3 bottom-3 z-50 rounded-[2rem] border border-emerald-100 bg-white/90 p-2 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl lg:hidden'>
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
                'flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[0.68rem] font-bold transition',
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700',
              )}
            >
              <Icon className='size-5' />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
