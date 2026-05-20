import { routing } from '@/i18n/routing'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const localePrefixRegex = new RegExp(
  `^/(${routing.locales.map(escapeRegex).join('|')})(?=/|$)`,
)

export function removeLocalePrefix(pathname: string) {
  let cleanPathname = pathname || '/'

  while (localePrefixRegex.test(cleanPathname)) {
    cleanPathname = cleanPathname.replace(localePrefixRegex, '') || '/'
  }

  return cleanPathname.startsWith('/') ? cleanPathname : `/${cleanPathname}`
}

export const hasEnvVars = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)
