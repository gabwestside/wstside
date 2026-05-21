import { ArrowRight, CheckCircle2, MailCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

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

export default async function SignUpSuccessPage() {
  const t = await getTranslations('Auth.signUpSuccess')

  return (
    <AuthPageShell
      namespace='Auth.signUpSuccess'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'nextStepEyebrow',
        titleKey: 'nextStepTitle',
        descriptionKey: 'nextStepDescription',
      }}
      stats={[
        {
          labelKey: 'accountStep',
          value: 'OK',
        },
        {
          labelKey: 'emailStep',
          value: '→',
        },
        {
          labelKey: 'accessStep',
          value: 'ON',
        },
      ]}
    >
      <Card className='w-full overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
              <MailCheck className='size-6' />
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

        <CardContent className='space-y-6'>
          <div className='rounded-[1.5rem] border ws-border ws-primary-soft p-5'>
            <div className='flex gap-4'>
              <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl ws-primary'>
                <CheckCircle2 className='size-5' />
              </div>

              <div className='space-y-1'>
                <p className='font-bold ws-heading'>{t('inboxTitle')}</p>

                <p className='text-sm leading-6 ws-muted'>
                  {t('inboxDescription')}
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-3 rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
            <p className='text-sm font-bold ws-heading'>{t('notFoundTitle')}</p>

            <p className='text-sm leading-6 ws-muted'>
              {t('notFoundDescription')}
            </p>
          </div>

          <Button
            asChild
            className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition'
          >
            <Link href='/auth/login'>
              {t('goToLogin')}
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>

          <div className='text-center text-sm ws-muted'>
            {t('wrongEmail')}{' '}
            <Link
              href='/auth/sign-up'
              className='font-semibold text-[var(--ws-primary-text)] underline-offset-4 hover:underline'
            >
              {t('createAnotherAccount')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthPageShell>
  )
}
