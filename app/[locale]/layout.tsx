import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { AppLoading } from '@/components/layout/app-loading'
import { routing } from '@/i18n/routing'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

type AppLocale = (typeof routing.locales)[number]

const metadataByLocale: Record<AppLocale, Metadata> = {
  'pt-BR': {
    title: {
      default: 'WstSide',
      template: '%s | WstSide',
    },
    description:
      'Sistema pessoal para organizar finanças, rotina, metas e evolução.',
  },
  en: {
    title: {
      default: 'WstSide',
      template: '%s | WstSide',
    },
    description:
      'Personal system to organize finances, routine, goals and personal growth.',
  },
  es: {
    title: {
      default: 'WstSide',
      template: '%s | WstSide',
    },
    description:
      'Sistema personal para organizar finanzas, rutina, metas y evolución personal.',
  },
  'zh-CN': {
    title: {
      default: 'WstSide',
      template: '%s | WstSide',
    },
    description: '用于管理财务、日程、目标和个人成长的个人系统。',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return metadataByLocale[routing.defaultLocale]
  }

  return metadataByLocale[locale]
}

async function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: AppLocale
}) {
  setRequestLocale(locale)

  const messages = (await import(`../../messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <Suspense fallback={<AppLoading />}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </Suspense>
  )
}