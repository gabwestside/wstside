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
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { signOutAction } from '@/app/actions/auth'
import type { AppUser } from '@/components/layout/app-shell'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    label: 'Dashboard',
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

type AppSidebarProps = {
  user: AppUser
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className='fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-emerald-100/80 bg-white/80 px-5 py-6 shadow-2xl shadow-emerald-950/5 backdrop-blur-xl lg:flex lg:flex-col'>
      <div className='flex items-center gap-3 px-2'>
        <div className='flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/15'>
          W
        </div>

        <div>
          <p className='text-sm font-black uppercase tracking-[0.22em] text-slate-950'>
            WstSide
          </p>
          <p className='text-xs font-medium text-slate-500'>
            Life Operating System
          </p>
        </div>
      </div>

      <div className='mt-8 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/70 p-4'>
        <div className='flex items-center gap-3'>
          <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white'>
            {user.initials}
          </div>

          <div className='min-w-0'>
            <p className='truncate text-sm font-bold text-slate-950'>
              {user.name}
            </p>
            <p className='truncate text-xs text-slate-500'>{user.email}</p>
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
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
              )}
            >
              <Icon
                className={cn(
                  'size-5 transition',
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 group-hover:text-emerald-600',
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className='mt-auto grid gap-4'>
        <div className='rounded-[1.75rem] border border-slate-100 bg-slate-50 p-4'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm'>
              <Sparkles className='size-5' />
            </div>

            <div>
              <p className='text-sm font-bold text-slate-950'>
                V1 em progresso
              </p>
              <p className='text-xs text-slate-500'>
                Login, dashboard, finanças e rotina.
              </p>
            </div>
          </div>
        </div>

        <form action={signOutAction}>
          <button
            type='submit'
            className='flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600'
          >
            <LogOut className='size-5' />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
