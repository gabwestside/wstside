import { LanguageSelector } from '@/components/settings/language-selector'
import { ThemeSelector } from '@/components/settings/theme-selector'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Settings2, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function MenuPage() {
  const t = useTranslations('Settings')

  return (
    <div className='space-y-4 sm:space-y-6'>
      <section className='flex flex-col justify-between gap-3 lg:flex-row lg:items-end'>
        <div className='space-y-2'>
          <Badge className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold hover:bg-[var(--ws-primary-soft)]'>
            {t('settings')}
          </Badge>

          <div>
            <h1 className='text-2xl font-black tracking-tight ws-heading sm:text-4xl'>
              {t('title')}
            </h1>

            <p className='mt-1 max-w-2xl text-sm leading-6 ws-muted sm:mt-2'>
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.85fr_1.15fr]'>
        <Card className='rounded-[1.5rem] border ws-border ws-surface sm:rounded-[2rem]'>
          <CardHeader className='space-y-3 p-5 sm:space-y-4 sm:p-6'>
            <div className='flex size-10 items-center justify-center rounded-2xl ws-primary shadow-lg sm:size-12'>
              <Settings2 className='size-5 sm:size-6' />
            </div>

            <div>
              <CardTitle className='text-xl font-black ws-heading sm:text-2xl'>
                {t('appearance')}
              </CardTitle>

              <CardDescription className='mt-1 text-sm leading-6 ws-muted sm:mt-2'>
                {t('appearanceDescription')}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='p-5 pt-0 sm:p-6 sm:pt-0'>
            <div className='rounded-[1.25rem] border ws-border ws-surface-muted p-4 sm:rounded-[1.5rem] sm:p-5'>
              <div className='flex items-start gap-3'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-2xl ws-primary-soft sm:size-10'>
                  <Sparkles className='size-4 sm:size-5' />
                </div>

                <div>
                  <p className='text-sm font-bold ws-heading sm:text-base'>
                    {t('savedAutomatically')}
                  </p>

                  <p className='mt-1 text-xs leading-5 ws-muted sm:text-sm sm:leading-6'>
                    {t('savedAutomaticallyDescription')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-[1.5rem] border ws-border ws-surface sm:rounded-[2rem]'>
          <CardHeader className='p-5 sm:p-6'>
            <CardTitle className='text-xl font-black ws-heading sm:text-2xl'>
              {t('availableThemes')}
            </CardTitle>

            <CardDescription className='text-sm ws-muted'>
              {t('availableThemesDescription')}
            </CardDescription>
          </CardHeader>

          <CardContent className='p-5 pt-0 sm:p-6 sm:pt-0'>
            <ThemeSelector />
          </CardContent>
        </Card>

        <Card className='rounded-[1.5rem] border ws-border ws-surface sm:rounded-[2rem] xl:col-span-2'>
          <CardHeader className='p-5 sm:p-6'>
            <CardTitle className='text-xl font-black ws-heading sm:text-2xl'>
              {t('language')}
            </CardTitle>

            <CardDescription className='text-sm ws-muted'>
              {t('languageDescription')}
            </CardDescription>
          </CardHeader>

          <CardContent className='p-5 pt-0 sm:p-6 sm:pt-0'>
            <LanguageSelector />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
