'use client'

import { CheckCircle2, Palette } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { WSTSIDE_THEMES } from '@/lib/themes'
import { cn } from '@/lib/utils'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('Themes')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='grid gap-3 sm:grid-cols-2'>
        {WSTSIDE_THEMES.map((item) => (
          <div
            key={item.value}
            className='h-32 animate-pulse rounded-[1.5rem] border ws-border ws-surface-muted sm:h-36 sm:rounded-[1.75rem]'
          />
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-3 sm:grid-cols-2'>
      {WSTSIDE_THEMES.map((item) => {
        const isActive = theme === item.value

        return (
          <button
            key={item.value}
            type='button'
            onClick={() => setTheme(item.value)}
            className={cn(
              'group rounded-[1.5rem] border p-4 text-left transition ws-surface hover:-translate-y-0.5 sm:rounded-[1.75rem]',
              isActive
                ? 'border-[var(--ws-primary)] ring-2 ring-[var(--ws-primary)]/25'
                : 'ws-border',
            )}
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='flex size-10 items-center justify-center rounded-2xl ws-primary-soft sm:size-11'>
                <Palette className='size-5' />
              </div>

              {isActive ? (
                <CheckCircle2 className='size-5 text-[var(--ws-primary)]' />
              ) : (
                <span className='rounded-full border px-2 py-1 text-[0.65rem] font-black uppercase tracking-wide ws-border ws-muted'>
                  {t(item.badgeKey)}
                </span>
              )}
            </div>

            <div className='mt-3 sm:mt-4'>
              <p className='font-black ws-heading'>{t(item.labelKey)}</p>

              <p className='mt-1 text-xs leading-5 ws-muted sm:text-sm sm:leading-6'>
                {t(item.descriptionKey)}
              </p>
            </div>

            <div className='mt-3 flex gap-2 sm:mt-4'>
              {item.preview.map((color) => (
                <span
                  key={color}
                  className='size-6 rounded-full border border-white/40 shadow-sm sm:size-7'
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}
