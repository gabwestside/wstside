import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import type { ReactNode } from 'react'

import { AppShell, type AppUser } from '@/components/layout/app-shell'
import { createClient } from '@/lib/supabase/server'

function getInitials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean)

  if (parts.length === 0) {
    return 'WS'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

type PrivateAppLayoutProps = {
  children: ReactNode
}

export async function PrivateAppLayout({ children }: PrivateAppLayoutProps) {
  await connection()

  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  const name =
    typeof user.user_metadata?.name === 'string' && user.user_metadata.name
      ? user.user_metadata.name
      : (user.email?.split('@')[0] ?? 'Usuário')

  const appUser: AppUser = {
    name,
    email: user.email ?? '',
    initials: getInitials(name),
  }

  return <AppShell user={appUser}>{children}</AppShell>
}
