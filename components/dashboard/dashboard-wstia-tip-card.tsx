import { Brain, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

type DashboardWstIaTipCardProps = {
  badge: string
  title: string
  description: string
  actionLabel: string
}

export function DashboardWstIaTipCard({
  badge,
  title,
  description,
  actionLabel,
}: DashboardWstIaTipCardProps) {
  return (
    <div className='relative overflow-hidden rounded-[2rem] border border-current/10 ws-primary p-6 shadow-2xl'>
      <div className='absolute -right-12 -top-12 size-40 rounded-full bg-current/10 blur-2xl' />
      <div className='absolute bottom-0 right-0 size-36 bg-current/10 opacity-60' />

      <div className='relative z-10 flex min-h-64 flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between gap-4'>
            <span className='inline-flex rounded-full border border-current/10 bg-current/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur'>
              {badge}
            </span>

            <Button
              asChild
              size='icon'
              className='size-11 rounded-2xl bg-current/10 text-current shadow-none hover:bg-current/20'
            >
              <Link href='/menu' aria-label={actionLabel}>
                <Plus className='size-5' />
              </Link>
            </Button>
          </div>

          <div className='mt-6 flex items-start gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-current/10'>
              <Brain className='size-6' />
            </div>

            <div>
              <h3 className='text-2xl font-black leading-tight'>{title}</h3>
              <p className='mt-3 max-w-lg text-sm leading-6 opacity-80'>
                {description}
              </p>
            </div>
          </div>
        </div>

        <Button
          asChild
          className='mt-8 h-11 w-fit rounded-2xl bg-current px-5 font-bold text-[var(--ws-primary)] hover:bg-current/90'
        >
          <Link href='/finances'>{actionLabel}</Link>
        </Button>
      </div>
    </div>
  )
}
