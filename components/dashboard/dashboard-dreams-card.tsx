import { Plus, Rocket } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

type DashboardDreamsCardProps = {
  title: string
  emptyTitle: string
  emptyDescription: string
  actionLabel: string
  suggestionsTitle: string
  suggestions: {
    title: string
    description: string
  }[]
}

export function DashboardDreamsCard({
  title,
  emptyTitle,
  emptyDescription,
  actionLabel,
  suggestionsTitle,
  suggestions,
}: DashboardDreamsCardProps) {
  return (
    <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
      <CardHeader>
        <div className='flex items-center justify-between gap-4'>
          <CardTitle className='text-2xl font-black ws-heading'>
            {title}
          </CardTitle>

          <Button
            asChild
            size='icon'
            className='size-10 rounded-2xl ws-primary shadow-lg'
          >
            <Link href='/goals' aria-label={actionLabel}>
              <Plus className='size-5' />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='rounded-[2rem] border border-dashed ws-border ws-surface-muted p-6 text-center'>
          <div className='mx-auto flex size-14 items-center justify-center rounded-2xl ws-surface-solid text-[var(--ws-primary)] shadow-sm'>
            <Rocket className='size-7' />
          </div>

          <h3 className='mt-4 text-lg font-black ws-heading'>
            {emptyTitle}
          </h3>

          <p className='mx-auto mt-2 max-w-xs text-sm leading-6 ws-muted'>
            {emptyDescription}
          </p>

          <Button
            asChild
            className='mt-5 h-11 rounded-2xl ws-primary px-5 font-semibold shadow-lg'
          >
            <Link href='/goals'>{actionLabel}</Link>
          </Button>
        </div>

        <div>
          <p className='text-xs font-black uppercase tracking-[0.18em] ws-muted'>
            {suggestionsTitle}
          </p>

          <div className='mt-4 grid gap-3'>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.title}
                className='flex items-center gap-3 rounded-[1.25rem] border ws-border ws-surface-muted p-4'
              >
                <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl ws-primary-soft text-[var(--ws-primary)]'>
                  <Rocket className='size-5' />
                </div>

                <div className='min-w-0'>
                  <p className='truncate text-sm font-bold ws-heading'>
                    {suggestion.title}
                  </p>
                  <p className='text-xs ws-muted'>{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}