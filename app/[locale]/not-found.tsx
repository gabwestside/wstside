import { ArrowLeft, Home, SearchX } from 'lucide-react'
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

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound')

  return (
    <AuthPageShell
      namespace='NotFound'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'highlightEyebrow',
        titleKey: 'highlightTitle',
        descriptionKey: 'highlightDescription',
      }}
      stats={[
        { labelKey: 'checkStep', value: '01' },
        { labelKey: 'returnStep', value: '02' },
        { labelKey: 'continueStep', value: '03' },
      ]}
    >
      <Card className='w-full overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
              <SearchX className='size-6' />
            </div>

            <div className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide'>
              404
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
          <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
            <p className='text-sm font-bold ws-heading'>{t('cardTitle')}</p>
            <p className='mt-1 text-sm leading-6 ws-muted'>
              {t('cardDescription')}
            </p>
          </div>

          <div className='grid gap-3'>
            <Button
              asChild
              className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition'
            >
              <Link href='/dashboard'>
                <Home className='mr-2 size-4' />
                {t('goToDashboard')}
              </Link>
            </Button>

            <Button
              asChild
              variant='outline'
              className='h-12 w-full rounded-2xl border ws-border ws-surface-solid text-base font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
            >
              <Link href='/auth/login'>
                <ArrowLeft className='mr-2 size-4' />
                {t('goToLogin')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthPageShell>
  )
}
