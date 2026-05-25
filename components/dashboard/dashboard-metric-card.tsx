import type { LucideIcon } from 'lucide-react'

type DashboardMetricCardProps = {
  title: string
  value: string
  description: string
  badge?: string
  icon: LucideIcon
  tone?: 'primary' | 'warning' | 'info' | 'danger'
}

const toneStyles = {
  primary: {
    text: 'text-[var(--ws-primary-text)]',
    background: 'ws-primary-soft',
    icon: 'text-[var(--ws-primary)]',
  },
  warning: {
    text: 'text-[var(--ws-warning)]',
    background: '',
    icon: 'text-[var(--ws-warning)]',
  },
  info: {
    text: 'text-[var(--ws-info)]',
    background: '',
    icon: 'text-[var(--ws-info)]',
  },
  danger: {
    text: 'text-[var(--ws-danger)]',
    background: '',
    icon: 'text-[var(--ws-danger)]',
  },
}

export function DashboardMetricCard({
  title,
  value,
  description,
  badge,
  icon: Icon,
  tone = 'primary',
}: DashboardMetricCardProps) {
  const styles = toneStyles[tone]

  return (
    <div className='rounded-[2rem] border ws-border ws-surface p-5 shadow-xl'>
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <p
            className={`text-xs font-black uppercase tracking-[0.18em] ${styles.text}`}
          >
            {title}
          </p>

          <p className='mt-3 text-3xl font-black tracking-tight ws-heading'>
            {value}
          </p>
        </div>

        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${styles.background}`}
          style={
            tone === 'primary'
              ? undefined
              : {
                  background: `color-mix(in srgb, var(--ws-${tone}) 14%, transparent)`,
                }
          }
        >
          <Icon className={`size-5 ${styles.icon}`} />
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center gap-3'>
        <p className='text-sm leading-6 ws-muted'>{description}</p>

        {badge ? (
          <span className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-black text-[var(--ws-primary-text)]'>
            {badge}
          </span>
        ) : null}
      </div>
    </div>
  )
}
