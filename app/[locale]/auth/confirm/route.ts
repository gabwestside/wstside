import { routing } from '@/i18n/routing'
import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { hasLocale } from 'next-intl'
import { type NextRequest, NextResponse } from 'next/server'

type ConfirmRouteContext = {
  params: Promise<{
    locale: string
  }>
}

function getLocalePrefix(locale: string) {
  return locale === routing.defaultLocale ? '' : `/${locale}`
}

function getSafeNextPath(next: string | null, locale: string) {
  const localePrefix = getLocalePrefix(locale)

  if (!next) {
    return `${localePrefix}/dashboard`
  }

  /**
   * Bloqueia redirects externos como:
   * https://site-malicioso.com
   * //site-malicioso.com
   */
  if (!next.startsWith('/') || next.startsWith('//')) {
    return `${localePrefix}/dashboard`
  }

  /**
   * Evita duplicar locale:
   * /en/dashboard dentro da rota /en/auth/confirm
   */
  const localePattern = new RegExp(
    `^/(${routing.locales
      .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})(?=/|$)`,
  )

  const cleanNext = next.replace(localePattern, '') || '/dashboard'

  return `${localePrefix}${cleanNext}`
}

function getErrorUrl(request: NextRequest, locale: string, error: string) {
  const url = request.nextUrl.clone()
  const localePrefix = getLocalePrefix(locale)

  url.pathname = `${localePrefix}/auth/error`
  url.search = ''
  url.searchParams.set('error', error)

  return url
}

export async function GET(
  request: NextRequest,
  { params }: ConfirmRouteContext,
) {
  const { locale: rawLocale } = await params

  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale

  const requestUrl = request.nextUrl
  const tokenHash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const next = requestUrl.searchParams.get('next')

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      getErrorUrl(request, locale, 'No token hash or type'),
    )
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  })

  if (error) {
    return NextResponse.redirect(getErrorUrl(request, locale, error.message))
  }

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = getSafeNextPath(next, locale)
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
