import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

type RecentFlowItem = {
  title: string
  description: string
  value: string
  type: 'income' | 'expense'
}

type DashboardRecentFlowCardProps = {
  title: string
  viewAll: string
  emptyTitle: string
  emptyDescription: string
  items: RecentFlowItem[]
}

export function DashboardRecentFlowCard({
  title,
  viewAll,
  emptyTitle,
  emptyDescription,
  items,
}: DashboardRecentFlowCardProps) {
  return (
    <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
      <CardHeader>
        <div className='flex items-center justify-between gap-4'>
          <CardTitle className='text-2xl font-black ws-heading'>
            {title}
          </CardTitle>

          <Button
            asChild
            variant='ghost'
            className='rounded-2xl text-sm font-bold text-[var(--ws-primary-text)] hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
          >
            <Link href='/finances'>{viewAll}</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
            <p className='text-sm font-bold ws-heading'>{emptyTitle}</p>
            <p className='mt-1 text-sm leading-6 ws-muted'>
              {emptyDescription}
            </p>
          </div>
        ) : (
          <div className='grid gap-3'>
            {items.map((item) => {
              const isIncome = item.type === 'income'

              return (
                <div
                  key={`${item.title}-${item.value}`}
                  className='flex items-center justify-between gap-4 rounded-[1.5rem] border ws-border ws-surface-muted p-4'
                >
                  <div className='flex min-w-0 items-center gap-3'>
                    <div
                      className='flex size-11 shrink-0 items-center justify-center rounded-2xl'
                      style={{
                        color: isIncome
                          ? 'var(--ws-primary)'
                          : 'var(--ws-danger)',
                        background: isIncome
                          ? 'var(--ws-primary-soft)'
                          : 'color-mix(in srgb, var(--ws-danger) 12%, transparent)',
                      }}
                    >
                      {isIncome ? (
                        <ArrowUpRight className='size-5' />
                      ) : (
                        <ArrowDownRight className='size-5' />
                      )}
                    </div>

                    <div className='min-w-0'>
                      <p className='truncate text-sm font-bold ws-heading'>
                        {item.title}
                      </p>
                      <p className='text-xs ws-muted'>{item.description}</p>
                    </div>
                  </div>

                  <p
                    className='shrink-0 text-sm font-black'
                    style={{
                      color: isIncome
                        ? 'var(--ws-primary)'
                        : 'var(--ws-danger)',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
