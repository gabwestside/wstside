'use client'

import { CheckCircle2, Languages } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn, removeLocalePrefix } from '@/lib/utils'

export function LanguageSelector() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('Languages')
  const [isPending, startTransition] = useTransition()

  function handleChangeLocale(nextLocale: (typeof routing.locales)[number]) {
    if (nextLocale === locale) {
      return
    }

    const currentBrowserPathname =
      typeof window !== 'undefined' ? window.location.pathname : pathname

    const cleanPathname = removeLocalePrefix(currentBrowserPathname)

    const query = Object.fromEntries(searchParams.entries())

    startTransition(() => {
      if (Object.keys(query).length > 0) {
        router.replace(
          {
            pathname: cleanPathname,
            query,
          },
          {
            locale: nextLocale,
          },
        )

        return
      }

      router.replace(cleanPathname, {
        locale: nextLocale,
      })
    })
  }

  return (
    <div className='grid gap-3 sm:grid-cols-3'>
      {routing.locales.map((item) => {
        const isActive = locale === item

        return (
          <button
            key={item}
            type='button'
            disabled={isPending || isActive}
            onClick={() => handleChangeLocale(item)}
            className={cn(
              'group rounded-[1.75rem] border p-4 text-left transition ws-surface hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80',
              isActive
                ? 'border-[var(--ws-primary)] ring-2 ring-[var(--ws-primary)]/25'
                : 'ws-border',
            )}
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
                <Languages className='size-5' />
              </div>

              {isActive ? (
                <CheckCircle2 className='size-5 text-[var(--ws-primary)]' />
              ) : null}
            </div>

            <div className='mt-4'>
              <p className='font-black ws-heading'>{t(item)}</p>
              <p className='mt-1 text-sm leading-6 ws-muted'>{item}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
