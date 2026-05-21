'use client'

import { Check, Languages } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const localeShortLabels: Record<string, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
  'zh-CN': '中文',
}

export function AuthLanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tLanguages = useTranslations('Languages')
  const tSettings = useTranslations('Settings')
  const [isPending, startTransition] = useTransition()

  function handleChangeLocale(nextLocale: string) {
    if (nextLocale === locale) {
      return
    }

    const query = Object.fromEntries(searchParams.entries())

    startTransition(() => {
      router.replace(
        Object.keys(query).length > 0
          ? {
              pathname,
              query,
            }
          : pathname,
        {
          locale: nextLocale,
        },
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type='button'
          variant='outline'
          disabled={isPending}
          className='h-10 rounded-2xl border ws-border ws-surface-muted px-3 text-xs font-bold ws-heading shadow-sm transition hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)] disabled:cursor-not-allowed disabled:opacity-70'
          aria-label={tSettings('language')}
        >
          <Languages className='mr-2 size-4 text-[var(--ws-primary)]' />
          {localeShortLabels[locale] ?? locale}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-56 rounded-2xl border ws-border ws-surface p-2 shadow-2xl'
      >
        <DropdownMenuLabel className='px-3 py-2 text-xs font-black uppercase tracking-wide ws-muted'>
          {tSettings('language')}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className='bg-[var(--ws-border)]' />

        {routing.locales.map((item) => {
          const isActive = locale === item

          return (
            <DropdownMenuItem
              key={item}
              disabled={isPending || isActive}
              onClick={() => handleChangeLocale(item)}
              className={cn(
                'cursor-pointer rounded-xl px-3 py-3 text-sm font-semibold ws-heading focus:bg-[var(--ws-primary-soft)] focus:text-[var(--ws-primary-text)]',
                isActive &&
                  'bg-[var(--ws-primary-soft)] text-[var(--ws-primary-text)]',
              )}
            >
              <div className='flex w-full items-center justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='truncate'>{tLanguages(item)}</p>
                  <p className='text-xs font-medium ws-muted'>{item}</p>
                </div>

                {isActive ? (
                  <Check className='size-4 shrink-0 text-[var(--ws-primary)]' />
                ) : null}
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
