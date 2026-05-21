'use client'

import { ArrowRight, Eye, LockKeyhole, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export function UpdatePasswordForm({ className }: { className?: string }) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Auth.updatePassword')

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)
    setError(null)

    if (password.length < 6) {
      setError(t('passwordMin'))
      setIsLoading(false)
      return
    }

    if (password !== repeatPassword) {
      setError(t('passwordMismatch'))
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      router.push('/dashboard', {
        locale,
      })
    } catch {
      setError(t('genericError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn('w-full', className)}
    >
      <Card className='overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
              <ShieldCheck className='size-6' />
            </div>

            <div className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide'>
              {t('badge')}
            </div>
          </div>

          <div className='space-y-2'>
            <CardTitle className='text-3xl font-black tracking-tight ws-heading'>
              {t('title')}
            </CardTitle>

            <CardDescription className='text-base leading-relaxed ws-muted'>
              {t('description')}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdatePassword} className='space-y-5'>
            {error ? (
              <Alert
                className='rounded-2xl border text-[var(--ws-danger)]'
                style={{
                  background:
                    'color-mix(in srgb, var(--ws-danger) 10%, transparent)',
                  borderColor:
                    'color-mix(in srgb, var(--ws-danger) 24%, transparent)',
                }}
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm font-semibold ws-heading'
              >
                {t('password')}
              </Label>

              <div className='relative'>
                <LockKeyhole className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder={t('passwordPlaceholder')}
                  required
                  autoComplete='new-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className='h-12 rounded-2xl border ws-border ws-surface-muted pl-11 pr-11 text-base shadow-none placeholder:text-[var(--ws-muted)] focus-visible:ring-[var(--ws-primary)]'
                />
                <Eye className='pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 ws-muted opacity-60' />
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='repeat-password'
                className='text-sm font-semibold ws-heading'
              >
                {t('confirmPassword')}
              </Label>

              <div className='relative'>
                <LockKeyhole className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
                <Input
                  id='repeat-password'
                  name='repeat-password'
                  type='password'
                  placeholder={t('confirmPasswordPlaceholder')}
                  required
                  autoComplete='new-password'
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  className='h-12 rounded-2xl border ws-border ws-surface-muted pl-11 pr-11 text-base shadow-none placeholder:text-[var(--ws-muted)] focus-visible:ring-[var(--ws-primary)]'
                />
                <Eye className='pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 ws-muted opacity-60' />
              </div>
            </div>

            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-heading'>
                {t('securityTipTitle')}
              </p>
              <p className='mt-1 text-sm leading-6 ws-muted'>
                {t('securityTipDescription')}
              </p>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isLoading ? t('submitting') : t('submit')}
              {!isLoading && <ArrowRight className='ml-2 size-4' />}
            </Button>

            <div className='pt-2 text-center text-sm ws-muted'>
              {t('alreadyUpdated')}{' '}
              <Link
                href='/auth/login'
                className='font-semibold text-[var(--ws-primary-text)] underline-offset-4 hover:underline'
              >
                {t('login')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
