import { AlertTriangle, ArrowLeft, RefreshCw, ShieldAlert } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const errorCode = params?.error
  const t = await getTranslations('Auth.error')

  return (
    <div className='space-y-6'>
      <div
        className='rounded-[1.5rem] border p-5'
        style={{
          background: 'color-mix(in srgb, var(--ws-danger) 10%, transparent)',
          borderColor: 'color-mix(in srgb, var(--ws-danger) 24%, transparent)',
        }}
      >
        <div className='flex gap-4'>
          <div
            className='flex size-10 shrink-0 items-center justify-center rounded-2xl text-white'
            style={{ background: 'var(--ws-danger)' }}
          >
            <AlertTriangle className='size-5' />
          </div>

          <div className='space-y-1'>
            <p className='font-bold ws-heading'>{t('actionFailedTitle')}</p>

            <p className='text-sm leading-6 ws-muted'>
              {t('actionFailedDescription')}
            </p>
          </div>
        </div>
      </div>

      {errorCode ? (
        <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
          <p className='text-sm font-bold ws-heading'>{t('technicalCode')}</p>
          <p className='mt-1 break-words text-sm leading-6 ws-muted'>
            {errorCode}
          </p>
        </div>
      ) : (
        <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
          <p className='text-sm font-bold ws-heading'>
            {t('unspecifiedTitle')}
          </p>
          <p className='mt-1 text-sm leading-6 ws-muted'>
            {t('unspecifiedDescription')}
          </p>
        </div>
      )}
    </div>
  )
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const t = await getTranslations('Auth.error')

  return (
    <AuthPageShell
      namespace='Auth.error'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'recommendedPathEyebrow',
        titleKey: 'recommendedPathTitle',
        descriptionKey: 'recommendedPathDescription',
      }}
      stats={[
        {
          labelKey: 'loginStep',
          value: '01',
        },
        {
          labelKey: 'linkStep',
          value: '02',
        },
        {
          labelKey: 'accessStep',
          value: '03',
        },
      ]}
    >
      <Card className='w-full overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div
              className='flex size-12 items-center justify-center rounded-2xl text-white shadow-lg'
              style={{
                background: 'var(--ws-danger)',
                boxShadow:
                  '0 16px 40px color-mix(in srgb, var(--ws-danger) 25%, transparent)',
              }}
            >
              <ShieldAlert className='size-6' />
            </div>

            <div
              className='rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide'
              style={{
                color: 'var(--ws-danger)',
                background:
                  'color-mix(in srgb, var(--ws-danger) 10%, transparent)',
                borderColor:
                  'color-mix(in srgb, var(--ws-danger) 22%, transparent)',
              }}
            >
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

        <CardContent className='space-y-6'>
          <Suspense
            fallback={
              <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
                <p className='text-sm ws-muted'>{t('loadingDetails')}</p>
              </div>
            }
          >
            <ErrorContent searchParams={searchParams} />
          </Suspense>

          <div className='grid gap-3'>
            <Button
              asChild
              className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition'
            >
              <Link href='/auth/login'>
                <ArrowLeft className='mr-2 size-4' />
                {t('backToLogin')}
              </Link>
            </Button>

            <Button
              asChild
              variant='outline'
              className='h-12 w-full rounded-2xl border ws-border ws-surface-solid text-base font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
            >
              <Link href='/auth/forgot-password'>
                <RefreshCw className='mr-2 size-4' />
                {t('recoverAccess')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthPageShell>
  )
}
