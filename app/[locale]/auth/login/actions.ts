'use server'

import { getLocale, getTranslations } from 'next-intl/server'

import { redirect } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'

export type LoginState = {
  error?: string
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const t = await getTranslations('Auth.login')
  const locale = await getLocale()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return {
      error: t('requiredFields'),
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: t('invalidCredentials'),
    }
  }

  redirect({
    href: '/dashboard',
    locale,
  })

  return {}
}
