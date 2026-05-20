import { getTranslations } from 'next-intl/server'

import { LoginForm } from '@/components/auth/login-form'

export default async function LoginPage() {
  const t = await getTranslations('Auth.login')
  const tCommon = await getTranslations('Common')

  return (
    <main className='relative min-h-svh overflow-hidden ws-app-bg'>
      <section className='relative z-10 grid min-h-svh lg:grid-cols-[1fr_0.95fr]'>
        <div className='flex min-h-svh flex-col justify-between px-6 py-8 md:px-10 lg:px-14'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-2xl ws-primary text-sm font-black shadow-lg'>
              W
            </div>

            <div>
              <p className='text-sm font-black uppercase tracking-[0.22em] ws-heading'>
                {tCommon('wstside')}
              </p>
              <p className='text-xs font-medium ws-muted'>
                {tCommon('tagline')}
              </p>
            </div>
          </div>

          <div className='mx-auto flex w-full max-w-md flex-1 items-center py-10'>
            <LoginForm />
          </div>

          <p className='text-center text-xs ws-muted md:text-left'>
            {t('footer')}
          </p>
        </div>

        <aside className='relative hidden border-l ws-border ws-primary p-10 lg:block'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,currentColor_18%,transparent),transparent_32%),radial-gradient(circle_at_70%_80%,color-mix(in_srgb,currentColor_12%,transparent),transparent_28%)]' />

          <div className='relative z-10 flex h-full flex-col justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex rounded-full border border-current/10 bg-current/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur'>
                {t('heroBadge')}
              </div>

              <h1 className='max-w-xl text-5xl font-black leading-[0.95] tracking-tight'>
                {t('heroTitle')}
              </h1>

              <p className='max-w-md text-base leading-7 opacity-75'>
                {t('heroDescription')}
              </p>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[2rem] border border-current/10 bg-current/10 p-5 shadow-2xl backdrop-blur'>
                <p className='text-xs font-bold uppercase tracking-[0.18em] opacity-75'>
                  {t('capitalMachine')}
                </p>
                <p className='mt-3 text-4xl font-black'>{t('capitalValue')}</p>
                <p className='mt-2 text-sm opacity-75'>{t('capitalStart')}</p>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    {t('routine')}
                  </p>
                  <p className='mt-2 text-3xl font-black'>0%</p>
                </div>

                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    {t('goals')}
                  </p>
                  <p className='mt-2 text-3xl font-black'>0</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
