'use server'

import { getLocale } from 'next-intl/server'

import { redirect } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signOutAction() {
  const locale = await getLocale()
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect({
    href: '/auth/login',
    locale,
  })
}
