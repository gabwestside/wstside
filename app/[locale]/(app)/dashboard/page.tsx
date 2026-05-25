import {
  Brain,
  Clock3,
  Flame,
  TrendingUp
} from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { connection } from 'next/server'

import { DashboardDreamsCard } from '@/components/dashboard/dashboard-dreams-card'
import { DashboardMetricCard } from '@/components/dashboard/dashboard-metric-card'
import { DashboardOverviewCard } from '@/components/dashboard/dashboard-overview-card'
import { DashboardRecentFlowCard } from '@/components/dashboard/dashboard-recent-flow-card'
import { DashboardWstIaTipCard } from '@/components/dashboard/dashboard-wstia-tip-card'
import { Badge } from '@/components/ui/badge'
import { redirect } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { createClient } from '@/lib/supabase/server'

type DashboardPageProps = {
  params: Promise<{
    locale: string
  }>
}

type FinancialAccount = {
  id: string
  name: string
  type: string
  balance: number
  created_at: string
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
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

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect({
      href: '/auth/login',
      locale,
    })
  }

  const { data } = await supabase
    .from('financial_accounts')
    .select('id, name, type, balance, created_at')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const accounts = (data ?? []) as FinancialAccount[]

  const totalCapital = accounts.reduce(
    (total, account) => total + Number(account.balance),
    0,
  )

  const accountCount = accounts.length

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  })

  const compactCurrencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })

  const today = dateFormatter.format(new Date())

  const userName =
    typeof user?.user_metadata?.name === 'string' && user.user_metadata.name
      ? user.user_metadata.name.split(' ')[0]
      : (user?.email?.split('@')[0] ?? 'WstSider')

  const financialScore = clampScore(
    accountCount === 0
      ? 0
      : 35 + accountCount * 12 + Math.min(totalCapital / 1000, 35),
  )

  const routineScore = 0
  const physicalScore = 0
  const wstIaScore = clampScore(accountCount > 0 ? 35 : 10)

  const overviewMetrics = [
    {
      key: 'financial',
      label: t('overview.metrics.financial'),
      value: financialScore,
    },
    {
      key: 'discipline',
      label: t('overview.metrics.discipline'),
      value: routineScore,
    },
    {
      key: 'wstia',
      label: t('overview.metrics.wstia'),
      value: wstIaScore,
    },
    {
      key: 'physical',
      label: t('overview.metrics.physical'),
      value: physicalScore,
    },
  ]

  const recentFlow = accounts.slice(0, 2).map((account) => ({
    title: account.name,
    description: t('recentFlow.accountRecord'),
    value: currencyFormatter.format(Number(account.balance)),
    type: 'income' as const,
  }))

  return (
    <div className='space-y-5 pb-6'>
      <section className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex size-14 items-center justify-center rounded-[1.5rem] ws-primary shadow-xl'>
            <Brain className='size-7' />
          </div>

          <div>
            <p className='text-sm capitalize ws-muted'>{today}</p>
            <h1 className='text-3xl font-black tracking-tight ws-heading sm:text-4xl'>
              {t('hero.greeting', { name: userName })}
            </h1>
          </div>
        </div>

        <Badge className='w-fit rounded-full border ws-border ws-primary-soft px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--ws-primary-text)] hover:bg-[var(--ws-primary-soft)]'>
          {t('hero.badge')}
        </Badge>
      </section>

      <section className='grid gap-4 lg:grid-cols-3'>
        <DashboardMetricCard
          title={t('capital.title')}
          value={currencyFormatter.format(totalCapital)}
          description={
            totalCapital > 0
              ? t('capital.positiveDescription')
              : t('capital.emptyDescription')
          }
          badge={totalCapital > 0 ? t('capital.badge') : undefined}
          icon={TrendingUp}
          tone='primary'
        />

        <DashboardMetricCard
          title={t('streak.title')}
          value={t('streak.value', { count: 0 })}
          description={t('streak.description')}
          icon={Flame}
          tone='warning'
        />

        <DashboardMetricCard
          title={t('dayDomain.title')}
          value='0%'
          description={t('dayDomain.description')}
          icon={Clock3}
          tone='info'
        />
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.25fr_0.75fr]'>
        <DashboardOverviewCard
          title={t('overview.title')}
          description={t('overview.description')}
          periodLabel={t('overview.period')}
          metrics={overviewMetrics}
        />

        <DashboardDreamsCard
          title={t('dreams.title')}
          emptyTitle={t('dreams.emptyTitle')}
          emptyDescription={t('dreams.emptyDescription')}
          actionLabel={t('dreams.action')}
          suggestionsTitle={t('dreams.suggestionsTitle')}
          suggestions={[
            {
              title: t('dreams.suggestions.emergencyReserve.title'),
              description: t('dreams.suggestions.emergencyReserve.description'),
            },
            {
              title: t('dreams.suggestions.vacation.title'),
              description: t('dreams.suggestions.vacation.description'),
            },
          ]}
        />
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.9fr_1.1fr]'>
        <DashboardRecentFlowCard
          title={t('recentFlow.title')}
          viewAll={t('recentFlow.viewAll')}
          emptyTitle={t('recentFlow.emptyTitle')}
          emptyDescription={t('recentFlow.emptyDescription')}
          items={recentFlow}
        />

        <DashboardWstIaTipCard
          badge={t('wstia.badge')}
          title={t('wstia.title')}
          description={
            totalCapital > 0
              ? t('wstia.descriptionWithCapital', {
                  amount: compactCurrencyFormatter.format(totalCapital),
                })
              : t('wstia.descriptionEmpty')
          }
          actionLabel={t('wstia.action')}
        />
      </section>
    </div>
  )
}
