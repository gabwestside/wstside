import {
  ArrowUpRight,
  CalendarCheck2,
  CheckCircle2,
  Flame,
  Goal,
  Plus,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { connection } from 'next/server'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const nextSteps = [
  'registerCurrentAssets',
  'registerFirstIncome',
  'registerFirstExpense',
  'createFinancialGoal',
  'buildDailyRoutine',
] as const

type DashboardPageProps = {
  params: Promise<{
    locale: string
  }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  await connection()

  const { locale: rawLocale } = await params

  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale

  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  })

  const today = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date())

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  })

  const zeroCurrency = currencyFormatter.format(0)

  return (
    <div className='space-y-6'>
      <section className='flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
        <div className='space-y-2'>
          <Badge className='rounded-full border ws-border ws-primary-soft px-3 py-1 hover:bg-[var(--ws-primary-soft)]'>
            {t('badge')}
          </Badge>

          <div>
            <h1 className='text-3xl font-black tracking-tight ws-heading sm:text-4xl'>
              {t('title')}
            </h1>

            <p className='mt-2 text-sm font-medium capitalize ws-muted'>
              {today}
            </p>
          </div>
        </div>

        <div className='flex gap-3'>
          <Button
            asChild
            className='h-11 rounded-2xl ws-primary px-5 font-semibold shadow-lg'
          >
            <Link href='/finances'>
              <Plus className='mr-2 size-4' />
              {t('newRecord')}
            </Link>
          </Button>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-primary-text)]'>
                {t('cards.currentAssets.label')}
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {zeroCurrency}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
              <WalletCards className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              {t('cards.currentAssets.description')}
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-info)]'>
                {t('cards.monthIncome.label')}
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {zeroCurrency}
              </CardTitle>
            </div>

            <div
              className='flex size-11 items-center justify-center rounded-2xl'
              style={{
                background:
                  'color-mix(in srgb, var(--ws-info) 14%, transparent)',
                color: 'var(--ws-info)',
              }}
            >
              <TrendingUp className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              {t('cards.monthIncome.description')}
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-danger)]'>
                {t('cards.monthExpenses.label')}
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {zeroCurrency}
              </CardTitle>
            </div>

            <div
              className='flex size-11 items-center justify-center rounded-2xl'
              style={{
                background:
                  'color-mix(in srgb, var(--ws-danger) 14%, transparent)',
                color: 'var(--ws-danger)',
              }}
            >
              <TrendingDown className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              {t('cards.monthExpenses.description')}
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-warning)]'>
                {t('cards.streak.label')}
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {t('cards.streak.value', { count: 0 })}
              </CardTitle>
            </div>

            <div
              className='flex size-11 items-center justify-center rounded-2xl'
              style={{
                background:
                  'color-mix(in srgb, var(--ws-warning) 14%, transparent)',
                color: 'var(--ws-warning)',
              }}
            >
              <Flame className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              {t('cards.streak.description')}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.2fr_0.8fr]'>
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black ws-heading'>
                  {t('monthlySummary.title')}
                </CardTitle>
                <CardDescription className='ws-muted'>
                  {t('monthlySummary.description')}
                </CardDescription>
              </div>

              <Badge
                variant='outline'
                className='rounded-full border ws-border ws-surface-muted ws-muted'
              >
                V1
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-muted'>
                {t('monthlySummary.balance')}
              </p>
              <p className='mt-2 text-2xl font-black ws-heading'>
                {zeroCurrency}
              </p>
            </div>

            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-muted'>
                {t('monthlySummary.savings')}
              </p>
              <p className='mt-2 text-2xl font-black ws-heading'>0%</p>
            </div>

            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-muted'>
                {t('monthlySummary.records')}
              </p>
              <p className='mt-2 text-2xl font-black ws-heading'>0</p>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black ws-heading'>
                  {t('todayRoutine.title')}
                </CardTitle>
                <CardDescription className='ws-muted'>
                  {t('todayRoutine.description')}
                </CardDescription>
              </div>

              <div
                className='flex size-11 items-center justify-center rounded-2xl'
                style={{
                  background:
                    'color-mix(in srgb, var(--ws-info) 14%, transparent)',
                  color: 'var(--ws-info)',
                }}
              >
                <CalendarCheck2 className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-bold ws-heading'>
                {t('todayRoutine.completed')}
              </span>
              <span className='font-black ws-heading'>0%</span>
            </div>

            <Progress value={0} />

            <Button
              asChild
              variant='outline'
              className='h-11 w-full rounded-2xl border ws-border ws-surface-solid font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
            >
              <Link href='/routine'>
                {t('todayRoutine.createRoutine')}
                <ArrowUpRight className='ml-2 size-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.8fr_1.2fr]'>
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black ws-heading'>
                  {t('financialGoals.title')}
                </CardTitle>
                <CardDescription className='ws-muted'>
                  {t('financialGoals.description')}
                </CardDescription>
              </div>

              <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
                <Goal className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-heading'>
                {t('financialGoals.emptyTitle')}
              </p>
              <p className='mt-1 text-sm leading-6 ws-muted'>
                {t('financialGoals.emptyDescription')}
              </p>
            </div>

            <Button
              asChild
              variant='outline'
              className='h-11 w-full rounded-2xl border ws-border ws-surface-solid font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
            >
              <Link href='/goals'>
                {t('financialGoals.createGoal')}
                <ArrowUpRight className='ml-2 size-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-primary shadow-xl'>
          <CardHeader>
            <CardTitle className='text-xl font-black'>
              {t('v1NextSteps.title')}
            </CardTitle>
            <CardDescription className='opacity-75'>
              {t('v1NextSteps.description')}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-3'>
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className='flex items-center gap-3 rounded-2xl border border-current/10 bg-current/10 p-4'
              >
                <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-current/10 text-sm font-black'>
                  {index + 1}
                </div>

                <p className='text-sm font-semibold'>
                  {t(`v1NextSteps.items.${step}`)}
                </p>

                <CheckCircle2 className='ml-auto size-5 opacity-40' />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
